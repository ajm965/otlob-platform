# Offers Engine

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Business Engine Specification  
**Engine ID:** `offers`  
**Phase:** 1.5 — Business Engines  
**Status:** Design baseline  
**Scale Target:** Millions of users across KSA and future GCC markets  

---

## 1. Purpose

The Offers Engine manages the full lifecycle of provider quotes against open service requests: creation, editing, withdrawal, expiration, rejection, acceptance, ranking for customer comparison, and related notifications.

**Creates bookings only through acceptance** (handoff to Bookings/Payments domains).  
**Does not** select the nearby candidate set (Matching Engine) or compute Technician Score (Ranking Engine).

---

## 2. Design Goals

| Goal | Requirement |
|------|-------------|
| Exclusivity | At most one accepted offer per request |
| Fair competition | Transparent comparison; anti-spam caps |
| Consistency | Acceptance is transactional and idempotent |
| Speed | Timeouts keep marketplace liquid |
| Trust | Editable only under strict rules |
| Scale | High offer write rates without hot-document collapse |

---

## 3. Offer Lifecycle

### 3.1 States

| Status | Meaning |
|--------|---------|
| `submitted` | Active offer visible to customer |
| `edited` | Logical marker via version history; current status remains `submitted` |
| `withdrawn` | Provider canceled before acceptance |
| `rejected` | Customer explicitly rejected |
| `accepted` | Customer selected this offer; booking created |
| `expired` | Timed out or request closed without acceptance |
| `superseded` | Replaced by provider’s newer offer version (if versioning model used) |

### 3.2 State Transitions

```text
submitted → withdrawn     (provider)
submitted → rejected      (customer)
submitted → accepted      (customer; exclusive)
submitted → expired       (system/timeout/request closed)
accepted  → (terminal for offers engine; booking owns onward flow)
```

Illegal transitions return conflict errors with stable codes.

### 3.3 Lifecycle Timeline (Typical)

1. Request becomes `open` (Matching notifies providers).
2. Providers submit offers (`submitted`).
3. Customer compares ranked offers.
4. Customer accepts one offer **or** rejects some **or** request expires.
5. Engine closes remaining active offers.
6. Notifications fire for all terminal transitions.

---

## 4. Offer Timeout

### 4.1 Offer-Level TTL

Each offer has `expiresAt = createdAt + offerTtl`.

| Context | Default TTL (configurable) |
|---------|----------------------------|
| Normal request | 2 hours |
| Same-day | 60 minutes |
| Emergency | 30 minutes |
| Scheduled future window | Until `request.expiresAt` or policy max |

### 4.2 Request-Level Window

If `request.expiresAt` passes with no acceptance:

- Request → `expired`
- All `submitted` offers → `expired`

### 4.3 Timeout Processing

- Scheduler/queue scans due `expiresAt`.
- Expiration is idempotent.
- Expired offers cannot be accepted.
- Customer receives summary notification when last competitive offers expire (optional).

### 4.4 Extension Rules

- Provider cannot arbitrarily extend TTL after submission unless policy allows one extension before first customer view.
- Admin may extend request window with audit.

---

## 5. Maximum Offers

| Limit | Default intent | Scope |
|-------|----------------|-------|
| Max offers per request | e.g., 15 | All providers combined |
| Max active offers per provider per request | 1 | Prevents duplicates |
| Max offers per provider per day | Plan-based | Subscription Engine |
| Max offers per provider per hour | Anti-abuse | Platform safety |

When request hit max offers:

- New submissions rejected with `request_offer_cap_reached`
- Matching may stop additional notify waves

---

## 6. Offer Editing

### 6.1 When Allowed

Provider may edit a `submitted` offer if **all** are true:

1. Offer not yet accepted/rejected/expired/withdrawn
2. Within edit window (e.g., first 10 minutes **or** before customer has opened offer detail — policy flag)
3. Edit count < `maxEdits` (e.g., 2)
4. Request still `open`

### 6.2 Editable Fields

| Field | Editable |
|-------|----------|
| `amountHalalas` | Yes (within Pricing Engine bounds) |
| `etaMinutes` | Yes |
| `message` | Yes |
| `requestId` / provider identity | No |
| status | No (use dedicated actions) |

### 6.3 Edit Effects

- Persist version history (`offerRevisions`) for dispute evidence.
- Reset or adjust TTL only if policy says so (default: keep original `expiresAt`).
- Notify customer: `offer_updated`.
- Recompute offer ranking position.

### 6.4 Forbidden Edits

- Editing after customer acceptance
- Editing to bypass minimum price / fee rules
- Silent identity change to another technician

---

## 7. Offer Withdrawal

### 7.1 Rules

- Provider may withdraw `submitted` offer.
- Withdrawal is immediate and irreversible for that offer ID.
- Provider may submit a new offer only if duplicate policy allows after withdrawal (default: allowed if request still open and caps allow).

### 7.2 Effects

- Status → `withdrawn`
- Customer notified
- Offer removed from comparison active set
- Counts toward optional withdrawal metrics (Ranking Engine signals)

### 7.3 Abuse

Excessive withdraw/resubmit patterns may trigger rate limits or temporary bid blocks.

---

## 8. Offer Acceptance

### 8.1 Preconditions

1. Actor is request owner customer
2. Request status is `open`
3. Offer status is `submitted` and not past `expiresAt`
4. Provider still eligible (not suspended mid-flight)
5. `Idempotency-Key` provided
6. Pricing/payment prechecks pass if pre-authorization required

### 8.2 Transactional Effects (Authorize-then-Book)

KSA v1 sequence under one commercial idempotency key (see §22):

1. Validate offer/request and create or reuse payment authorization bound to the acceptance key
2. After PSP authorization confirms, commit the request acceptance lock: target offer → `accepted`; request → `booked` with `acceptedOfferId`; booking created with offer/payment snapshot
3. Persist/update the acceptance-operation record phase so compensation and webhooks converge
4. Emit events: booking created, authorization recorded, chat open, notifications
5. Close competing submitted offers asynchronously to `rejected` with reason `accepted_competitor` (`rejected_by_acceptance` is a compatibility alias only)

If authorization fails, no booking is created. If authorization succeeds but the acceptance commit fails or loses a race, Payments voids/releases the hold through the compensation workflow.

### 8.3 Concurrency

- Double accept returns `409 offer_already_accepted` / `request_already_booked`
- Idempotent retry with same key returns original booking/authorization outcome
- A non-winner accept after the request lock exists returns hard conflict even if loser offer status has not yet converged

### 8.4 Post-Acceptance

Offers Engine’s responsibility ends at consistent terminal states + event publish. Capture, job start, and warranty are downstream of the authorized booking.

---

## 9. Offer Rejection

### 9.1 Customer Reject One

- Single offer → `rejected`
- Request remains `open`
- Provider notified
- Does not expire other offers

### 9.2 Customer Reject All (Optional Action)

- Bulk reject remaining offers
- Optionally keep request open for new offers or cancel request (product choice; default keep open until TTL)

### 9.3 System Reject

On acceptance of another offer, remaining offers closed with reason `accepted_competitor`.

---

## 10. Expired Offers

| Trigger | Result |
|---------|--------|
| Offer TTL reached | Offer `expired` |
| Request expired/cancelled | All active offers `expired` |
| Provider plan invalidated mid-flight (rare) | May force expire with reason |

Expired offers:

- Hidden from active comparison
- Visible in history for audit
- Cannot be revived; must create new offer if still allowed

---

## 11. Duplicate Offers

### 11.1 Definition

Duplicate = same provider (technician or company) already has `submitted` offer on same `requestId`.

### 11.2 Handling

| Policy | Behavior |
|--------|----------|
| Default | Reject create with `duplicate_active_offer`; instruct to edit or withdraw |
| Strict | Also block near-duplicate amounts within seconds (spam) |

Company vs technician under that company: treat **provider identity** as company if offer is company-submitted; assigned technician later via Company Engine.

---

## 12. Offer Notifications

| Event | Audience | Channel (via Notification Engine) |
|-------|----------|-----------------------------------|
| Offer submitted | Customer | Push + in-app |
| Offer edited | Customer | Push + in-app |
| Offer withdrawn | Customer | In-app (push optional) |
| Offer rejected | Provider | Push + in-app |
| Offer accepted | Winner provider + losers | Push + in-app (+ SMS optional for winner) |
| Offer expired | Provider (and customer if last offers die) | In-app |
| Offer cap reached | Customer | In-app tip to decide sooner |

Templates are bilingual (AR primary, EN secondary).

---

## 13. Offer Ranking (Customer Comparison)

Ranking is for **display order** on a request’s offer list. It does not auto-accept.

### 13.1 Default Sort Modes

Customer may choose UI sort; platform default recommended:

**Best Value Score** (descending), then price ascending.

### 13.2 Best Value Factors

| Factor | Intent |
|--------|--------|
| Price competitiveness vs suggested/budget | Lower fair price ranks better |
| Provider Technician Score / company score | Quality |
| ETA | Faster when urgency high |
| Rating + completed jobs | Trust |
| Subscription badge | Visible but limited weight |
| Repeat customer affinity | Mild boost |
| Response freshness | Newer active offers mild boost |

### 13.3 Guardrails

- Do not hide cheaper offers solely due to lower subscription.
- Always show price and ETA clearly.
- Flag outliers: extremely low prices as “verify details” (fraud heuristic), without removing them automatically unless hard fraud rules trigger.

### 13.4 Emergency Ranking

Increase weight of ETA + online/response; decrease pure price weight.

---

## 14. Pricing Interaction

On create/edit, Offers Engine calls Pricing Engine validation:

- Minimum / maximum bounds
- Suggested price advisory (non-blocking unless configured)
- Budget warnings (non-blocking by default)
- Commission preview fields for provider

See `PRICING_ENGINE.md`.

---

## 15. Eligibility Interaction

Before create:

1. Request must be `open`
2. Provider must pass Matching hard eligibility **or** be explicitly allowed (admin) 
3. Subscription daily offer caps
4. Verification and `offersEnabled`

Note: Providers can submit only if they can see the request (matched) unless open-bid market mode is enabled later.

---

## 16. Data Snapshot Requirements

Offers must freeze comparison-critical snapshots:

- Provider display name, ratingAvg, score, plan badge
- Amount, currency, ETA, message
- Service labels AR/EN

Snapshots prevent historical distortion when profiles change later.

---

## 17. Scale & Storage Notes

- Offers as top-level collection indexed by `requestId`, `providerId`, `status`
- Avoid writing all offers into the request document
- Acceptance transaction touches request + winner + batch losers (chunk if >500 writes)
- For very popular requests, loser closure via async workers with eventual consistency **only if** acceptance exclusivity already reserved (use lock/flag on request first)

Recommended acceptance algorithm at scale:

1. Transaction: mark request `accepting`/`booked` + winner accepted  
2. Async fan-out: close losers + notifications

---

## 18. Error Codes (Stable)

| Code | When |
|------|------|
| `request_not_open` | Invalid request state |
| `offer_cap_reached` | Max offers |
| `duplicate_active_offer` | Duplicate |
| `offer_not_editable` | Edit rules failed |
| `offer_expired` | TTL passed |
| `offer_not_withdrawable` | Bad state |
| `offer_already_accepted` | Race |
| `price_out_of_bounds` | Pricing Engine rejection |
| `provider_not_eligible` | Eligibility failure |

---

## 19. Observability KPIs

- Time-to-first-offer
- Offers per request (distribution)
- Acceptance rate by rank position
- Withdrawal rate
- Edit rate
- Expiration rate
- Double-accept conflict count (should be ~0 functionally)

---

## 20. Non-Goals

- Matching candidate selection
- Payment capture
- Warranty issuance
- Chat moderation beyond offer messages field length limits

---

## 21. Related Documents

- `MATCHING_ENGINE.md`
- `PRICING_ENGINE.md`
- `SUBSCRIPTION_ENGINE.md`
- `NOTIFICATION_ENGINE.md`
- `TECHNICIAN_RANKING_ENGINE.md`
- `../BUSINESS_RULES.md`
- `../API.md`

---

## 22. Canonical Policy — Acceptance, Payment, and Losers

KSA v1 uses authorize-before-booking under one customer-supplied commercial idempotency key. Acceptance first validates the offer and creates or reuses a payment intent bound to the request, offer, amount snapshot, customer, and key. After the PSP confirms authorization, the Offers Engine transaction reserves the request, accepts the winner, creates the confirmed booking, and records the authorized payment reference. A successful accept response is returned only after that transaction commits.

If authorization fails, no booking is created and the offer remains submitted when still eligible. If authorization succeeds but the acceptance transaction loses a race or fails permanently, Payments must void or release the hold through an idempotent compensation workflow. Duplicate requests with the same key return the original outcome. Payment webhooks may arrive before or after the API continuation; reconciliation completes the transaction or releases an orphan authorization according to the recorded operation phase. Job start is blocked unless the booking has the required valid authorization or an explicitly audited non-card payment exemption.

The booking prerequisite in older payment-intent wording is a compatibility rule for standalone payment operations. The acceptance-bound intent is the sole KSA v1 exception and is not a general authorization without a booking candidate.

### Exclusive lock and asynchronous loser closure

The request transaction is the exclusivity authority. It writes `acceptedOfferId`, the booking reference, and the terminal request state before success is observable. `accepting` is an internal operation marker only, not a request or offer lifecycle status; persisted operation progress belongs to the acceptance operation record.

Loser closure may be asynchronous after exclusivity is committed. Until each loser projection is updated, every read and accept command must treat any non-winning submitted offer on a request with `acceptedOfferId` as closed. A non-winner accept returns hard conflict even if its stored offer status still says submitted.

The canonical loser terminal status is `rejected` with reason `accepted_competitor`. `rejected_by_acceptance` is a compatibility alias for that reason. `expired` is reserved for TTL or request expiry/cancellation and must not describe competitive loss. Loser workers are idempotent, chunked, retryable, and reconciled under the shared asynchronous-work standard.
