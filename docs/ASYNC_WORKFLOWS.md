# Asynchronous Workflows and Reconciliation

**Project:** Otlob Platform  
**Document Type:** Phase 1 Asynchronous Work Standard  
**Phase:** 1 — Foundation  
**Status:** Canonical baseline

---

## 1. Purpose and Decision

This document defines ownership, delivery semantics, retries, dead-letter handling, replay, and reconciliation for asynchronous marketplace work.

**Decision:** Domain transactions persist their authoritative state and a durable outbox event in the same consistency boundary. Delivery is at least once. Consumers must be idempotent and must not infer that event order or uniqueness is guaranteed by transport.

This standard applies to notifications, matching waves, expiry, competing-offer closure, payment webhooks, ledger posting, payouts, warranty issuance, denormalized projections, aggregates, subscription renewal, Home Passport history, loyalty, audit export, and media processing.

---

## 2. Event Envelope

Every durable event records:

- globally unique event ID
- stable event type and schema version
- occurrence and recording timestamps
- producer module and owning market
- aggregate type, aggregate ID, and aggregate version
- correlation ID, causation ID, and request ID
- idempotency identity where initiated by a command or external event
- payload classification and payload reference or minimized payload
- trace context
- retention class

Sensitive PII, media URLs, payment secrets, and KYC content are not copied into general event payloads. Consumers retrieve authorized source data when needed.

Event type meaning is immutable. Additive schema evolution is preferred; incompatible meaning uses a new type or major schema version with a migration window.

---

## 3. Ownership and Delivery

| Concern | Canonical owner |
|---------|-----------------|
| Outbox creation | Module committing the domain transaction |
| Event publication | Platform asynchronous-work infrastructure |
| Consumer behavior and idempotency | Consuming module |
| Dead-letter triage | Consuming module, with platform operations visibility |
| Cross-module schema | Producer owns with consumer review |
| Reconciliation | Domain owner; Finance owns money reconciliation |
| Replay approval | Domain owner plus Security/Finance approval when sensitive |

An outbox event moves through pending, processing, published, and terminal failed operational states. These are infrastructure states and do not become public domain lifecycle enums.

---

## 4. Idempotency and Ordering

Consumers record processed event identity or use a unique business idempotency identity before producing externally visible effects. A duplicate event must leave the same business outcome and must not duplicate notifications, warranties, ledger journals, points, payouts, or projections.

Ordering is enforced only within an aggregate by aggregate version. A consumer that sees a gap or stale version defers, reloads authoritative state, or lets reconciliation repair the projection. Cross-aggregate global ordering is not assumed.

External webhook receipts use provider event ID when trustworthy and a platform fingerprint otherwise. Signature result, provider timestamp, receipt timestamp, and processing outcome are retained immutably.

---

## 5. Retry and Dead-Letter Policy

| Failure class | Handling |
|---------------|----------|
| Transient infrastructure or rate limit | Exponential backoff with jitter and bounded attempts |
| External dependency unavailable | Retry within workflow SLA; circuit-break and alert when sustained |
| Validation or permanent policy failure | No blind retry; dead-letter with reason |
| Missing prerequisite or out-of-order event | Delayed retry followed by reconciliation |
| Unknown or repeated failure | Dead-letter, alert, and owner triage |

Each workflow defines its SLA, maximum attempts, maximum age, and escalation owner before production. Dead-letter records retain the event reference, failure class, attempt history, next action, and resolution. They do not duplicate sensitive payloads.

Replays preserve the original event ID and add a replay attempt identity. Replay access is restricted and audited.

---

## 6. Workflow Requirements

| Workflow | Required idempotent outcome | Reconciliation obligation |
|----------|-----------------------------|---------------------------|
| Request matching waves | One active visibility grant per request/provider/wave policy | Revoke stale grants; detect missed eligible waves |
| Offer acceptance loser closure | Request lock always rejects non-winner accepts; loser statuses converge to canonical terminal reason | Close any submitted loser after accepted request |
| Notifications | At most one logical delivery per recipient/event/channel policy | Detect stuck pending and invalid tokens |
| Payment webhooks | One normalized payment event and state transition per provider event | Compare PSP intent/capture/refund state |
| Ledger posting | One balanced journal per source financial event | Compare all captured/refunded/charged-back amounts to journals |
| Payouts/withdrawals | One disbursement per approved payout identity | Compare provider/bank reports and ledger |
| Warranty issuance | One guarantee per eligible completed booking | Create missing guarantee; flag duplicates |
| Warranty claims/rework | Claim state and linked rework/dispute converge | Detect orphan claim bookings and missed SLA |
| Rating aggregates | Published review source is canonical | Rebuild provider averages/counts |
| Home Passport history | One booking-derived history record | Detect missing or duplicate history |
| Loyalty | One immutable points entry per eligible source/reversal | Rebuild points projection from ledger |
| Subscription renewal | One invoice/payment decision per billing period | Detect entitlement/payment drift |
| Media processing | One scan/derivative result per object generation | Quarantine unscanned or failed objects |

---

## 7. Scheduled Reconciliation

Every eventual projection declares:

- authoritative source
- projection owner
- acceptable staleness
- comparison key and invariant
- repair behavior
- alert threshold
- retention and audit treatment

Reconciliation may repair projections and enqueue missing side effects. It may not silently change an authoritative financial, authorization, or lifecycle decision. Such mismatches become owned cases.

Finance reconciliation cadence and controls are defined in `FINANCE_AND_SETTLEMENT.md`. Privacy deletion and legal-hold reconciliation are defined in `COMPLIANCE_AND_RETENTION.md`.

---

## 8. Observability

Minimum measures include outbox age, publish latency, consumer lag, attempts, dead-letter count/age, duplicate suppression, reconciliation discrepancies, repair count, and workflow SLA breaches. Alerts route to the named domain owner.

Logs use event, correlation, aggregate, market, and request identifiers. They exclude raw PII and sensitive payloads.

---

## 9. Retention

Outbox and consumer-deduplication records are retained long enough to cover maximum retry and replay windows. Financial event receipts and audit events follow legal retention. Privacy-minimized operational events use the shortest useful period. Deletion never removes records subject to legal hold, but access is restricted and deletion resumes when the hold ends.

---

## 10. Finding Resolution

This standard resolves `H-07` and the async/reconciliation portions of `C-01`, `H-01`, `H-11`, and `M-08`.

---

## 11. Related Documents

- `ARCHITECTURE.md`
- `DATABASE.md`
- `FIRESTORE_STRUCTURE.md`
- `FINANCE_AND_SETTLEMENT.md`
- `COMPLIANCE_AND_RETENTION.md`
