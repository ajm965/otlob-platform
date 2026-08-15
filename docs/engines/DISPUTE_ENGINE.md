# Dispute Engine

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Business Engine Specification  
**Engine ID:** `dispute`  
**Phase:** 1.5 — Business Engines  
**Status:** Design baseline  
**Scale Target:** Millions of users across KSA and future GCC markets  

---

## 1. Purpose

The Dispute Engine manages conflict cases between customers and providers over bookings, payments, quality, warranties, and cancellations. It structures evidence, admin decisions, refunds/compensation, and appeals with full auditability.

---

## 2. Design Goals

| Goal | Requirement |
|------|-------------|
| Fairness | Both parties can present evidence |
| Speed | Clear SLAs for triage and resolution |
| Financial safety | Money movement only via authorized outcomes |
| Integrity | Immutable evidence trail |
| Scalability | Queue-based admin operations for high volume |

---

## 3. Dispute Creation

### 3.1 Who Can Open

| Actor | Allowed |
|-------|---------|
| Customer on booking | Yes |
| Provider (technician/company) on booking | Yes |
| Admin on behalf | Yes (audited) |

### 3.2 Eligible Booking States (configurable)

Typically: `completed`, `in_progress`, `cancelled` (with payment), and warranty-claim escalations.

### 3.3 Preconditions

1. Actor is a booking party
2. No other `open`/`under_review` dispute on same booking (default)
3. Within dispute window (e.g., 14 days after completion, longer if warranty active)
4. Reason code required
5. Description min length met

### 3.4 Required Fields

| Field | Description |
|-------|-------------|
| `bookingId` | Anchor |
| `reasonCode` | Taxonomy (quality, no_show, damage, overcharge, warranty_denied, etc.) |
| `description` | Narrative |
| `openedBy` | uid |
| Optional initial evidence | Photos/videos/message refs |

### 3.5 Effects on Open

- Dispute status `open`
- Booking retains its lifecycle status; an open dispute applies policy locks for sensitive transitions (`disputed` is a read alias/overlay, not a booking status write)
- Warranty claims may pause conflicting paths
- Notify counterparty + admin queue
- Freeze certain payouts if policy requires hold

---

## 4. Dispute Lifecycle

| Status | Meaning |
|--------|---------|
| `open` | Submitted, awaiting triage |
| `under_review` | Assigned / evidence gathering |
| `awaiting_party` | Waiting on customer or provider response |
| `resolved` | Decision recorded |
| `closed` | Terminal after resolve + settlement applied |
| `appealed` | Appeal opened on resolution |
| `cancelled` | Withdrawn by opener (if allowed before review deepens) |

Transitions are audited.

---

## 5. Evidence

### 5.1 Evidence Types

| Type | Description |
|------|-------------|
| Photos | Before/after, damage, site conditions |
| Videos | Short clips with size caps |
| Messages | Chat excerpts / exported message IDs |
| Documents | Invoices, permits (PDF) |
| System snapshots | Booking media already on file, offer snapshots, location/time logs |
| Warranty claim file | Linked claim record |

### 5.2 Evidence Rules

| Rule | Detail |
|------|--------|
| Caps | Max files per party; max MB per file; max total |
| Content types | Allowlist only |
| Integrity | Store Storage path + checksum/metadata; no silent overwrite |
| Window | Parties may add evidence until admin locks case |
| Chain of custody | Each upload attributed with timestamp + actor |

### 5.3 Photos

- Prefer original booking before/after automatically attached as system evidence
- Additional dispute photos tagged `dispute_evidence`
- EXIF stripping policy for privacy vs forensic needs (configurable; keep server-side originals restricted)

### 5.4 Videos

- Short duration limit (e.g., ≤ 60–120 seconds)
- Same authz as photos
- Virus/malware scanning in hardening phase

### 5.5 Messages

- Parties can link `chatId` + `messageId` ranges
- Admin can pull full chat transcript for the booking
- System messages included

---

## 6. Admin Decision

### 6.1 Triage

- Priority by amount, urgency, SLA age, fraud risk
- Assign to admin agent
- Move to `under_review`

### 6.2 Decision Framework

Admin selects `resolutionCode` such as:

| Code | Meaning |
|------|---------|
| `refund_full` | Full customer refund |
| `refund_partial` | Partial refund |
| `rework_required` | Provider must rework (link Warranty/Booking) |
| `no_action` | Dispute denied |
| `split_liability` | Shared outcome |
| `compensate_customer` | Platform goodwill credit/points/money |
| `compensate_provider` | Rare goodwill for customer abuse |
| `ban_recommend` | Escalate trust & safety |

### 6.3 Required Decision Package

- Resolution code
- Notes (internal + optional customer/provider messages)
- Financial actions (amounts)
- Responsibility attribution percentages optional
- Evidence relied upon references

### 6.4 SLA Targets (design)

| Stage | Target |
|-------|--------|
| First response | 24 hours |
| Resolution (median) | 72 hours |
| Complex cases | Up to 7–14 days with updates |

---

## 7. Refund

### 7.1 Rules

- Refunds executed only through Payments domain
- Cannot refund more than capturable/captured amount
- Partial refunds allowed
- VAT adjustments follow finance policy
- Idempotent refund requests with keys

### 7.2 Coupling

Dispute Engine emits `RefundRequested` with amount + reason; Payments confirms `Refunded` and dispute records settlement IDs.

### 7.3 Payout Holds

If provider payout not yet released, refund may reduce payout rather than reverse settled funds when possible.

---

## 8. Compensation

Distinct from PSP refunds:

| Compensation type | Description |
|-------------------|-------------|
| Platform credit | Wallet/credit for future bookings |
| Loyalty points | Via Loyalty Engine |
| Coupon | Pricing/coupon grant |
| Provider fee waiver | Subscription/credit note |

Compensation requires budget authority levels (admin role tiers).

---

## 9. Appeal

### 9.1 Eligibility

- Either party may appeal once within appeal window (e.g., 7 days after resolution)
- New material evidence required (default)
- Not allowed for fraud-confirmed bans without legal process

### 9.2 Appeal Flow

1. Status → `appealed`
2. Senior admin review
3. Uphold / amend resolution
4. Final close (second appeal only via executive exception)

### 9.3 Financial Amendments

Additional refunds/clawbacks follow Payments safeguards and legal constraints.

---

## 10. Party Communication Rules

- All official decisions sent via Notification Engine (in-app + push; email/SMS for high severity)
- Side-channel private notes for admins only
- Tone templates AR/EN; avoid leaking counterparty PII

---

## 11. Locking Effects During Dispute

| Action | While disputed |
|--------|----------------|
| Booking complete (if not already) | May block |
| New warranty claim overlap | Coordinated |
| Review submission | May pause or allow with flag |
| Provider offer on same request | N/A (already booked) |
| Payout release | Hold possible |

Exact locks are policy flags.

---

## 12. Fraud & Trust Integration

Signals:

- Repeated disputes by same customer against many providers
- Provider with abnormal dispute-loss rate
- Evidence reuse across unrelated bookings

Outcomes may trigger Ranking penalties, temporary `offersEnabled=false`, or account review.

---

## 13. Scale & Operations

- Admin queues partitioned by market/city/category
- SLA dashboards
- Macros for common resolution codes
- Export packs for legal requests
- GCC multi-country queues with local language support

---

## 14. Observability KPIs

- Disputes per 100 bookings
- Median time to resolve
- Refund amount rate
- Appeal rate / overturn rate
- Reopen rate
- Agent workload

---

## 15. Non-Goals

- Full courtroom legal arbitration system
- Automatic AI final judgments without human admin (AI assist triage only in future)
- Direct card operations inside this engine

---

## 16. Related Documents

- `WARRANTY_ENGINE.md`
- `NOTIFICATION_ENGINE.md`
- `TECHNICIAN_RANKING_ENGINE.md`
- `LOYALTY_ENGINE.md`
- `PRICING_ENGINE.md`
- `../SECURITY.md`
- `../API.md`
- `../BUSINESS_RULES.md`

---

## 17. Canonical Policy — Independent Dispute Overlay

A dispute never becomes a booking status. Canonical booking status remains `confirmed`, `in_progress`, `completed`, or `cancelled`; dispute status is an independent aggregate linked by booking ID. The legacy phrase “booking enters disputed” means `hasOpenDispute=true` as a denormalized query projection only. Closing a dispute clears that projection and never returns a booking to an invented prior state.

Opening a dispute creates a reason-scoped lock policy. Safety, fraud, no-show before completion, and payment-authorization disputes block job start or completion as applicable. A quality dispute after valid completion leaves the booking completed. Reviews may be submitted but are held from publication while the directly related dispute is open. Provider payable release is held up to the disputed exposure; undisputed amounts may proceed when Finance policy permits. Payment capture is blocked only when the dispute concerns authorization, service non-delivery, or an explicit admin hold; it is not globally configurable per case without a reason code.

Warranty claims remain the authority for ordinary covered rework eligibility and claim SLA. Dispute is authoritative for contested warranty decisions, provider refusal or SLA breach, refunds, compensation, fraud, safety, overcharge, damage, and liability. A dispute references rather than replaces the warranty claim. Its final decision directs the Warranty Engine to resume, accept, reject, resolve, or stop the conflicting claim action and directs Payments/Finance separately for money movement.

If a warranty and dispute outcome appear inconsistent, the later final dispute resolution prevails for liability and financial effects; warranty coverage history remains immutable and records the superseding dispute ID. No refund, compensation, rework booking, claim status, or ranking penalty is duplicated across both engines. Each side effect uses the dispute decision ID and action type as its idempotency source and is reconciled under the shared asynchronous-work standard.
