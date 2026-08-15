# Business Engines Index

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Phase:** 1.5 — Business Engines  
**Status:** Completed (documentation only)

These specifications define marketplace business engines. They are design documents for senior backend implementation in later phases—not runtime code.

| Document | Engine |
|----------|--------|
| [MATCHING_ENGINE.md](MATCHING_ENGINE.md) | Nearby provider selection & priority |
| [OFFERS_ENGINE.md](OFFERS_ENGINE.md) | Offer lifecycle & acceptance |
| [PRICING_ENGINE.md](PRICING_ENGINE.md) | Prices, fees, tax, surcharges |
| [SUBSCRIPTION_ENGINE.md](SUBSCRIPTION_ENGINE.md) | Free / Pro / Premium / Company plans |
| [WARRANTY_ENGINE.md](WARRANTY_ENGINE.md) | Guarantee issuance & claims |
| [DISPUTE_ENGINE.md](DISPUTE_ENGINE.md) | Conflicts, evidence, refunds, appeals |
| [NOTIFICATION_ENGINE.md](NOTIFICATION_ENGINE.md) | Push, SMS, email, in-app, escalations |
| [TECHNICIAN_RANKING_ENGINE.md](TECHNICIAN_RANKING_ENGINE.md) | Technician Score 0–100 |
| [HOME_PASSPORT_ENGINE.md](HOME_PASSPORT_ENGINE.md) | Digital home profile |
| [COMPANY_ENGINE.md](COMPANY_ENGINE.md) | Multi-technician organizations |
| [LOYALTY_ENGINE.md](LOYALTY_ENGINE.md) | Points, referrals, levels, redemption |

See also: `../ROADMAP.md`, `../BUSINESS_RULES.md`, `../ARCHITECTURE.md`.

---

## Canonical Policy and Compatibility Contract

The canonical-policy sections in these engine documents are the authoritative Business Engine decisions for domain behavior. Earlier descriptive options remain useful design context, but where they conflict with a canonical-policy section, the canonical policy wins. Phase 1 root documents and Product documents remain compatibility projections until their next coordinated revision; implementations must not revive an older conflicting option.

Compatibility aliases are accepted at boundaries for migration and normalized immediately to the canonical value. Aliases are not new lifecycle states and must not be persisted as parallel meanings.

### Shared asynchronous-work standard

Every cross-engine asynchronous interaction uses a durable event envelope containing an event ID, event type and version, aggregate type and ID, market, occurrence time, correlation ID, causation ID, producer, and payload reference or minimal payload. Producers commit the domain change and durable outbox record together. Consumers maintain an inbox receipt keyed by consumer plus event ID and make the resulting side effect idempotent.

Each workflow has one named owning engine, bounded retries with backoff and jitter, a dead-letter destination after retry exhaustion, and an operator-visible reason. Replays retain the original event ID; a deliberate new attempt uses a new event ID linked by causation ID. Ordering is guaranteed only within an aggregate stream. Consumers tolerate duplicate and out-of-order delivery and reject stale transitions without erasing the receipt.

Reconciliation is mandatory, not a substitute for normal delivery. Each owning engine periodically compares authoritative state with its projections and side effects, repairs safe omissions idempotently, and routes ambiguous financial, privacy, or entitlement differences to operations. Reconciliation records the policy version and repair outcome. Notifications, offer-loser closure, matching waves, warranty issuance, subscription renewal, ranking refresh, Home Passport history, and loyalty movements follow this contract.

Sensitive side effects use stricter keys: payment operations use the commercial acceptance idempotency key; warranty issuance uses booking ID; claim transitions use claim ID plus target state; loyalty entries use source financial event ID plus rule code; notifications use recipient plus business event plus template version.

| Interaction | Owning engine | Reconciliation authority |
|-------------|---------------|--------------------------|
| Match decision, visibility grant, and wave cancellation | Matching | Matching compares open requests, grants, eligibility, and queued waves |
| Winner acceptance and loser closure | Offers | Offers compares request lock, booking, winner, and all active losers |
| Payment authorization compensation | Payments/Finance boundary, initiated by Offers | Payments/Finance compares acceptance operations, PSP state, and bookings |
| Warranty issuance and claim projection | Warranty | Warranty compares completed eligible bookings, parents, claims, and rework links |
| Subscription renewal and entitlement projection | Subscription | Subscription compares invoices, billing state, effective plans, and profile snapshots |
| Ranking refresh | Technician Ranking | Ranking rebuilds current scores from finalized source outcomes and policy version |
| Passport history append | Home Passport | Home Passport compares eligible completed domain records with history entries |
| Loyalty movement and redemption | Loyalty | Loyalty compares final financial events, immutable entries, reservations, and balances |
| User delivery | Notification | Notification compares requested logical messages with channel attempts and terminal outcomes |

### Lifecycle source of truth

Each engine owns its domain lifecycle and canonical reason codes. Product state machines are UX projections, not a second authority. Internal operation markers are permitted only when explicitly declared non-user-visible and must not be exposed as persisted domain statuses. Cross-engine overlays such as disputes are modeled independently from the underlying booking lifecycle.
