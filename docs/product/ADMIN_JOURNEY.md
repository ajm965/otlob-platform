# Admin Journey

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — Admin / Operations Journeys  
**Phase:** 1.9  
**Status:** Baseline  

---

## 1. Purpose

Journeys for platform operators using the future Admin panel: trust & safety, catalog, financial oversight, and marketplace health.

The global staff gate is `platform_staff`. Admin, Super Admin, Support, Finance, and Operations are product labels for scoped `staffMemberships` permission sets (see `PERMISSIONS_MATRIX.md` and `AUTHORIZATION_AND_DATA_ACCESS.md`); they are not five additional global claim roles. Deprecated `admin` is a compatibility alias only.

---

## 2. Dashboard

### Goal
Situational awareness in one glance.

### Widgets (logical)

- Open requests / unmatched emergencies
- Offers & bookings today
- Payment success / failure rates
- Pending verifications queue depth
- Open disputes & SLA breaches
- Active suspensions
- GMV / completion (as permitted by role)

### Actions

- Drill into queues
- Acknowledge critical alerts

---

## 3. Users

### Journey

1. Search by phone/uid/name
2. View profile, roles, status
3. Suspend / reinstate with reason
4. View related requests/bookings (support)
5. Audit trail of admin actions

---

## 4. Technicians

### Journey

1. Verification queue
2. Approve/reject documents with notes
3. View score, cancellations, claims
4. Toggle `offersEnabled` / force review
5. Inspect earnings holds (if authorized)

---

## 5. Companies

### Journey

1. Org verification queue
2. Review CR/VAT docs
3. Approve/reject/suspend company
4. Inspect seats, branches, dispute rates
5. Override entitlements only with audit (rare)

---

## 6. Requests

### Journey

1. Monitor open/expired/booked
2. Investigate sparse matching
3. Force-expire / moderate abusive content
4. Support customer by explaining state (no silent edits of money fields)

---

## 7. Offers

### Journey

1. Inspect offer storms / spam patterns
2. Invalidate fraudulent offers (policy)
3. Support comparison disputes with snapshots

---

## 8. Payments

### Journey (Finance / Admin)

1. Search payments by booking
2. View statuses, refunds, webhook health
3. Initiate policy refunds (authorized roles)
4. Investigate double-charge / failed captures
5. Export for reconciliation

---

## 9. Subscriptions

### Journey

1. View plan distribution & grace accounts
2. Grant complimentary periods (audited)
3. Force-expire for abuse
4. Seat/plan anomalies

---

## 10. Disputes

### Journey

1. Triage queue by SLA/amount/risk
2. Collect evidence (photos/videos/messages)
3. Decide resolution (refund/rework/no-action/compensation)
4. Handle appeals
5. Close with notifications to parties

---

## 11. Reports

### Operational reports

- Verification throughput
- Dispute outcomes
- Matching empty rates by city/service
- Cancellation reasons

---

## 12. Analytics

### Product analytics views

- Funnel: request → offer → accept → pay → complete → review
- City/service heat
- Retention / repeat booking
- Technician supply health

Sensitive financial analytics restricted to Finance/Super Admin.

---

## 13. Moderation

### Scope

- Reviews (hide/flag)
- Chat abuse reports
- Request media policy violations
- Account bans / strikes

### Rules

- Reason codes mandatory
- Dual-control for severe Super Admin actions when policy requires

---

## 14. Metrics

- Median verification time
- Median dispute resolution time
- Refund accuracy
- False suspension rate
- Queue ages

---

## 15. Related Documents

- `PERMISSIONS_MATRIX.md`
- `EDGE_CASES.md`
- `STATE_MACHINE.md`
- `docs/engines/DISPUTE_ENGINE.md`
- `docs/SECURITY.md`
