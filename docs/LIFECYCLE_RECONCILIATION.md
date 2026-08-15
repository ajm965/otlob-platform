# Lifecycle Reconciliation Matrix

**Project:** Otlob Platform  
**Document Type:** Phase 1 Architecture Reconciliation  
**Phase:** 1 — Foundation  
**Status:** Canonical baseline  

---

## 1. Purpose and Decision

This matrix is the signed Product + Architecture reconciliation for public and persisted lifecycle values. Engines own transition semantics. `DATABASE.md` / `FIRESTORE_STRUCTURE.md` own physical enums. Product state machines are UX projections and may not invent persisted statuses.

Internal-only operation markers never appear in public contracts unless promoted here.

---

## 2. Authority Order

1. Security/legal/compliance decisions  
2. Engine canonical policy sections  
3. This matrix + physical model enums  
4. Product Bible projections  
5. Historical narrative wording elsewhere (compatibility only)

---

## 3. Domain Matrix

| Domain | Canonical persisted/public values | Owning engine / doc | Product projection notes | Deprecated aliases |
|--------|-----------------------------------|---------------------|--------------------------|--------------------|
| Global roles | `customer`, `technician`, `company_operator`, `platform_staff` | `AUTHORIZATION_AND_DATA_ACCESS.md` | Staff/company labels map to memberships | `company`, `admin` |
| Request | `draft`, `open`, `matched`, `booked`, `cancelled`, `expired` | Matching / Offers / request module | Matching wave states are internal | — |
| Offer | `submitted`, `withdrawn`, `rejected`, `accepted`, `expired`, `superseded` | Offers Engine | `edited` is history, not a status | Loser reason `rejected_by_acceptance` → `accepted_competitor` |
| Booking | `confirmed`, `in_progress`, `completed`, `cancelled` | Bookings / Offers | Dispute never replaces booking status | Booking status `disputed` |
| Dispute | `open`, `under_review`, `awaiting_party`, `resolved`, `closed`, `appealed`, `cancelled` | Dispute Engine | Overlay locks payout/completion | — |
| Payment | `pending`, `authorized`, `captured`, `voided`, `authorization_expired`, `failed`, `refunded`, `partially_refunded` | Finance | Client shows safe DTOs only | — |
| Acceptance operation phases | `started`, `authorization_pending`, `authorized`, `booking_committed`, `failed`, `voiding`, `voided` / `authorization_expired` | Offers + Finance (`acceptanceOperations`) | Internal; not a request/offer status | `accepting` |
| Guarantee/warranty | `active`, `expired`, `void` | Warranty Engine | “Has claim” derived from claims | Parent status `claimed` |
| Warranty claim | `submitted`, `under_review`, `accepted`, `rework_scheduled`, `rework_in_progress`, `resolved`, `rejected`, `cancelled`, `escalated` | Warranty Engine | Same set in product SM | — |
| Subscription (paid) | `trialing`, `active`, `past_due`, `paused`, `cancelled`, `expired` | Subscription Engine | Grace UX uses `past_due` + `graceEndsAt` | Status `grace` |
| Review | One `reviews` record per booking | Ranking / Reviews | Ratings dimensions live on review | Top-level `ratings` collection |

---

## 4. Client Visibility Rules

| Value class | Client-visible? |
|-------------|-----------------|
| Canonical public statuses above | Yes, via API/DTOs/projections |
| Acceptance-operation phases | No (staff/debug only as needed) |
| Matching wave / sparse markers | No |
| Deprecated aliases | Read-compat only; never written by new code |

---

## 5. Sign-off Checklist

- [x] Critical lifecycle contradictions from Architecture Review V1 reconciled in this matrix  
- [x] Authorize-before-book is the only KSA v1 accept sequence  
- [x] Warranty parent and claims separated  
- [x] Dispute overlay separated from booking status  
- [x] Role taxonomy aligned to `company_operator` / `platform_staff`  

Operational Gate B evidence (capacity tests, counsel sign-off, real-money beta drills) remains outside this document and is tracked in Compliance / Roadmap exit criteria.

---

## 6. Related Documents

- `DATABASE.md`
- `FIRESTORE_STRUCTURE.md`
- `AUTHORIZATION_AND_DATA_ACCESS.md`
- `FINANCE_AND_SETTLEMENT.md`
- `engines/*`
- `product/STATE_MACHINE.md`
