# Technician Ranking Engine

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Business Engine Specification  
**Engine ID:** `technician_ranking`  
**Phase:** 1.5 — Business Engines  
**Status:** Design baseline  
**Scale Target:** Millions of users across KSA and future GCC markets  

---

## 1. Purpose

The Technician Ranking Engine computes a **Technician Score from 0 to 100** that summarizes provider quality and reliability for Matching, Offers comparison, Company assignment insights, and internal trust operations.

The score is a **platform trust signal**, not a public vanity metric that providers can pay to max out. Subscription may influence matching priority separately; it is not a dominant Ranking factor.

---

## 2. Design Goals

| Goal | Requirement |
|------|-------------|
| Comparability | Same scale across cities/services with market normalization hooks |
| Robustness | Cold-start safe; resistant to simple gaming |
| Explainability | Factor breakdown available to ops and (limited) to provider |
| Freshness | Recomputed on events + periodic batch |
| Fairness | Does not permanently bury new verified technicians |

---

## 3. Score Output

| Field | Description |
|-------|-------------|
| `technicianScore` | 0–100 (display rounded to 1 decimal optional) |
| `scoreVersion` | Formula version |
| `computedAt` | Timestamp |
| `band` | `elite` \| `strong` \| `fair` \| `risk` \| `new` |
| `factors[]` | Normalized contributions for explainability |
| `sampleConfidence` | `low` \| `medium` \| `high` |

### Bands (defaults)

| Band | Score range |
|------|-------------|
| elite | 85–100 |
| strong | 70–84.9 |
| fair | 55–69.9 |
| risk | 0–54.9 |
| new | Cold-start path regardless of numeric prior |

---

## 4. Factor Catalog

Every factor is measured over a defined window, normalized to **0–1**, then weighted.

### 4.1 Rating

| Item | Detail |
|------|--------|
| Signal | Aggregate customer overall rating (1–5) |
| Window | Lifetime with recency weighting preferred |
| Normalization | Map 1→0.0 … 5→1.0; apply Bayesian prior toward market mean until N reviews |
| Min samples | Below N (e.g., 5), confidence low; shrink toward prior |
| Notes | Hidden/flagged reviews excluded |

### 4.2 Experience

| Item | Detail |
|------|--------|
| Signal | Months since first approved verification or first completed job |
| Normalization | Log/saturate curve up to cap (e.g., 36 months → ~1.0) |
| Notes | Experience alone cannot dominate quality |

### 4.3 Completed Jobs

| Item | Detail |
|------|--------|
| Signal | Count of successfully completed bookings |
| Normalization | Saturating curve (e.g., 0→0, 50→~0.7, 200→~1.0) |
| Notes | Completions with major dispute losses discounted |

### 4.4 Repeat Customers

| Item | Detail |
|------|--------|
| Signal | Share of customers who booked the technician again within window |
| Formula intent | `repeatCustomers / uniqueCustomers` with min unique threshold |
| Normalization | 0%→0 … target% (e.g., 25%)→1.0 capped |
| Notes | Strong loyalty signal |

### 4.5 Cancellation Rate

| Item | Detail |
|------|--------|
| Signal | Provider-initiated cancellations / accepted bookings |
| Direction | Lower is better → invert in normalization |
| Window | Rolling 90 days |
| Hard interaction | Extreme rates can disable offers outside score |

### 4.6 Complaints

| Item | Detail |
|------|--------|
| Signal | Weighted complaints / disputes opened against provider |
| Severity weights | Fraud/safety > quality > minor |
| Direction | Lower better |
| Notes | Admin-dismissed spam complaints excluded |

### 4.7 Warranty Claims

| Item | Detail |
|------|--------|
| Signal | Accepted warranty claims / completed warrantable jobs |
| Direction | Lower better |
| Nuance | Filing alone is milder than accepted claim; rejected claims low weight |
| Notes | Encourages durable workmanship |

### 4.8 Response Time

| Item | Detail |
|------|--------|
| Signal | Median time from request visibility/notify → offer submit (or first open) |
| Direction | Faster better |
| Normalization | Relative to city+service baselines |
| Cold start | Market median prior |

### 4.9 Acceptance Rate

| Item | Detail |
|------|--------|
| Signal | Offers accepted / offers submitted (rolling) |
| Direction | Higher better with caveats |
| Guardrail | Penalize tiny samples; prevent “one lucky accept” inflation |
| Anti-game | Pair with volume; ignore spam lowball offers if fraud flagged |

### 4.10 Profile Completion

| Item | Detail |
|------|--------|
| Signal | Checklist percentage: photo, bio AR/EN, services, radius, portfolio, working hours, documents uploaded |
| Normalization | 0–100% → 0–1 |
| Notes | Easy early lift for newcomers |

### 4.11 Verification Status

| Item | Detail |
|------|--------|
| Signal | KYC/professional verification state |
| Mapping | `approved`→1.0, `pending`→0.3, `rejected`/`unsubmitted`→0.0 |
| Hard rule | Unapproved providers are matching-excluded regardless of other factors |

---

## 5. Default Weights (v1)

Weights sum to 1.0; configurable per market.

| Factor | Weight |
|--------|--------|
| Rating | 0.18 |
| Completed Jobs | 0.12 |
| Repeat Customers | 0.10 |
| Cancellation Rate | 0.12 |
| Complaints | 0.10 |
| Warranty Claims | 0.08 |
| Response Time | 0.08 |
| Acceptance Rate | 0.07 |
| Experience | 0.05 |
| Profile Completion | 0.05 |
| Verification Status | 0.05 |

**Raw score** = 100 × Σ (weight × normalizedFactor)

---

## 6. Score Calculation Procedure

### 6.1 Event-Driven Refresh Triggers

Recompute (debounced) when:

- Review published/hidden
- Booking completed/cancelled
- Dispute resolved against/for provider
- Warranty claim accepted/rejected
- Profile/verification changed
- Offer accepted/rejected metrics thresholds crossed

### 6.2 Batch Recompute

Nightly/hourly batch recalculates all active providers to correct drift and apply new baselines.

### 6.3 Cold-Start Policy

If completed jobs < `J` (e.g., 5) OR reviews < `R` (e.g., 3):

1. Compute provisional raw score  
2. Blend with market prior `P` (e.g., 65):  
   `score = α * raw + (1-α) * P` where α grows with sample size  
3. Mark band `new` and confidence `low`

### 6.4 Caps & Floors

| Rule | Detail |
|------|--------|
| Absolute range | Clamp 0–100 |
| Verification floor | If not approved, score may compute internally but public/matching use blocked |
| Fraud penalty | Multiplicative haircut or hard cap (e.g., max 40) when trust flags active |
| Recovery | Penalties decay with clean job streaks |

### 6.5 Market Normalization (GCC-ready)

Optional z-score or quantile calibration per `city+category` so scores remain comparable when markets differ in rating generosity.

---

## 7. Company Technicians

- Each technician keeps an individual score
- Company Engine may expose a company composite (median/weighted by jobs)
- Matching for company offers may use composite + assigned technician score at start time

---

## 8. Usage by Other Engines

| Consumer | Use |
|----------|-----|
| Matching Engine | Soft score factor + tie-break |
| Offers Engine | Customer comparison quality component |
| Subscription | Must not allow buying a fake 100 score |
| Admin | Risk queues for `risk` band |
| Loyalty (provider rewards) | Eligibility gates |

Providers may see limited factor tips (“Improve response time”) without revealing anti-fraud weights.

---

## 9. Anti-Gaming Controls

1. Bayesian smoothing on ratings  
2. Ignore self-review loops / related accounts (graph later)  
3. Discount bursts of reviews in short windows  
4. Weight recent behavior higher than ancient history  
5. Separate paid badges from score  
6. Audit sudden score jumps  

---

## 10. Persistence

Denormalize on technician profile:

- `ratingAvg`, `ratingCount` (existing)
- `technicianScore`, `scoreBand`, `scoreVersion`, `scoreComputedAt`

Keep detailed factor snapshots in a score history collection for debugging (retention policy applies).

---

## 11. Observability KPIs

- Score distribution by city
- Correlation: score vs completion quality / dispute rate
- Cold-start conversion
- Time-to-recompute p95
- Manual admin overrides count (should be rare)

---

## 12. Future AI Ranking

ML may predict job success probability and calibrate bands.

Rules:

- Cannot override hard verification exclusion
- Shadow mode before production ranking replacement
- Preserve human-readable factor explanations
- Fairness evaluation across cities and nationality-agnostic features only

---

## 13. Non-Goals

- Customer user scoring
- Search SEO ranking for web content
- Selling score boosts

---

## 14. Related Documents

- `MATCHING_ENGINE.md`
- `OFFERS_ENGINE.md`
- `WARRANTY_ENGINE.md`
- `DISPUTE_ENGINE.md`
- `COMPANY_ENGINE.md`
- `SUBSCRIPTION_ENGINE.md`
- `../BUSINESS_RULES.md`

---

## 15. Canonical Policy — Corrections, Appeals, and Bias Governance

Only finalized, attributable outcomes may affect Technician Score. Open disputes, submitted warranty claims, pending complaints, and raw acceptance-rate fluctuations do not create adverse score changes. Dispute losses and accepted warranty claims enter the score only after the decision is final or the appeal window closes; an overturned outcome is removed through an idempotent correction and historical scores retain the correction reason.

Providers may inspect a plain-language factor summary, challenge source data, and appeal a materially adverse score change within 30 days. The ranking owner must acknowledge a correction request, freeze newly disputed adverse inputs when credible, decide it independently from the original case owner, and issue a reasoned outcome. Successful corrections trigger recomputation of current score and downstream projections. Anti-fraud implementation details may be withheld, but the relied-on category and appeal path may not be hidden.

Rating, complaint, warranty, cancellation, response, and acceptance factors use minimum sample thresholds and Bayesian market priors. Rates are normalized by eligible exposure, service, and market so higher-volume or higher-risk-category providers are not penalized merely for volume. Acceptance rate remains excluded from adverse use until exposure position and customer price choice are controlled; otherwise it is diagnostic only.

Nationality, ethnicity, tribe, religion, gender, disability, precise home location, device price, language choice, and proxies intentionally derived from them are prohibited ranking features. City and service may be used only for legitimate baseline normalization and must be tested for proxy effects. Subscription and loyalty benefits remain outside Technician Score.

Before a score policy release and at least quarterly, the ranking owner reviews distribution, error, exposure, appeal, and adverse-outcome rates across permitted operational cohorts and markets. Material drift or unexplained disparity blocks rollout or triggers rollback and documented remediation. Changes require a versioned impact report, Product and Trust approval, and replay against historical cohorts.

Manual overrides are time-bounded, reason-coded, dual-approved for adverse or commercially beneficial changes, visible in audit history, and excluded from formula training data. Emergency trust restrictions are separate safety controls and must not masquerade as an unexplained score override.
