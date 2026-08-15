# Subscription Engine

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Business Engine Specification  
**Engine ID:** `subscription`  
**Phase:** 1.5 — Business Engines  
**Status:** Design baseline  
**Scale Target:** Millions of users across KSA and future GCC markets  

---

## 1. Purpose

The Subscription Engine defines provider plans, entitlements, limits, commission schedules, matching priority benefits, billing lifecycle (renewal, cancellation, grace), and enforcement hooks used by Matching, Offers, Pricing, and Company engines.

Customers do not require a paid subscription to request services. Loyalty is separate (`LOYALTY_ENGINE.md`).

---

## 2. Design Goals

| Goal | Requirement |
|------|-------------|
| Clear monetization | Plans map to concrete entitlements |
| Enforceability | Server checks limits before offers |
| Fair upgrades | Proration rules explicit |
| Resilience | Grace periods avoid abrupt cutoff mid-job |
| Multi-tenant companies | Company plan covers seats/branches |

---

## 3. Plan Catalog

### 3.1 Plans Overview

| Plan code | Audience | Intent |
|-----------|----------|--------|
| `free` | Individual technicians | Entry / try marketplace |
| `pro` | Individual technicians | Serious independents |
| `premium` | Individual technicians | Top visibility + lowest fees |
| `company` | Companies | Multi-technician organizations |

Plan commercial names may be localized (AR/EN) without changing codes.

### 3.2 Billing Periods

- Monthly (default)
- Annual (discounted) optional
- Trial periods configurable per plan/campaign

Currency: SAR (GCC-ready multi-currency later).

---

## 4. Plan: Free

### 4.1 Permissions

| Permission | Free |
|------------|------|
| Receive matched requests | Yes (base priority) |
| Submit offers | Yes |
| Accept bookings / complete jobs | Yes |
| Upload job media | Yes |
| Access basic earnings view | Yes |
| Company seats | No |
| Priority matching waves | No |
| Advanced analytics | No |

### 4.2 Benefits

- Marketplace access without upfront fee
- Standard support channel
- Standard warranty tooling

### 4.3 Limits (defaults)

| Limit | Default |
|-------|---------|
| Max offers per day | 10 |
| Max active bookings | 3 |
| Max services selected | 5 |
| Max portfolio photos | 10 |
| Notify wave bucket | Base (bucket 3) |
| Search boost | None |

### 4.4 Commission Rules

- Highest commission tier (see Pricing Engine; example 15%)
- No commission discount campaigns except platform-wide

### 4.5 Priority Rules

- Lowest subscription priority weight
- Eligible after paid tiers in early notify waves

---

## 5. Plan: Pro

### 5.1 Permissions

All Free permissions, plus:

| Permission | Pro |
|------------|-----|
| Priority matching (elevated bucket) | Yes |
| Higher daily offer caps | Yes |
| Response analytics (basic) | Yes |
| Profile badge `Pro` | Yes |

### 5.2 Benefits

- Reduced commission
- Earlier notification waves than Free
- Higher visibility in provider quality sorts (limited weight)
- Standard+ support SLA target

### 5.3 Limits (defaults)

| Limit | Default |
|-------|---------|
| Max offers per day | 40 |
| Max active bookings | 8 |
| Max services selected | 15 |
| Max portfolio photos | 40 |
| Notify wave bucket | Elevated (bucket 2) |

### 5.4 Commission Rules

- Mid commission (example 12%)
- Eligible for seasonal commission promos

### 5.5 Priority Rules

- Outranks Free in matching priority bucket
- Below Premium/Company emergency buckets

---

## 6. Plan: Premium

### 6.1 Permissions

All Pro permissions, plus:

| Permission | Premium |
|------------|---------|
| Highest individual priority boost | Yes |
| Featured placement eligibility | Yes (policy-capped) |
| Advanced analytics | Yes |
| Dedicated support lane | Yes |
| Beta feature access flags | Optional |

### 6.2 Benefits

- Lowest individual commission
- Strongest matching priority among individuals
- Badge `Premium`
- Higher daily caps

### 6.3 Limits (defaults)

| Limit | Default |
|-------|---------|
| Max offers per day | 100 |
| Max active bookings | 15 |
| Max services selected | 30 |
| Max portfolio photos | 100 |
| Notify wave bucket | High (bucket 0–1 depending on urgency) |

### 6.4 Commission Rules

- Lowest individual commission (example 9%)
- May include monthly fee credit campaigns

### 6.5 Priority Rules

- Top individual priority
- Must still pass Matching hard filters (distance, verification, etc.)

---

## 7. Plan: Company

### 7.1 Permissions

| Permission | Company |
|------------|---------|
| Multi-technician roster | Yes |
| Manager/dispatcher roles | Yes |
| Branch coverage areas | Yes |
| Company offer submission | Yes |
| Assign technicians to bookings | Yes |
| Company reports & invoices | Yes |
| Seat-based entitlements | Yes |

### 7.2 Benefits

- Organization branding on offers
- Centralized billing
- Volume-based commission tiers
- Branch-level matching coverage
- Aggregated analytics

### 7.3 Limits (defaults)

| Limit | Default |
|-------|---------|
| Included seats | e.g., 5 technicians |
| Extra seat fee | Configurable |
| Branches included | e.g., 2 |
| Max offers per day (org) | e.g., 300 |
| Max concurrent jobs (org) | e.g., 50 |
| Notify wave bucket | Company tier (often bucket 0–1) |

### 7.4 Commission Rules

- Company base commission (example 10%)
- Volume tiers reduce bps after monthly GMV thresholds
- Seat fees separate from job commission

### 7.5 Priority Rules

- Company coverage can win early waves for multi-branch presence
- Internal assignment quality still affects Ranking/Company score

---

## 8. Entitlements Model

Entitlements are a structured map enforced server-side:

| Entitlement key | Example meaning |
|-----------------|-----------------|
| `offersPerDay` | Hard cap |
| `activeBookingsMax` | Hard cap |
| `matchingPriorityBoost` | Numeric boost / bucket |
| `commissionBps` | Pricing input |
| `analyticsTier` | `basic` \| `advanced` |
| `featuredEligible` | Boolean |
| `seatsIncluded` | Company |
| `branchesIncluded` | Company |
| `supportSlaCode` | Support routing |

Denormalize active entitlements onto technician/company profiles for fast reads; Subscription Engine remains source of truth.

---

## 9. Lifecycle States

| Status | Meaning |
|--------|---------|
| `trialing` | Trial active |
| `active` | Paid and in good standing |
| `past_due` | Renewal payment failed; grace window is policy metadata (`graceEndsAt`), not a separate persisted status |
| `cancelled` | Access ended before the scheduled boundary by explicit cancellation or administrative action |
| `expired` | No access to paid entitlements |
| `paused` | Admin or billing pause (rare) |

Compatibility note: historical docs may say `grace`; that label maps to `past_due` plus grace timing fields and must not be written as a distinct status.

---

## 10. Renewal

### 10.1 Auto-Renew

- Default `autoRenew=true` for paid plans
- Renewal attempts start before `endsAt` (e.g., T-24h) and on failure retry schedule

### 10.2 Successful Renewal

- Extend `endsAt`
- Keep entitlements continuous
- Issue invoice record

### 10.3 Failed Renewal

- Move to `past_due`
- Enter grace period
- Notify provider repeatedly via Notification Engine

---

## 11. Cancellation

### 11.1 Provider-Initiated

- Cancel at period end (default): remain entitled until `endsAt`, then `expired` → Free entitlements
- Cancel immediately (if allowed): lose paid entitlements after refund policy evaluation

### 11.2 Effects

- Stop auto-renew
- Preserve historical invoices
- Ongoing bookings remain completable even if plan expires mid-job (job continuity rule)
- New offers may be blocked if Free caps already exceeded after downgrade

### 11.3 Downgrade Path

Paid → Free entitlements applied at expiration boundary.

### 11.4 Upgrade Path

Free/Pro → higher plan immediate entitlement upgrade; proration charged for remaining period.

---

## 12. Grace Period

### 12.1 Purpose

Avoid cutting off providers during temporary payment failures.

### 12.2 Default Policy

| Parameter | Default intent |
|-----------|----------------|
| Grace length | 3 calendar days |
| Offer submission during grace | Allowed with warning |
| Matching priority during grace | Downgrade to Free priority immediately or retain until grace end (configurable; recommend retain Pro/Premium priority 24h then degrade) |
| Commission schedule during grace | Keep last paid schedule until grace ends |
| After grace | `expired`; Free entitlements; commission jumps to Free |

### 12.3 In-Progress Jobs

Always allowed to finish; payouts follow booking’s frozen commercial terms.

---

## 13. Trials

- One trial per provider identity by default
- Trial entitlements mirror target plan with `trialing` status
- Conversion requires payment method success
- Abuse controls: device/phone graph limits later

---

## 14. Enforcement Points

| Checkpoint | Engine interaction |
|------------|--------------------|
| Offer create | Caps + offersEnabled + plan allow |
| Matching priority | Bucket/boost from entitlements |
| Commission quote | Pricing reads `commissionBps` |
| Company add technician | Seat availability |
| Featured lists | `featuredEligible` |

All checkpoints are server-side.

---

## 15. Invoicing & Payments Hook

Subscription Engine requests payment intents from Payments domain for:

- Initial purchase
- Renewal
- Seat add-ons
- Annual upgrades

Stores `externalSubscriptionId` / invoice IDs; does not store card PANs.

---

## 16. Admin Capabilities

- Grant complimentary periods (audited)
- Force expire for policy violations
- Adjust seats
- Override commission temporarily with reason codes
- View subscription audit trail

---

## 17. GCC Scale Notes

- Plan catalogs per `countryCode`
- Local pricing and VAT on subscription fees
- Company volume tiers by market
- Entitlement checks must be O(1) via profile denormalization + periodic reconciliation

---

## 18. Observability KPIs

- Conversion Free → Pro/Premium
- Churn / renewal failure rate
- Grace recovery rate
- Offer-block events due to caps
- Revenue by plan
- Seat utilization (Company)

---

## 19. Non-Goals

- Customer loyalty tiers (Loyalty Engine)
- Job price suggestion (Pricing Engine)
- Technician Score calculation (Ranking Engine)

---

## 20. Related Documents

- `PRICING_ENGINE.md`
- `MATCHING_ENGINE.md`
- `OFFERS_ENGINE.md`
- `COMPANY_ENGINE.md`
- `../API.md`
- `../BUSINESS_RULES.md`

---

## 21. Canonical Policy — Entitlement Foundation and States

Free entitlements are a foundation dependency of Matching and Offers, not a deferred paid-subscription feature. Every eligible provider receives a versioned `free` entitlement snapshot even when no subscription record exists. Offer caps, active-booking caps, service limits, and base matching access must be enforceable before paid billing launches. Pro, Premium, and Company purchase, invoicing, and paid boosts may ship later without changing those foundation contracts.

Paid subscription canonical statuses are `trialing`, `active`, `past_due`, `paused`, `cancelled`, and `expired`. `grace` is a compatibility alias for `past_due` together with `graceEndsAt`; it is not a separately persisted state. A period-end cancellation keeps status `active` or `past_due` with `cancelAtPeriodEnd=true` until entitlement end, then becomes `expired`. `cancelled` means access ended before the scheduled boundary by explicit cancellation or administrative action. Free baseline eligibility is not represented by a fake active paid subscription.

Entitlement resolution always yields a frozen policy version, source plan, effective interval, and market. During `past_due`, KSA v1 retains paid commission terms for 24 hours, immediately removes paid notification priority, and then applies Free matching priority while other paid limits remain through `graceEndsAt`. At grace end, all new activity uses Free entitlements. Existing bookings retain their acceptance-time commercial snapshot.

Subscription owns commission schedule values and effective dating. Pricing owns arithmetic only. Matching may consume a bounded priority entitlement, but paid status cannot bypass eligibility or guaranteed fairness exposure. Free and new-provider opportunity slots defined by Matching are not sellable entitlements.

Legacy plan descriptions that say paid tiers always outrank Free are interpreted only as eligibility for earlier commercial waves after fairness allocations have been satisfied.
