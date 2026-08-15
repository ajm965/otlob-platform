# Scheduling Architecture

**Project:** Otlob Platform  
**Document Type:** Phase 1 Scheduling Decision  
**Phase:** 1 — Foundation  
**Status:** Canonical baseline  

---

## 1. Purpose and Decision

This document defines appointment scheduling semantics for booked jobs so travel buffers, arrival confirmation, rescheduling, and no-shows are not invented inconsistently during implementation.

**Decision:** Every confirmed booking carries a scheduled service window owned by the booking aggregate. Scheduling mutations are Functions-only, idempotent, audited, and market-partitioned. Exact ETA promises remain offer/booking snapshots; live GPS tracking is out of KSA v1 scope.

---

## 2. Canonical Fields on Bookings

| Field | Meaning |
|-------|---------|
| `scheduledStartAt` | Window start (UTC) |
| `scheduledEndAt` | Window end (UTC) |
| `arrivalBufferMinutes` | Travel/setup buffer used for provider readiness checks |
| `customerTimezone` | IANA timezone for display and local-day policy |
| `schedulingPolicyVersion` | Frozen policy for fees and no-show rules |
| `arrivalConfirmedAt` | Provider/customer arrival confirmation timestamp when used |
| `rescheduleCount` | Number of successful reschedules |

Optional future `schedulingEvents` history may append immutable change records; KSA v1 may keep the latest window on the booking with audited change events.

---

## 3. Lifecycle Rules

1. Acceptance freezes the initially agreed window from the accepted offer.  
2. Reschedule before the lock window requires the requesting party’s eligibility and counterparty notification; both-party confirmation may be required by policy for material changes.  
3. Reschedule inside the lock window may apply a versioned disclosed fee and is finance-audited when money moves.  
4. Provider no-show and customer no-show are distinct reason codes that may cancel, rebook, or compensate according to policy without inventing a separate booking status.  
5. Job start is allowed only inside the policy window (or with an audited exception), and only when payment authorization remains valid.  
6. Dispute/warranty rework bookings create new windows linked to the owning case.

---

## 4. Non-Goals (KSA v1)

- Continuous live tracking map  
- Multi-stop route optimization  
- Technician calendar sync products beyond booking windows  

---

## 5. Related Documents

- `FINANCE_AND_SETTLEMENT.md` (cancellation/no-show fees)
- `ASYNC_WORKFLOWS.md` (reminder/notification jobs)
- `BUSINESS_RULES.md`
- `product/STATE_MACHINE.md`
- `engines/OFFERS_ENGINE.md`
