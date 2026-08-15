# Loyalty Engine

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Business Engine Specification  
**Engine ID:** `loyalty`  
**Phase:** 1.5 — Business Engines  
**Status:** Design baseline  
**Scale Target:** Millions of users across KSA and future GCC markets  

---

## 1. Purpose

The Loyalty Engine runs the rewards ecosystem for **customer points**, **technician rewards**, **referrals**, **levels/benefits**, and **redemption**—increasing retention and quality behaviors without undermining marketplace integrity (price floors, fraud controls, ranking honesty).

---

## 2. Design Goals

| Goal | Requirement |
|------|-------------|
| Motivation | Reward valuable actions (complete, review, refer) |
| Fairness | Anti-fraud on referrals and self-dealing |
| Clarity | Simple earn/burn rules |
| Separation | Loyalty ≠ paid subscription score boosts |
| Extensibility | GCC partners/coalitions later |

---

## 3. Currencies

| Currency | Audience | Unit |
|----------|----------|------|
| Customer Points (`CP`) | Customers | Integer points |
| Technician Rewards (`TR`) | Technicians/companies | Points or reward credits |
| Referral Credits | Either | Tracked separately then converted |

Money equivalents for redemption are configured in Pricing/Payments; Loyalty never invents cash without finance approval.

---

## 4. Customer Points

### 4.1 Earning Events (defaults)

| Event | Points intent | Notes |
|-------|---------------|-------|
| Booking completed & paid | Base points ∝ amount (e.g., 1 CP per 1 SAR) | Cap per job |
| First booking | Bonus | Acquisition |
| Review submitted | Small bonus | One per booking |
| Home Passport completeness milestones | Bonus | Anti-spam throttles |
| Referral converted | Bonus | After referred user’s first completed booking |
| Seasonal campaigns | Variable | Campaign IDs |

### 4.2 Non-Earn / Clawback

| Event | Effect |
|-------|--------|
| Full refund | Clawback points from that booking |
| Fraud/chargeback | Clawback + freeze |
| Fake reviews | Remove review bonus |
| Dispute loss (customer abuse) | Optional penalty |

### 4.3 Expiration

- Points expire after inactivity window (e.g., 18–24 months) unless prohibited by campaign
- Notify before expiry

---

## 5. Technician Rewards

### 5.1 Earning Events

| Event | Reward intent |
|-------|---------------|
| Completed jobs streak | Milestone bonuses |
| High rating month | Bonus TR |
| Low cancellation month | Bonus TR |
| Fast response SLA badges | Bonus TR |
| Referral of new technician who activates | Bonus TR |
| Campaign quality challenges | Variable |

### 5.2 Redemption Options (examples)

- Subscription fee discount
- Commission rebate credit (finance-approved)
- Featured placement tokens (capped; **does not change Technician Score**)
- Training/certification vouchers
- Physical/partner rewards later

### 5.3 Guardrails

- Rewards cannot bypass verification
- Cannot buy Matching hard-filter exceptions
- Company plans may pool or allocate TR to seats by policy

---

## 6. Referral Program

### 6.1 Customer → Customer

1. Referrer shares code/link  
2. Referee signs up and completes first eligible booking  
3. Both receive bonuses (asymmetric amounts configurable)  

### 6.2 Technician → Technician

1. Referrer invites provider  
2. Referee verifies + completes N jobs  
3. Reward unlocks in stages (verify, first jobs, quality gate)

### 6.3 Anti-Fraud Rules

| Rule | Detail |
|------|--------|
| Self-referral | Block same phone/device/payment instrument graph |
| Circular rings | Velocity + graph detection |
| Geo anomalies | Flag impossible patterns |
| Bonus delay | Pay after completion + dispute window |
| Caps | Max referral bonus per month |

Stable decline codes for blocked rewards.

---

## 7. Levels

### 7.1 Customer Levels (example)

| Level | Threshold intent | Badge |
|-------|------------------|-------|
| Bronze | Default | |
| Silver | Points earned / completed jobs | |
| Gold | Higher | |
| Platinum | Top | |

Level based on rolling 12-month activity + lifetime option (policy).

### 7.2 Technician Reward Tiers (example)

| Tier | Basis |
|------|-------|
| Member | Default verified |
| Silver Pro | Score + volume gates |
| Gold Pro | Higher score/quality |
| Elite | Elite score band + low disputes |

Technician tiers are **reward cosmetics/benefits**, distinct from Subscription plans and from raw Technician Score—though they may require score floors.

---

## 8. Benefits by Level

### 8.1 Customer Benefits (examples)

| Benefit | Bronze | Silver | Gold | Platinum |
|---------|:------:|:------:|:----:|:--------:|
| Standard earn rate | ✓ | ✓ | ✓ | ✓ |
| Earn multiplier | 1.0× | 1.1× | 1.2× | 1.3× |
| Priority support lite | — | — | ✓ | ✓ |
| Exclusive coupons | — | ✓ | ✓ | ✓ |
| Free service fee waivers | — | rare | more | most |
| Early access campaigns | — | — | ✓ | ✓ |

### 8.2 Technician Tier Benefits (examples)

| Benefit | Member | Silver | Gold | Elite |
|---------|:------:|:------:|:----:|:-----:|
| TR earn rate | base | + | ++ | +++ |
| Subscription discount tokens | — | ✓ | ✓ | ✓ |
| Featured tokens / month | 0 | 1 | 2 | 3 |
| Recognition badge | — | ✓ | ✓ | ✓ |

Featured tokens affect **presentation caps**, not Ranking Engine math.

---

## 9. Redemption

### 9.1 Customer Redemption Types

| Type | Description |
|------|-------------|
| Checkout coupon | Convert CP → fixed/percent discount on booking payment |
| Service fee cover | Pay platform fee with points |
| Partner rewards | Future |

### 9.2 Redemption Rules

1. Validate balance and freeze points until payment succeeds  
2. Release freeze on payment failure  
3. Burn on capture success  
4. Respect Pricing minimum floors (points cannot break min cash components if legally required)  
5. Max redeemable percentage per booking (e.g., ≤ 30%)  
6. Idempotent redemption keys  

### 9.3 Technician Redemption Rules

- Apply to subscription invoice or reward catalog orders
- Admin audit for high-value redemptions

---

## 10. Ledger Design (Logical)

All point movements are ledger entries:

| Field | Description |
|-------|-------------|
| Account | user + currency |
| Direction | credit/debit |
| Amount | integer |
| Reason code | earn/burn/clawback/expire/adjust |
| Related entity | booking/referral/campaign |
| Idempotency key | |
| Balance after | |

Never store only a mutable balance without ledger at this scale.

---

## 11. Campaigns

Campaign objects define:

- Multipliers
- Bonus events
- City/service targeting
- Budget caps
- Start/end
- Stacking rules with coupons

Loyalty Engine evaluates campaign eligibility; Pricing applies monetary discounts when redemption converts to money-off.

---

## 12. Interaction with Other Engines

| Engine | Interaction |
|--------|-------------|
| Pricing | Redemption → discount components |
| Subscription | TR redeem for plan discounts |
| Notification | Earn/burn/expiry/referral alerts |
| Ranking | May gate technician tiers; no paid score |
| Dispute | Clawbacks on refunds |
| Home Passport | Completeness bonuses |
| Company | Optional pooled rewards |

---

## 13. Fraud, Compliance & Fairness

- Clear display of points value and expiry (AR/EN)
- Marketing vs transactional notification classes
- Manual adjust only by admin with audit
- Country-specific campaign legality review for GCC expansion

---

## 14. Scale Notes

- Shard ledgers by user id
- Async earn workers on domain events
- Idempotent consumers for booking completion
- Hot accounts (companies) use batched balance materialization

---

## 15. Observability KPIs

- Earn rate / burn rate
- Breakage (expired unused points)
- Referral conversion rate
- Fraud block rate
- Incremental bookings attributable to loyalty (experimentation)
- Tier distribution health

---

## 16. Non-Goals

- Replacing Subscription as monetization for providers
- Selling Technician Score points
- Crypto/token speculation

---

## 17. Related Documents

- `PRICING_ENGINE.md`
- `SUBSCRIPTION_ENGINE.md`
- `TECHNICIAN_RANKING_ENGINE.md`
- `NOTIFICATION_ENGINE.md`
- `DISPUTE_ENGINE.md`
- `HOME_PASSPORT_ENGINE.md`
- `../API.md`
- `../BUSINESS_RULES.md`

---

## 18. Canonical Policy — Ledger Dependency and Launch Gate

Loyalty earning, redemption, expiry, referral conversion, and balances are disabled until the immutable loyalty account and ledger are deployed. A mutable balance, analytics event, notification, or booking flag is never sufficient evidence of points. This makes Loyalty post-MVP unless the ledger foundation is explicitly brought into scope.

Each account is unique by owner, currency, and market. Every credit, debit, reservation, release, burn, expiry, clawback, and adjustment is an immutable entry with amount, rule and policy version, source business event, related entity, effective time, actor, and idempotency key. Balance is a rebuildable materialized projection. Entries are reversed by compensating entries and are never edited or deleted, subject to access restriction and lawful retention.

Financially triggered entries depend on final Payments/Finance events, not booking UI state. Earn is pending until capture and any configured dispute delay complete. Refund and chargeback events create proportional or rule-defined clawbacks keyed to the original financial event. Redemption first creates a reservation, capture converts that reservation to a burn, and payment failure or expiry releases it. Concurrent balance changes are serialized per account and cannot produce a negative available balance.

The canonical idempotency key combines source event ID, loyalty rule code, account, and movement purpose. Event consumers follow the shared inbox/outbox standard. Daily reconciliation compares source financial outcomes, loyalty entries, reservations, and balance projections; missing safe entries are repaired idempotently and conflicting monetary cases enter an operations queue.

Pricing only converts an approved redemption reservation into a frozen discount line and records its funding liability. Loyalty owns point quantity and reservation state; Payments/Finance owns money movement and discount-funding accounting. Notification delivery never determines whether a reward exists.
