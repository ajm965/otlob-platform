# Matching Engine

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Business Engine Specification  
**Engine ID:** `matching`  
**Phase:** 1.5 — Business Engines  
**Status:** Design baseline  
**Scale Target:** Millions of users across KSA and future GCC markets  

---

## 1. Purpose

The Matching Engine determines **which technicians and companies are eligible to see and act on a service request**, and in what **priority order** they are notified or ranked in provider feeds.

It does not accept offers and does not create bookings. Those belong to the Offers Engine and Bookings domain.

**Primary consumers**

- Request publish workflow
- Provider “nearby requests” feed
- Notification fan-out for new open requests
- Admin matching diagnostics

**Related engines**

- `TECHNICIAN_RANKING_ENGINE.md` — Technician Score (0–100)
- `SUBSCRIPTION_ENGINE.md` — plan entitlements and priority boosts
- `OFFERS_ENGINE.md` — post-match bidding
- `NOTIFICATION_ENGINE.md` — delivery of match alerts
- `COMPANY_ENGINE.md` — company-level eligibility and branch coverage

---

## 2. Design Goals

| Goal | Requirement |
|------|-------------|
| Fairness | Eligible providers are not arbitrarily excluded |
| Quality | Higher-trust providers surface earlier without starving newcomers |
| Latency | Match sets computed within tight SLAs at GCC scale |
| Explainability | Every include/exclude decision has a reason code |
| Configurability | Weights and thresholds are environment-configurable |
| Multi-market | City/country policy packs (SA first; GCC-ready) |

---

## 3. Inputs

### 3.1 Request Context

| Input | Description |
|-------|-------------|
| `requestId` | Target request |
| `serviceId` / `categoryId` | Required specialization |
| `location` | Service geopoint |
| `geohash` / city / region | Geo indexing keys |
| `preferredTimeStart` / `preferredTimeEnd` | Optional time window |
| `urgency` | `normal`, `same_day`, `emergency` |
| `customerId` | For repeat-customer affinity |
| `budgetMinHalalas` / `budgetMaxHalalas` | Optional advisory filters |
| `countryCode` | `SA` initially |
| `publishedAt` | Matching epoch |

### 3.2 Provider Candidate Attributes

| Attribute | Source |
|-----------|--------|
| Distance | Provider location vs request location |
| Availability | Explicit availability flag / calendar |
| Working hours | Weekly schedule + exceptions |
| Current workload | Active bookings today / in progress |
| Specialization | `serviceIds` / skills |
| Rating | Aggregate rating |
| Technician Score | Ranking Engine (0–100) |
| Subscription Level | Free / Pro / Premium / Company |
| Response Time | Rolling median first-response |
| Cancellation Rate | Rolling provider cancellations |
| Repeat Customer | Prior completed jobs with this customer |
| Last Online | Last app heartbeat / session |
| Maximum Daily Jobs | Plan + profile cap |
| Verification Status | Must be approved |
| Company / branch coverage | If company provider |

---

## 4. Matching Pipeline (Stages)

Matching is a **pipeline of deterministic stages**. Each stage emits reason codes for observability.

```text
1. Candidate Retrieval (geo + service index)
2. Hard Eligibility Filters (must-pass)
3. Soft Scoring (weighted factors)
4. Priority Bucketing (subscription / urgency)
5. Ranking & Tie-breaking
6. Fan-out Caps & Notification Quotas
7. Audit Trail Persistence
```

Stages 1–2 decide *who can participate*. Stages 3–5 decide *order*. Stage 6 protects cost and spam.

---

## 5. Candidate Retrieval

### 5.1 Primary Strategy

1. Resolve request geohash prefixes for the configured search radius.
2. Query active providers whose geohash intersects those prefixes **and** whose `serviceIds` contain the request service (or category-expanded services when configured).
3. Include company providers whose **branch/service area** covers the request point.

### 5.2 Radius Policy

| Urgency | Default radius (KSA cities) | Notes |
|---------|-----------------------------|-------|
| `normal` | Provider `serviceRadiusKm` capped by city max (e.g., 25 km) | Configurable per city |
| `same_day` | Slightly larger cap (e.g., +20%) | Still bounded |
| `emergency` | City emergency radius (e.g., 40 km) | May expand in rings |

If fewer than `minCandidatesTarget` pass hard filters, the engine expands radius in rings (Ring 1 → Ring 2 → Ring 3) until `maxRadiusKm` or timeout.

### 5.3 Scale Notes

- Prefer geohash range queries + service array membership over full scans.
- Precompute city shards for mega-cities (Riyadh, Jeddah, Dammam).
- Cache “online eligible providers by service+geohash” with short TTL for hot cells.
- GCC expansion adds `countryCode` as a hard partition key.

---

## 6. Hard Eligibility Filters (Must Pass)

A provider is **ineligible** if any hard filter fails.

| Filter | Rule | Exclude reason code |
|--------|------|---------------------|
| Active status | Provider `status=active` | `provider_inactive` |
| Verification | `verificationStatus=approved` | `not_verified` |
| Specialization | Offers the request `serviceId` | `service_mismatch` |
| Distance | Distance ≤ effective radius | `out_of_range` |
| Country/market | Same market as request | `market_mismatch` |
| Offers enabled | `offersEnabled=true` | `offers_disabled` |
| Suspension | Not suspended/banned | `suspended` |
| Subscription gate | Plan allows bidding (if gating on) | `subscription_blocked` |
| Daily job cap | Today’s jobs < `maximumDailyJobs` | `daily_cap_reached` |
| Workload hard max | In-progress jobs < hard concurrency max | `workload_saturated` |
| Working hours | If request requires “available now”, must be within hours | `outside_working_hours` |
| Availability | Explicit unavailable / vacation blocks | `unavailable` |
| Company assignment | Company technicians need company active + membership | `company_ineligible` |

Hard filters never use soft score trade-offs.

---

## 7. Factor Specifications

### 7.1 Distance

| Item | Detail |
|------|--------|
| Definition | Great-circle distance between provider reference point and request location |
| Unit | Kilometers |
| Soft score | Closer is better; distance score decays with distance / effectiveRadius |
| Hard use | Must be ≤ effective radius |
| Company note | Use nearest covering branch location, not HQ alone |

**Distance bands (example defaults)**

| Band | Meaning |
|------|---------|
| 0–5 km | Excellent |
| 5–15 km | Good |
| 15–25 km | Acceptable |
| > effective radius | Excluded |

### 7.2 Availability

| State | Meaning |
|-------|---------|
| `available` | Accepting new jobs |
| `busy` | May receive lower priority or be excluded if policy is strict |
| `off` | Hard exclude |

Availability can be manual toggle or derived from calendar blocks.

### 7.3 Working Hours

- Weekly schedule per weekday with local timezone (e.g., `Asia/Riyadh`).
- Exception dates for holidays/leaves.
- Matching modes:
  - **Immediate jobs:** must be inside working hours now (or within grace minutes).
  - **Scheduled window jobs:** provider hours must overlap preferred window by minimum overlap minutes.

### 7.4 Current Workload

| Metric | Use |
|--------|-----|
| `inProgressCount` | Hard cap (e.g., max 2 concurrent) |
| `confirmedTodayCount` | Soft penalty as day fills |
| `maximumDailyJobs` | Hard daily cap |

Workload protects quality and ETA honesty.

### 7.5 Specialization

- Exact service match preferred.
- Optional related-service expansion with penalty (admin-configured adjacency map).
- Certified skill badges (future) can add soft boost, never bypass hard service match for regulated categories.

### 7.6 Rating

- Use published aggregate `ratingAvg` with minimum sample size.
- Providers below `minRatingFloor` (e.g., 3.0 with ≥ N reviews) may be hard-excluded or heavily penalized by market policy.
- New providers without ratings use a **neutral prior**, not a fake 5.0.

### 7.7 Technician Score

- Input from Ranking Engine: integer/float **0–100**.
- Primary quality signal in soft scoring.
- See `TECHNICIAN_RANKING_ENGINE.md`.

### 7.8 Subscription Level

Priority influence (not a substitute for eligibility):

| Plan | Match priority effect |
|------|------------------------|
| Free | Base priority |
| Pro | Elevated bucket / earlier notify waves |
| Premium | Highest individual priority boost |
| Company | Company-tier boost + branch coverage benefits |

Exact numeric boosts live in Subscription Engine priority tables.

### 7.9 Response Time

- Rolling median time from request visibility → first offer (or first open) over last N days.
- Faster responders score higher.
- Cold-start providers receive median market prior.

### 7.10 Cancellation Rate

- Provider-initiated cancellations / accepted bookings over rolling window.
- High rates reduce score; extreme rates can hard-disable offers (`offersEnabled=false`) outside this engine.

### 7.11 Repeat Customer

- If provider completed ≥1 successful booking with this customer, apply affinity boost.
- Optional: only if no open dispute / low complaint history with that pair.

### 7.12 Last Online

| Freshness | Treatment |
|-----------|-----------|
| Online now / ≤ 5 min | Full online boost |
| ≤ 60 min | Partial boost |
| ≤ 24 h | Neutral / mild penalty |
| > 24 h | Strong penalty or exclude from immediate notify wave |

Last online affects **notification urgency**, not necessarily hard eligibility for scheduled jobs.

### 7.13 Maximum Daily Jobs

- Derived from subscription limits and/or technician profile override (whichever is stricter).
- When reached: hard exclude until next local day boundary.

---

## 8. Soft Scoring Model

### 8.1 Normalized Factor Scores

Each factor is normalized to **0.0–1.0** before weighting.

| Factor key | Direction |
|------------|-----------|
| `distance` | Higher when closer |
| `technicianScore` | Higher when score closer to 100 |
| `rating` | Higher when better |
| `responseTime` | Higher when faster |
| `cancellationRate` | Higher when lower cancellations |
| `workload` | Higher when lighter load |
| `lastOnline` | Higher when fresher |
| `repeatCustomer` | 1.0 if affinity else 0.0 (or graded) |
| `subscription` | Mapped from plan tier |
| `specializationStrength` | Exact match > adjacent |

### 8.2 Default Weights (KSA v1)

Weights are configurable; defaults must sum to 1.0.

| Factor | Default weight |
|--------|----------------|
| Distance | 0.22 |
| Technician Score | 0.20 |
| Rating | 0.12 |
| Response Time | 0.10 |
| Subscription | 0.10 |
| Workload | 0.08 |
| Cancellation Rate | 0.07 |
| Last Online | 0.05 |
| Repeat Customer | 0.04 |
| Specialization Strength | 0.02 |

**Match Soft Score** = Σ (weight × normalizedFactor)

Store both total and factor breakdown for explainability.

### 8.3 Urgency Re-weighting

| Urgency | Adjustment |
|---------|------------|
| `emergency` | Increase distance, lastOnline, responseTime weights; decrease subscription weight share |
| `same_day` | Mild shift toward availability/online |
| `normal` | Use default weights |

---

## 9. Matching Priority

### 9.1 Priority Buckets

Before fine ranking, assign a **priority bucket** (lower number = earlier wave):

| Bucket | Who |
|--------|-----|
| 0 | Premium / top Company coverage for emergency |
| 1 | Premium + high Technician Score |
| 2 | Pro |
| 3 | Free eligible |
| 4 | Expanded-radius fallback candidates |

Notification Engine sends waves bucket 0 → N with delays to reduce stampede and cost.

### 9.2 Final Rank Key

Within a bucket, sort by:

1. Match Soft Score (desc)
2. Tie-breaking rules (below)

---

## 10. Tie-breaking Rules

When soft scores are equal within epsilon (e.g., 0.001):

1. Higher Technician Score  
2. Higher subscription tier  
3. Shorter distance  
4. Better (lower) response time  
5. Lower cancellation rate  
6. More recent last online  
7. Higher completed jobs count  
8. Stable hash of `providerId + requestId` (deterministic randomness)

Tie-breaks must be deterministic for replay/debug.

---

## 11. Fan-out Caps & Quotas

| Control | Purpose |
|---------|---------|
| `maxNotifyPerRequest` | Cap push recipients per publish |
| `maxFeedPageSize` | Cap provider feed page |
| `perProviderDailyMatchNotices` | Anti-spam for providers |
| `cooldownSecondsSameCell` | Avoid duplicate notifies for near-identical requests |

If caps truncate the list, keep next candidates as **reserves** for timeout expansion (Offers Engine / reminder waves).

---

## 12. Company Matching Specifics

- A company is eligible if any approved branch covers the point and company offers the service.
- Rank using company score composite (company rating + assigned technician pool quality) per Company Engine.
- Notification may go to company dispatch role first; technician assignment happens later.

---

## 13. Outputs

### 13.1 Match Result Object (logical)

| Field | Description |
|-------|-------------|
| `requestId` | Request |
| `generatedAt` | Timestamp |
| `policyVersion` | Matching policy version |
| `candidates[]` | Ordered eligible providers |
| `candidates[].providerType` | `technician` \| `company` |
| `candidates[].providerId` | ID |
| `candidates[].distanceKm` | Computed |
| `candidates[].softScore` | 0–1 |
| `candidates[].priorityBucket` | Int |
| `candidates[].reasonCodes` | Why included |
| `excludedSample[]` | Optional sampled exclusions for diagnostics |
| `radiusUsedKm` | Final radius |

### 13.2 Side Effects

- Enqueue notification waves
- Persist match audit for support (“Why wasn’t technician X notified?”)

---

## 14. SLAs & Performance Budgets

| Metric | Target (design) |
|--------|-----------------|
| p95 match computation | ≤ 300 ms for typical city cell |
| p95 first notify enqueue | ≤ 1 s after publish |
| Explainability retention | ≥ 90 days (ops configurable) |

At multi-million user scale, split hot geo cells and precompute online sets.

---

## 15. Configuration Surface

All thresholds versioned as `matching.policy.vN`:

- radii, weights, floors, caps, wave delays
- per-country / per-city overrides
- emergency overrides
- feature flags (adjacent services, repeat boost, etc.)

Changing weights requires audit entry and staging evaluation.

---

## 16. Observability

Emit metrics/events:

- candidates retrieved / passed / notified
- exclude reason histograms
- average distance of notified set
- conversion: notified → offered → accepted
- empty-match rate by city/service

Empty matches trigger admin alerts and optional radius expansion jobs.

---

## 17. Failure Modes & Fallbacks

| Failure | Fallback |
|---------|----------|
| Geo index miss | Expand rings; then city-wide service query with stricter caps |
| Ranking Engine unavailable | Use last known Technician Score snapshot; degrade gracefully |
| Subscription service lag | Use denormalized plan on provider profile |
| Zero candidates | Mark request `matching_sparse`; notify ops; widen policy if allowed |

---

## 18. Future AI Matching

Deterministic matching remains the default authority for eligibility.

Future ML layer may provide:

- Conversion propensity (provider likely to offer / be accepted)
- ETA realism score
- Fraud/risk ranking adjustments
- Personalized customer preference fit

**Rules for AI introduction**

1. AI may reorder within eligible set; may not admit hard-filtered providers.
2. Shadow mode first (log only), then limited percentage rollout.
3. Always keep factor explainability (top reasons).
4. Human-configurable safety constraints stay mandatory.
5. Model features must be GCC-market aware (city, language, category).

---

## 19. Non-Goals

- Setting offer prices (Pricing Engine)
- Accepting offers (Offers Engine)
- Computing Technician Score internals (Ranking Engine)
- Sending SMS/push templates (Notification Engine)

---

## 20. Implementation Readiness Checklist

A senior backend engineer should be able to implement when they have:

- [ ] Provider geo + service indexes
- [ ] Ranking score snapshots on provider profiles
- [ ] Subscription entitlements on provider profiles
- [ ] Working hours & availability models
- [ ] Policy config service
- [ ] Audit store for match decisions
- [ ] Notification wave queue

---

## 21. Related Documents

- `../BUSINESS_RULES.md`
- `../API.md`
- `TECHNICIAN_RANKING_ENGINE.md`
- `SUBSCRIPTION_ENGINE.md`
- `OFFERS_ENGINE.md`
- `NOTIFICATION_ENGINE.md`
- `COMPANY_ENGINE.md`

---

## 22. Canonical Policy — KSA v1 Matching

This section fixes the KSA v1 defaults and overrides configurable examples above where they conflict.

### Quality scoring without double-counting

Technician Score is the sole composite quality factor. Raw rating is not assigned an additional full weight because rating is already part of Technician Score. The legacy `rating` factor is a compatibility diagnostic and has zero KSA v1 weight. A future residual-rating feature may use only statistically significant deviation not already represented in the score after offline validation.

KSA v1 weights are: distance 0.25, Technician Score 0.24, response time 0.12, subscription 0.06, workload 0.10, cancellation rate 0.07, last online 0.07, repeat customer 0.05, and specialization strength 0.04. They sum to 1.00. Subscription influence is deliberately capped at 0.06 and is further constrained by fairness slots.

### Fairness and exploration slots

Every notification wave of ten or more recipients reserves at least 20 percent, and never fewer than two places, for eligible Free or cold-start providers. Smaller waves reserve one place when such a provider exists. Selection within the reserved cohort uses quality and distance safety floors followed by a stable request-specific rotation that accounts for recent exposure. Unused reserved places return to the general ranked pool. No paid plan can consume reserved places.

The engine measures exposure, offer, acceptance, and completion rates by plan, cold-start status, city, and service. Material cohort starvation pauses paid boost expansion and triggers policy review. Fairness changes are versioned and replay-evaluated.

### Busy behavior

`off` is always excluded. `busy` is not an ambiguous policy switch: for immediate and emergency requests, a provider at the hard concurrent-job limit is excluded; otherwise busy providers remain eligible but receive the minimum workload score and are omitted from the first notification wave. For scheduled requests, busy providers remain eligible only when the requested window does not overlap committed work and travel buffers. Manual `available` never overrides hard workload or calendar conflicts.

### Bounded geo retrieval

Candidate retrieval is always constrained by `countryCode`, `marketId`, service, active status, and a versioned geohash cell. KSA v1 starts with geohash precision 6 and may use an adjacent precision chosen by the city density policy; it never mixes precisions in one query plan. Each radius ring is converted to at most nine contiguous geohash ranges per service shard. Each range reads at most 250 candidates before hard filtering. Retrieval stops after three rings, 27 range queries, 500 deduplicated candidates, the configured radius, or the computation deadline—whichever occurs first.

Dense-cell overflow uses a short-lived, server-built eligible-provider projection partitioned by market, service, cell, and shard. The fallback samples shards by least recent exposure and then applies exact distance. An unbounded city-wide Firestore query is prohibited. Cache TTL is at most 60 seconds; suspension, verification loss, market change, service removal, or `offersEnabled=false` actively invalidates the projection, while every match still rechecks safety-critical eligibility. Launch requires query/index review and load evidence for representative dense Riyadh cells against the stated latency budget.

### Market boundary

`countryCode` and `marketId` are mandatory on requests, provider eligibility projections, branches, match decisions, and visibility grants. Every query includes both fields. Cross-market radius expansion is prohibited even when geohashes touch a border. `SA` is the initial country and each future country requires its own policy version, timezone, legal, notification, and capacity launch pack.

### Provider visibility and privacy

Providers do not directly read raw request records. Matching creates a time-bound visibility grant and a minimum server-generated request projection for each notified or feed-eligible provider. Before acceptance the projection excludes exact address, customer contact data, and media not explicitly classified for pre-offer sharing; location is reduced to a coarse area suitable for quoting. The grant records request, provider identity, market, policy version, eligibility reason, issue time, expiry, and revocation.

Grants are revoked when the request closes, the provider becomes ineligible, company membership changes, or the wave is cancelled. Offers validates an active grant. `matching_sparse` is a compatibility outcome/reason code for operations and analytics, not a persisted request lifecycle status.
