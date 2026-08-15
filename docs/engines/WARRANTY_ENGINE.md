# Warranty Engine

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Business Engine Specification  
**Engine ID:** `warranty` (also called Guarantee Engine)  
**Phase:** 1.5 — Business Engines  
**Status:** Design baseline  
**Scale Target:** Millions of users across KSA and future GCC markets  

---

## 1. Purpose

The Warranty Engine issues, validates, tracks, and settles **service warranties (guarantees)** after eligible job completion. It underpins trust for اطلب ولا تتعنى by defining coverage windows, claim eligibility, and outcomes (rework, rejection, void).

Aligned with domain entity `guarantees` in Firestore design docs.

---

## 2. Design Goals

| Goal | Requirement |
|------|-------------|
| Automatic trust | Warranties issued without manual steps when eligible |
| Clarity | Customers know what is covered and until when |
| Abuse resistance | Claims require evidence and booking linkage |
| Auditability | Every issue/claim/void is attributable |
| Continuity | Claims can spawn rework bookings cleanly |

---

## 3. Warranty Generation

### 3.1 Trigger

Generated when booking transitions to `completed` **and** eligibility checks pass.

### 3.2 Eligibility Checks

| Check | Rule |
|-------|------|
| Completion valid | Booking completed with required after media |
| Service warranty | Service `defaultWarrantyDays` > 0 **or** explicit policy override |
| Not excluded | Category not in no-warranty list |
| Payment state | Per policy: captured or guaranteed payment state |
| No blocking dispute | Optional: delay issuance if dispute open at completion |
| Not already issued | Idempotent one warranty per booking (default) |

### 3.3 Creation Fields (logical)

| Field | Source |
|-------|--------|
| `bookingId` | Completed booking |
| `customerId` / `providerId` | Parties |
| `serviceId` / `categoryId` | Snapshot |
| `coverageDays` | Service default + plan/campaign modifiers |
| `startsAt` | `booking.completedAt` |
| `endsAt` | `startsAt + coverageDays` (end-of-day local policy optional) |
| `termsCode` | Template version |
| `status` | `active` |
| `scopeCode` | What failure modes are covered |
| `exclusionsCode` | Standard exclusions reference |

### 3.4 Duration Modifiers

| Modifier | Example |
|----------|---------|
| Service default | 14 / 30 / 90 days |
| Premium provider perk | +7 days |
| Company policy | Company-specific schedule |
| Campaign | Limited promotional extension |
| Emergency patch jobs | Shorter coverage optional |

Frozen on issuance; later plan changes do not rewrite existing warranties.

### 3.5 Notifications

- Customer: warranty activated (AR/EN) with end date
- Provider: warranty issued under their responsibility

---

## 4. Warranty Duration

### 4.1 Active Window

`startsAt <= now < endsAt` ⇒ potentially claimable if other validations pass.

### 4.2 Timezone

Use market timezone (`Asia/Riyadh` for KSA) for end-of-day semantics if policy uses calendar days rather than exact timestamps.

### 4.3 Extensions

Only admin or formal goodwill workflow may extend `endsAt` with audit reason.

---

## 5. Warranty Validation

Validation occurs at claim attempt and at admin review.

### 5.1 Valid If

1. Status is `active`
2. Current time within coverage window
3. Claimant is the warranty customer (or authorized company customer account rules)
4. Same asset/home context when Home Passport linkage exists (recommended)
5. Issue type in covered `scopeCode`
6. Not excluded (misuse, third-party damage, consumables, acts of nature — per terms)
7. Evidence requirements satisfied
8. No duplicate open claim on same warranty (default)

### 5.2 Invalid Reasons (stable codes)

| Code | Meaning |
|------|---------|
| `warranty_not_found` | Bad id |
| `warranty_not_active` | Parent is void/expired (or not yet active); legacy `claimed` alias is not a claim-blocking parent status |
| `warranty_expired` | Past endsAt |
| `warranty_out_of_scope` | Not covered failure type |
| `warranty_exclusion` | Exclusion hit |
| `warranty_evidence_insufficient` | Missing media/details |
| `warranty_claim_open_exists` | Duplicate open claim |

---

## 6. Warranty Claims

### 6.1 Claim Creation

Customer submits:

- `guaranteeId`
- `reasonCode`
- `description`
- Media evidence (photos/videos)
- Optional Home Passport asset reference
- Preferred visit window

### 6.2 Claim States

| Status | Meaning |
|--------|---------|
| `submitted` | Awaiting triage |
| `under_review` | Admin/provider review |
| `accepted` | Coverage approved |
| `rejected` | Not covered / insufficient |
| `rework_scheduled` | Rework booking created |
| `rework_in_progress` | Linked rework booking is active |
| `resolved` | Closed successfully |
| `cancelled` | Withdrawn by customer |
| `escalated` | Handed to dispute/admin compensation path |

### 6.3 Provider Obligations

On accepted claim:

- Provider must perform rework within SLA (e.g., 48–72 hours contact, scheduled visit rules)
- Failure escalates to Dispute Engine / admin compensation path

### 6.4 Rework Booking

Accepted claims create a linked booking (`claimBookingId`) with:

- Price often `0` for covered rework (policy)
- Same provider preferred; reassignment rules if provider unavailable/suspended
- Warranty may pause or continue per terms (default: original `endsAt` unchanged)

### 6.5 Claim Limits

| Limit | Default intent |
|-------|----------------|
| Max open claims per warranty | 1 |
| Max accepted claims per warranty | Configurable (e.g., 2) |
| Evidence count | Min photos ≥ 2 |

---

## 7. Expired Warranty

### 7.1 Transition

Scheduler marks `active` → `expired` when `endsAt` passed and no blocking open claim requiring freeze.

### 7.2 Effects

- New claims rejected with `warranty_expired`
- Historical warranty remains readable
- Customer guided to create a new paid request if still needing service

### 7.3 Open Claim at Expiry

If a claim was submitted while the warranty was `active` and before `endsAt`, review and resolution may continue after expiry. The parent warranty transitions to `expired` (never to a persisted `claimed` status); open claims keep their own lifecycle until resolved, rejected, cancelled, or escalated.

---

## 8. Void Warranty

Admin may set `void` when:

- Fraudulent completion detected
- Booking completion reversed
- Mutual cancellation with policy void
- Regulatory/legal order

Void requires reason code + notes; notifies both parties.

---

## 9. Interaction with Other Engines

| Engine | Interaction |
|--------|-------------|
| Offers/Bookings | Source booking completion event |
| Ranking | Warranty claim rates feed Technician Score |
| Dispute | Escalation when claim contested |
| Home Passport | Attach claim to asset + history |
| Notification | All status changes |
| Loyalty | Optional points for claim-free completions (later) |

---

## 10. Terms & Scope Framework

Maintain versioned term packs:

- `termsCode` (legal text references)
- `scopeCode` (covered defects: workmanship recurrence, part failure from job, etc.)
- `exclusionsCode` (customer misuse, unrelated issues, force majeure)

Apps show localized summaries; full terms hosted as managed content.

---

## 11. Scale Notes

- Indexed by `customerId+status+endsAt`, `bookingId`, `providerId+status`
- Expiration via scheduled jobs partitioned by date
- Idempotent issuance on booking completion retries
- GCC: country-specific term packs and coverage norms

---

## 12. Observability KPIs

- Warranty issuance rate per completed booking
- Claim rate within 7/30 days
- Claim accept vs reject ratio
- Rework SLA breach rate
- Fraud void rate

---

## 13. Non-Goals

- Manufacturing product warranties unrelated to platform jobs
- Insurance underwriting (may partner later)
- Payment refund execution (Payments/Dispute decide money movement)

---

## 14. Related Documents

- `DISPUTE_ENGINE.md`
- `TECHNICIAN_RANKING_ENGINE.md`
- `HOME_PASSPORT_ENGINE.md`
- `NOTIFICATION_ENGINE.md`
- `../BUSINESS_RULES.md`
- `../API.md`
- `../FIRESTORE_STRUCTURE.md`

---

## 15. Canonical Policy — Warranty Parent and Claims

This section resolves the warranty lifecycle for KSA v1 and overrides earlier wording where necessary.

The warranty is the parent coverage aggregate. Its canonical statuses are `active`, `expired`, and `void`. An accepted claim does not change the parent to a claimed status. The legacy warranty status `claimed` is a read compatibility alias meaning “this warranty has one or more claims”; it is derived from claim records and must not be persisted as the parent lifecycle state.

Every submission creates a durable, separately identified warranty claim linked to the warranty and booking. The claim owns the canonical states `submitted`, `under_review`, `accepted`, `rejected`, `rework_scheduled`, `resolved`, and `cancelled`, with evidence references, SLA timestamps, decision reasons, rework booking linkage, and retention/legal-hold metadata. The earlier `guaranteeId` field name is a compatibility alias for canonical `warrantyId`.

Claim eligibility requires the parent to have been `active` at submission time and the submission timestamp to be within the coverage window. A timely claim continues through review and resolution after the parent expires. Expiry blocks only new claims; it never terminates an existing claim. A later void action requires an audited decision about each open claim rather than silently closing claims.

KSA v1 allows one open claim at a time and up to two accepted claims over a warranty’s lifetime. A resolved or rejected claim does not prevent a later eligible claim within the original window. Limits are frozen in the issued warranty policy snapshot.

### Dispute precedence

A warranty claim is the normal path for a covered workmanship issue. A dispute is the authority for contested coverage, money movement, provider non-compliance, safety, fraud, overcharge, or damage. Opening a dispute does not mutate the warranty parent or erase the claim. It places an independent hold on only the conflicting claim actions. The Dispute Engine’s final resolution controls refunds, compensation, and liability; the Warranty Engine records that outcome and resumes, resolves, or rejects the claim consistently. Non-conflicting warranty work may continue when the dispute decision explicitly allows it.
