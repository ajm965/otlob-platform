# Database

**Project:** Otlob Platform  
**Document Type:** Logical Data Architecture  
**Phase:** 1 — Foundation  
**Status:** Baseline  

---

## 1. Purpose

This document defines the logical data architecture for Otlob Platform: entities, relationships, consistency strategy, indexing philosophy, and governance rules.

Physical Firestore document shapes, field lists, and per-collection security notes live in `FIRESTORE_STRUCTURE.md`.

**Remediation decision:** The logical model now includes missing finance, visibility, membership, branch, claim, and event authorities; fixes technician/review IDs and dispute/warranty lifecycles; and makes market isolation mandatory. This prevents the former optional representations from forking implementation (`C-01`–`C-03`, `C-05`, `H-01`, `H-03`, `H-04`, `H-09`, `L-01`–`L-04`).

---

## 2. Design Goals

| Goal | Description |
|------|-------------|
| Marketplace correctness | Prevent double-booking, invalid payments, orphan warranties |
| Read performance | Optimize for mobile list/detail patterns |
| Auditability | Critical state changes are attributable and timed |
| Scalability | Avoid hotspots; bound fan-out |
| Security | Least privilege; server-enforced invariants |
| Localization readiness | Store enums/codes; localize labels in catalog/i18n |
| Multi-party support | Customers, technicians, companies, admins |
| Market isolation | Every marketplace record is partitioned by `countryCode` and `marketId` |

---

## 3. System of Record

| Store | Responsibility |
|-------|----------------|
| Cloud Firestore | Primary transactional data |
| Firebase Storage | Binary objects (docs, images) referenced by Firestore |
| Firebase Auth | Identity principals (`uid`) |
| Analytics / Logs | Telemetry — not system of record |

---

## 4. Logical Entity Map

```text
User ─────────────┬──────── Customer profile facets
                  ├──────── Technician profile
                  └──────── Admin / company membership

Category ──< Service

Customer ──< Address
Customer ──< HomeProfile ──< HomeAsset ──< MaintenanceHistory

Customer ──< Request ──< Offer
                │
                └──> Booking ──< Payment
                        │
                        ├── Job media (before/after)
                        ├── Guarantee
                        ├── Review / Rating
                        └── Dispute

Company ──< CompanyBranch
Company ──< CompanyMember >── User/Technician
Company / Technician ──< Subscription

Request ──< RequestVisibilityGrant >── Provider
Guarantee ──< WarrantyClaim
Payment ──< PaymentEvent / Refund / Chargeback
Booking ──< LedgerJournal ──< LedgerEntry
Provider ──< Withdrawal / Payout

User ──< Notification
Chat ──< Message
Technician ──< TechnicianDocument
```

---

## 5. Core Entities (Logical)

### 5.1 Identity & Organizations

| Entity | Description |
|--------|-------------|
| User | Auth-linked person; role flags/claims |
| Technician | Provider profile, skills, geo, verification state |
| Company | Organization that employs/manages technicians |
| CompanyMember | Authoritative user-to-company roles and branch scope |
| CompanyBranch | Company operating location and service scope |
| StaffMembership | Authoritative platform staff roles and permissions |
| TechnicianDocument | KYC / license / certification files metadata |

### 5.2 Catalog

| Entity | Description |
|--------|-------------|
| Category | Top-level service taxonomy |
| Service | Bookable service type under a category |

### 5.3 Demand & Supply Matching

| Entity | Description |
|--------|-------------|
| Address | Customer service locations |
| Request | Customer demand for a service at a place/time |
| Offer | Technician/company quote against a request |
| RequestVisibilityGrant | Time-bound, privacy-minimized provider entitlement/projection |

### 5.4 Fulfillment & Money

| Entity | Description |
|--------|-------------|
| Booking | Accepted engagement to perform work |
| Payment | Customer-side PSP authorization/capture state |
| FinancialJournal / Entry | Immutable balanced accounting source of truth |
| Refund / Chargeback | Reversal and external dispute lifecycles |
| Withdrawal / Payout / Settlement | Provider disbursement and PSP settlement lifecycles |
| Subscription | Provider plan entitlements |

### 5.5 Trust & Quality

| Entity | Description |
|--------|-------------|
| Review | Textual feedback |
| Rating | Numeric dimensions embedded in the canonical Review for KSA v1 |
| Guarantee | Warranty issued after eligible completion |
| WarrantyClaim | Independent multi-claim lifecycle and evidence |
| Dispute | Conflict case with evidence and resolution |

### 5.6 Communication

| Entity | Description |
|--------|-------------|
| Notification | User-targeted alerts |
| Chat | Conversation thread bound to booking/request |
| Message | Chat messages |

### 5.7 Home Intelligence

| Entity | Description |
|--------|-------------|
| HomeProfile | Customer property profile |
| HomeAsset | Appliance/system within a home |
| MaintenanceHistory | Historical service events per asset/home |

---

## 6. Relationship Rules

1. A **Request** belongs to exactly one Customer.
2. A **Request** references one Service (and thus Category).
3. An **Offer** belongs to one Request and one provider (Technician or Company).
4. At most **one accepted Offer** per Request (enforced transactionally).
5. A **Booking** is created from exactly one accepted Offer.
6. A **Payment** belongs to one Booking (additional payment attempts may exist as records).
7. A **Guarantee** belongs to one completed Booking.
8. A **Review** is unique per Booking/reviewer pair.
9. A **Dispute** references a Booking (and optionally Payment).
10. **Messages** belong to a Chat; Chat is scoped to a Booking (preferred) or Request.
11. A **Provider** sees an unaccepted Request only through a valid visibility grant; exact address is available only after confirmed booking.
12. Company authorization comes from **CompanyMember**, never profile arrays or `users.companyId`.
13. A **Guarantee** remains active across multiple claims until expiry/void; each claim is a separate WarrantyClaim.
14. Posted financial journals are immutable and balanced; balance documents are projections.

---

## 7. Consistency Model

### 7.1 Strong Consistency Paths (Server Transactions)

Use Firestore transactions / batched writes inside Cloud Functions for:

- Accept offer → create booking → close competing offers
- Payment state transitions
- Job completion → warranty issuance
- Subscription entitlement checks before offer submission (if gated)

### 7.2 Eventual Consistency Paths

Acceptable for:

- Notification fan-out
- Aggregated rating averages on technician profiles
- Analytics counters
- Search denormalizations
- Provider balance and party-safe realtime projections

### 7.3 Idempotency

All money and acceptance operations require an idempotency key to prevent duplicate bookings/charges on retries. Durable outbox events and idempotent consumers follow `ASYNC_WORKFLOWS.md`; every eventual projection has reconciliation ownership.

---

## 8. Identification Strategy

| Item | Convention |
|------|------------|
| Document IDs | Firestore auto-IDs unless a stable external/deduplication key is safer |
| Auth link | `users/{uid}` where `uid` = Firebase Auth UID |
| Technician | `technicians/{uid}`; same Firebase Auth UID for canonical 1:1 profile |
| External refs | Store PSP payment IDs, map place IDs as fields |
| Public codes | Optional human-friendly codes (e.g., `REQ-2026-000123`) in addition to IDs |

---

## 9. Temporal & Audit Fields (Standard)

All mutable domain documents should include:

| Field | Meaning |
|-------|---------|
| `createdAt` | Creation timestamp |
| `updatedAt` | Last mutation timestamp |
| `createdBy` | Actor uid (when applicable) |
| `updatedBy` | Last actor uid |
| `schemaVersion` | Document shape version |
| `deletedAt` | Soft delete marker (nullable) |

Critical workflows additionally append immutable **event/history** subcollections where needed.

---

## 10. Enumerations (Logical)

Store as stable string codes (not localized text):

| Domain | Example values |
|--------|----------------|
| GlobalRole | `customer`, `technician`, `company_operator`, `platform_staff`; `company`/`admin` are deprecated aliases |
| RequestStatus | `draft`, `open`, `matched`, `booked`, `cancelled`, `expired` |
| OfferStatus | `submitted`, `withdrawn`, `rejected`, `accepted`, `expired`, `superseded` |
| BookingStatus | `confirmed`, `in_progress`, `completed`, `cancelled` |
| BookingDisputeStatus | `none`, `open`, `under_review`, `resolved`, `closed` |
| PaymentStatus | `pending`, `authorized`, `captured`, `voided`, `authorization_expired`, `failed`, `refunded`, `partially_refunded` |
| VerificationStatus | `unsubmitted`, `pending`, `approved`, `rejected` |
| DisputeStatus | `open`, `under_review`, `resolved`, `closed` |
| GuaranteeStatus | `active`, `expired`, `void`; `claimed` is deprecated |
| WarrantyClaimStatus | `submitted`, `under_review`, `accepted`, `rework_scheduled`, `rework_in_progress`, `resolved`, `rejected`, `cancelled`, `escalated` |

Localized labels are resolved in clients via i18n catalogs.

---

## 11. Money & Currency

| Rule | Detail |
|------|--------|
| Currency | SAR for KSA v1; each record/journal also carries market partition |
| Storage | Integer **halalas** (1 SAR = 100 halalas) to avoid floating point errors |
| Display | Convert in presentation layer with proper locale formatting |
| Tax | Booking freezes line-level VAT and policy versions under `FINANCE_AND_SETTLEMENT.md` |

---

## 12. Geo Data

| Concept | Storage approach |
|---------|------------------|
| Coordinates | `lat`, `lng` (or GeoPoint) |
| Geohash | For nearby queries |
| Service radius | Technician/company preference in km |
| Address text | Structured fields + optional formatted line |

Nearby matching strategy is specified in `FIRESTORE_STRUCTURE.md` and refined in Phase 3.

Every geo query is constrained by `marketId`. Precise customer coordinates never appear in a provider visibility projection before acceptance.

---

## 13. Indexing Philosophy

1. Define composite indexes from real query plans, not speculation alone
2. Every list endpoint must map to an indexable query whose leading partition is `marketId`
3. Avoid inequality filters on multiple fields in one query
4. Prefer status + owner + time ordering patterns
5. Document indexes per collection in `FIRESTORE_STRUCTURE.md`

---

## 14. Denormalization Policy

Allowed denormalization examples:

- Technician display name/photo on offers for customer comparison lists
- Service name/category on requests
- Aggregate `ratingAvg` / `ratingCount` on technician
- Booking summary fields for dashboards

Rules:

- Source of truth remains the owning entity
- Update denormalized fields via Functions on source change (best-effort + reconciliation jobs later)
- Never denormalize secrets or payment credentials

---

## 15. Soft Delete & Retention

| Data class | Policy (design intent) |
|------------|------------------------|
| PII profiles | Soft delete + retention schedule |
| Financial records | Immutable and retained per approved legal requirements; restrict access |
| Chat messages | Soft delete; hard delete only under policy |
| Media evidence | Retain while dispute/warranty windows active |

Production processing is blocked until counsel approves the operational retention register described in `COMPLIANCE_AND_RETENTION.md`; compliance is not deferred to Phase 6.

---

## 16. Multi-Tenancy Notes

- Platform is single-product multi-party, not multi-brand SaaS in Phase 1
- Company boundaries are enforced by first-class membership records; claims contain only coarse role indicators
- Platform staff permissions come from staff memberships; `admin` is not an unrestricted authorization shortcut
- All ordinary reads and writes are market-scoped; cross-market staff access is explicit and audited

---

## 17. Migration & Schema Evolution

1. Increment `schemaVersion` on breaking document changes
2. Prefer additive fields first
3. Expand/contract migrations via Functions backfills
4. Never rely on clients to migrate critical documents

---

## 18. Data Quality Rules

- Validate enums server-side
- Reject unknown fields on write APIs (allowlists)
- Cap string lengths and array sizes
- Sanitize user text for control characters
- Require content-type checks for media references

---

## 19. Backup & Recovery (Design Intent)

| Control | Plan |
|---------|------|
| PITR / exports | Enable for production Firestore |
| Rules/config | Versioned in git |
| RPO/RTO | Defined in Phase 6 ops runbooks |

---

## 20. Related Documents

- `FIRESTORE_STRUCTURE.md` — physical collections and fields
- `API.md` — how clients interact with data
- `BUSINESS_RULES.md` — lifecycle constraints
- `SECURITY.md` — access control
- `ARCHITECTURE.md` — system context
- `FINANCE_AND_SETTLEMENT.md` — financial authority and reconciliation
- `AUTHORIZATION_AND_DATA_ACCESS.md` — memberships, match visibility, realtime/direct access
- `ASYNC_WORKFLOWS.md` — event delivery and projection reconciliation
- `COMPLIANCE_AND_RETENTION.md` — classification and lifecycle
