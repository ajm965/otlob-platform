# Business Rules

**Project:** Otlob Platform  
**Document Type:** Domain Business Rules Specification  
**Phase:** 1 — Foundation  
**Status:** Baseline  

---

## 1. Purpose

This document defines authoritative marketplace business rules. Domain lifecycle enums are owned by their engine specifications and reconciled into the canonical physical enums in `DATABASE.md` / `FIRESTORE_STRUCTURE.md`; product state machines are UX projections. Undocumented transient engine states are internal and must not appear in public contracts.

Commercial name: **اطلب ولا تتعنى**  
Market: Saudi Arabia  
Languages: Arabic primary, English secondary

**Remediation decision:** Canonical rules now fix authorization-before-accept ordering, request visibility, lifecycle/dispute separation, warranty multi-claim behavior, Free entitlement sequencing, company attribution, ledger authority, market partitioning, and async/compliance gates. Earlier configurable or dual meanings are retained only as explicit compatibility notes (`C-02`–`C-06`, `H-02`–`H-04`, `H-09`, `H-11`, `H-12`).

---

## 2. Actors & Roles

| Role | Can |
|------|-----|
| Customer | Create requests, compare/accept offers, pay, review, open disputes, manage homes |
| Technician | Receive nearby requests, submit offers, execute jobs, upload media |
| Company | Manage technicians, submit offers, assign technicians, manage org profile |
| Platform staff | Permission-scoped support, finance, operations, trust/safety, catalog, compliance, or super-admin duties |

A user may hold multiple roles over time, but each API action executes in one role context.

Global roles, platform staff sub-roles, company roles, aliases, claims, refresh, and revocation are governed by `AUTHORIZATION_AND_DATA_ACCESS.md`.

---

## 3. End-to-End Happy Path (Canonical)

1. Customer creates a service request
2. Nearby eligible technicians/companies are notified
3. Providers submit offers
4. Customer compares offers
5. Customer initiates acceptance and payment authorization under one idempotency key
6. After authorization, exactly one offer is accepted and the confirmed booking is created
7. Payment is captured on eligible completion
8. Technician starts work and uploads **before** images
9. Technician completes work and uploads **after** images
10. Warranty (guarantee) is generated
11. Customer submits review and rating

Alternate paths: cancel, expire, reject offers, refund, dispute, guarantee claim.

---

## 4. Catalog Rules

### BR-CAT-001
Only `isActive=true` categories/services can be selected for new requests.

### BR-CAT-002
Every request must reference a valid `serviceId`. `categoryId` is derived from the service.

### BR-CAT-003
Service `defaultWarrantyDays` is the default guarantee duration unless an admin override or plan rule applies.

### BR-CAT-004
Catalog create/update/deactivate requires the platform `catalog_manager` permission (or approved super-admin break-glass).

---

## 5. Identity & Onboarding Rules

### BR-ID-001
Every authenticated principal must have a `users` profile (bootstrap on first login).

### BR-ID-002
Technician cannot submit offers unless `verificationStatus=approved` and `status=active`.

### BR-ID-003
Company cannot submit offers unless company `verificationStatus=approved` and `status=active`.

### BR-ID-004
Suspended users cannot create requests, offers, or messages.

### BR-ID-005
Admin role can only be granted through controlled backend/ops process (never by client self-serve).

### BR-ID-006
Technician documents must be reviewed before approval; rejected documents require resubmission.

---

## 6. Address & Geo Rules

### BR-GEO-001
A request must have a resolvable service location (address and/or coordinates).

### BR-GEO-002
Country for service locations is Saudi Arabia (`SA`) in Phase 1 scope.

### BR-GEO-003
Nearby targeting uses provider location + `serviceRadiusKm` + matching `serviceIds`.

### BR-GEO-004
Providers with missing geo data are excluded from nearby matching.

### BR-GEO-005
Customers may store a bounded number of addresses (platform limit).

### BR-GEO-006
Every core marketplace record and list/feed query is constrained by `countryCode` and `marketId`; KSA v1 uses `SA` and `sa`.

### BR-GEO-007
Before acceptance, providers see only a valid time-bound request visibility projection. Exact coordinates, address, customer identity/contact, raw media metadata, and Home Passport data are withheld until confirmed booking.

---

## 7. Request Rules

### BR-REQ-001
Only customers can create requests.

### BR-REQ-002
Request statuses: `draft` → `open` → `booked` | `cancelled` | `expired`  
(`matched` may be used as informational when first offer arrives; not required).

### BR-REQ-003
Only `draft` requests are fully editable. `open` requests allow limited edits (e.g., description) per policy; price-impacting structural changes may require cancel+recreate.

### BR-REQ-004
Publishing a request (`draft` → `open`) triggers provider notification workflow.

### BR-REQ-005
Open requests expire at `expiresAt` if no offer accepted.

### BR-REQ-006
Customer may cancel a request if not yet `booked`.

### BR-REQ-007
A booked request cannot accept additional offers.

### BR-REQ-008
Media on requests is optional but capped (count + size).

### BR-REQ-009
Budget fields are advisory and do not auto-reject offers unless a future filter rule is enabled.

---

## 8. Offer Rules

### BR-OFF-001
Only approved technicians/companies can submit offers on `open` requests.

### BR-OFF-002
Provider must offer the request’s service (service in provider `serviceIds`).

### BR-OFF-003
Provider must be within matching geo criteria for the request (unless admin override / broadcast exceptions).

### BR-OFF-004
A provider may have at most one active (`submitted`) offer per request.

### BR-OFF-005
Offer amount must be > 0 and within platform min/max bounds.

### BR-OFF-006
Maximum number of total offers per request is capped.

### BR-OFF-007
Provider may withdraw a `submitted` offer before acceptance.

### BR-OFF-008
Customer may reject individual offers without closing the request.

### BR-OFF-009
Accepting an offer is transactional:
- customer funds are authorized first under the acceptance idempotency key
- selected offer → `accepted`
- request → `booked`
- booking created

The request acceptance lock is committed synchronously. Other submitted offers close asynchronously to `rejected` with reason `accepted_competitor`; they can never be accepted once the lock exists.

### BR-OFF-010
Double-accept is impossible; second accept returns conflict.

### BR-OFF-011
Offer acceptance requires `Idempotency-Key`.

### BR-OFF-012
Free entitlement policy v1 always gates bidding. Paid plan entitlements may extend it when enabled; paid subscription implementation is not a prerequisite for enforcing Free caps.

### BR-OFF-013
KSA v1 active company technician membership disables independent offers. A person cannot bid independently and through a company on the same request.

---

## 9. Booking Rules

### BR-BOK-001
Booking is created only from an accepted offer.

### BR-BOK-002
Booking inherits amount, parties, service, and address snapshot from request/offer.

### BR-BOK-003
Booking statuses: `confirmed` → `in_progress` → `completed`; alternate terminal status: `cancelled`. Dispute status is an independent lifecycle and does not replace booking status.

### BR-BOK-004
Only assigned technician (or company-assigned technician) can start/complete the job.

### BR-BOK-005
Company may assign/reassign technician while booking is `confirmed` (and possibly early `in_progress` per policy).

### BR-BOK-006
Starting a job requires minimum **before** images.

### BR-BOK-007
Completing a job requires minimum **after** images.

### BR-BOK-008
Customer or provider cancellation follows reason codes and payment implications.

### BR-BOK-009
When a booking has an open/under-review dispute, payout is held and policy-defined completion/capture/review/warranty transitions are blocked without replacing `bookingStatus`.

### BR-BOK-010
Chat thread is created (if not existing) when booking is confirmed.

### Booking/dispute interaction matrix

| Open dispute timing | Booking transition | Payment | Warranty/rework | Review | Payout |
|---------------------|-------------------|---------|-----------------|--------|--------|
| `confirmed` | Start/cancel only by dispute decision | Authorization held; no ordinary capture | Not available | Not available | Held |
| `in_progress` | Completion/cancel only by dispute decision | Capture/refund follows resolution | Rework may be resolution outcome | Deferred | Held |
| `completed` | Booking stays completed | Captured amount may be refunded/adjusted | Warranty remains visible; overlapping remedy requires staff coordination | Existing review retained; new review eligibility may be deferred | Affected payable held |
| `cancelled` | Booking stays cancelled | Fee/refund follows resolution | Only explicit resolution rework | Not eligible by default | Affected payable held |

Closing/resolving a dispute releases only the transitions and funds named in its audited resolution; it never “returns” a booking to an undocumented prior status.

---

## 10. Payment Rules

### BR-PAY-001
Currency is SAR; amounts in halalas.

### BR-PAY-002
Payment records are created only by backend payment flows.

### BR-PAY-003
Card/raw payment credentials are never stored in Firestore.

### BR-PAY-004
Normal KSA v1 acceptance creates/reuses payment authorization before booking commitment. Creating an intent for an already confirmed booking is restricted to an approved retry/recovery compatibility flow.

### BR-PAY-005
KSA v1 authorizes before acceptance commit and captures on eligible completion. Environment configuration may select providers and thresholds, but may not alter this ordering.

### BR-PAY-006
Job start requires valid authorization unless a finance-authorized, audited exception exists.

### BR-PAY-007
Refunds are full or partial; total refunds cannot exceed captured amount.

### BR-PAY-008
All payment mutations are idempotent.

### BR-PAY-009
Webhook signatures must validate before state changes.

### BR-PAY-010
Every accepted booking freezes the KSA v1 commercial and tax line snapshot defined in `FINANCE_AND_SETTLEMENT.md`.

### BR-PAY-011
Provider earnings, holds, balances, withdrawals, and payouts derive only from the immutable financial ledger. Mutable payment or booking totals are not balance authority.

---

## 11. Job Execution & Media Rules

### BR-JOB-001
`start` transitions booking `confirmed` → `in_progress` and sets `startedAt`.

### BR-JOB-002
`complete` transitions `in_progress` → `completed` and sets `completedAt`.

### BR-JOB-003
Before/after images are stored in Storage; Firestore stores references only.

### BR-JOB-004
Image content-type and size must pass validation.

### BR-JOB-005
Tampering with media after completion is forbidden except admin evidence workflows.

---

## 12. Guarantee (Warranty) Rules

### BR-GUA-001
Guarantee is auto-generated on successful booking completion when service/warranty policy applies.

### BR-GUA-002
Guarantee `startsAt` = completion time; `endsAt` = start + coverage days.

### BR-GUA-003
Only `active` guarantees can receive a new claim. A claim does not change the guarantee from `active`; the guarantee remains claimable until expiry/void and policy claim limits.

### BR-GUA-004
Claiming a guarantee creates a separate `warrantyClaims` record with its own lifecycle, evidence, SLA, and rework/dispute links.

### BR-GUA-005
Admin may void guarantees with audited reason.

### BR-GUA-006
Expired guarantees cannot be claimed.

---

## 13. Review & Rating Rules

### BR-REV-001
Only the booking customer can review that booking.

### BR-REV-002
Reviews allowed only after `completed` status (and not blocked by unresolved constraints).

### BR-REV-003
One canonical `reviews` record per booking, containing one overall rating and optional text/dimensions. The separate `ratings` collection is deprecated for KSA v1.

### BR-REV-004
Rating overall must be integer 1–5.

### BR-REV-005
Provider aggregate rating updates after published review.

### BR-REV-006
Admin may hide/flag reviews for policy violations.

### BR-REV-007
Anonymous reviews hide customer display name in public payloads but remain attributable internally.

---

## 14. Notification Rules

### BR-NOT-001
Customer is notified on new offers, booking updates, payment events, guarantee issuance.

### BR-NOT-002
Providers are notified on nearby/open requests (subject to matching), offer acceptance/rejection, assignments.

### BR-NOT-003
Notification create is system-only.

### BR-NOT-004
Users can mark notifications read; cannot forge notifications for others.

### BR-NOT-005
Push delivery failures are recorded; tokens pruned when invalid.

---

## 15. Messaging Rules

### BR-MSG-001
Chat participants are booking parties (customer + provider side users).

### BR-MSG-002
Only participants can read/send messages.

### BR-MSG-003
System messages may be inserted for status changes.

### BR-MSG-004
Rate limiting applies to message sends.

### BR-MSG-005
Off-platform payment solicitation may be moderated (policy text in later trust & safety docs).

---

## 16. Dispute Rules

### BR-DIS-001
Either booking party may open a dispute for eligible statuses (`completed`, `in_progress`, or `cancelled` with payment issues — exact set configured).

### BR-DIS-002
Only one open dispute per booking at a time.

### BR-DIS-003
Opening a dispute may lock sensitive transitions.

### BR-DIS-004
Evidence attachments are capped and scanned/validated.

### BR-DIS-005
Only admin resolves disputes.

### BR-DIS-006
Resolution may trigger refunds, rework, or no-action outcomes with audit trail.

---

## 17. Subscription Rules

### BR-SUB-001
Provider plans define entitlements (max offers/day, visibility boosts, company seats, etc.).

### BR-SUB-002
Offer submission checks active subscription entitlements when gating is enabled.

### BR-SUB-003
Expired/cancelled subscriptions remove paid entitlements after grace policy.

### BR-SUB-004
Admin can grant complimentary plans with audit.

---

## 18. Company Rules

### BR-COM-001
Company owner can invite/link technicians.

### BR-COM-002
Company offers require company verification.

### BR-COM-003
Jobs won by company must be assignable to an active company technician before start (or at start).

### BR-COM-004
Removing a technician cannot orphan an in-progress assignment without reassignment.

### BR-COM-005
Company ratings aggregate from company-attributed bookings.

### BR-COM-006
Company and branch authorization comes from active `companyMembers` and `companyBranches` records. Profile arrays and `users.companyId` never authorize actions.

### BR-COM-007
Company-attributed bookings pay the company beneficiary. Assigned technician attribution is reporting-only unless a future compensation product is approved.

---

## 19. Home Profile & Maintenance Rules

### BR-HOME-001
Customers own their home profiles and assets.

### BR-HOME-002
Completed bookings may auto-append maintenance history entries.

### BR-HOME-003
Manual maintenance entries are allowed and marked `source=manual`.

### BR-HOME-004
Home data is private to owner (and support admin), not public marketplace content.

---

## 20. Cancellation & Expiry Matrix (Summary)

| Entity | Who | Condition | Result |
|--------|-----|-----------|--------|
| Request | Customer | not booked | cancelled; offers expired |
| Request | System | expiresAt passed | expired |
| Offer | Provider | submitted | withdrawn |
| Offer | Customer | submitted | rejected |
| Offer | System | request closed | expired/rejected |
| Booking | Party/Admin | policy window | cancelled + payment handling |

---

## 21. Trust & Safety Rules

### BR-TS-001
Abuse, spam offers, and fake reviews are subject to suspension.

### BR-TS-002
Technicians with repeated cancellations may be temporarily `offersEnabled=false`.

### BR-TS-003
PII in chats/documents accessible only to authorized parties.

### BR-TS-004
All admin overrides are audited (`who`, `when`, `why`).

---

## 22. Localization Rules

### BR-i18n-001
User-facing notifications store AR and EN strings or message keys + params.

### BR-i18n-002
Domain enums are language-neutral codes.

### BR-i18n-003
Default locale is Arabic when unspecified.

---

## 23. Non-Functional Business Constraints

### BR-NFR-001
Server is source of truth for money, acceptance, warranty, and role changes.

### BR-NFR-002
Client-only validation is never sufficient for security-sensitive rules.

### BR-NFR-003
Operations must be observable via structured logs and analytics funnel events.

### BR-NFR-004
Asynchronous side effects use durable outbox events, idempotent consumers, dead-letter ownership, and reconciliation under `ASYNC_WORKFLOWS.md`.

### BR-NFR-005
Production personal/payment processing requires approved privacy, retention, vendor, residency/transfer, and KSA financial-compliance gates under `COMPLIANCE_AND_RETENTION.md`.

---

## 24. Rule Traceability

| Flow step | Primary rules |
|-----------|---------------|
| Create request | BR-REQ-*, BR-CAT-*, BR-GEO-* |
| Notify nearby | BR-GEO-*, BR-NOT-*, BR-ID-* |
| Submit offer | BR-OFF-*, BR-SUB-*, BR-ID-* |
| Accept offer | BR-OFF-009–011, BR-BOK-001–002, BR-PAY-* |
| Start/complete job | BR-JOB-*, BR-BOK-* |
| Warranty | BR-GUA-* |
| Review | BR-REV-* |
| Dispute | BR-DIS-* |

---

## 25. Related Documents

- `API.md`
- `FIRESTORE_STRUCTURE.md`
- `SECURITY.md`
- `ARCHITECTURE.md`
- `ROADMAP.md`
- `FINANCE_AND_SETTLEMENT.md`
- `AUTHORIZATION_AND_DATA_ACCESS.md`
- `ASYNC_WORKFLOWS.md`
- `COMPLIANCE_AND_RETENTION.md`
