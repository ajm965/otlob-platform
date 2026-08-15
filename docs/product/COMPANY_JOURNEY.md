# Company Journey

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — Company Journeys  
**Phase:** 1.9  
**Status:** Baseline  

---

## 1. Purpose

Journeys for company organizations that manage multiple technicians, branches, and branded marketplace participation.

**Release tag: `v1.5 / post-MVP` for every journey in this document.** MVP may contain only explicit “company capability unavailable” gates; it does not implement registration, branches, memberships, bidding, assignment, billing, or console workflows.

---

## 2. Company Registration

### Steps

1. Authenticated user starts **Register Company**
2. Enter legal/trade names (AR/EN), CR, VAT (if applicable)
3. Set owner account
4. Submit company shell (`pending` verification)
5. Land on Company Console (limited until verified)

---

## 3. Verification

### Steps

1. Upload org documents
2. Admin review
3. Approved → `active`
4. Rejected → remediation checklist

### Outcome

- Only verified+active companies submit marketplace offers

---

## 4. Branches

### Steps

1. Create branch (name, address, geo, radius, hours, services)
2. Activate/deactivate branches
3. Assign branch managers
4. Matching uses nearest covering branch

### Rules

- Branch count limited by Company subscription
- Inactive branches excluded from matching

---

## 5. Managers & Roles

### Steps

1. Invite users by phone/uid
2. Assign roles: owner, manager, dispatcher, accountant, branch_manager, technician
3. Revoke/remove members
4. Permission changes take effect on next session/claims refresh

Membership records, rather than global claims, are authoritative for company role and branch scope.

See `PERMISSIONS_MATRIX.md`.

---

## 6. Technicians

### Steps

1. Invite/link technicians to seats
2. Map technicians to branches/services
3. Monitor seat utilization
4. Remove/reassign with in-progress job safeguards

---

## 7. Assignments

### Flow

1. Company submits offer (dispatcher/manager)
2. Customer accepts → company booking
3. Dispatcher assigns technician
4. Technician executes job media & completion
5. Reassign if needed before completion (policy)

### Provider identity rule

For v1.5 launch, an active company technician membership disables independent offers for that technician. A time-bound, audited platform allowlist is the only exception. The same person/company relationship cannot submit both an individual and company offer on one request.

### SLA

- Assignment reminders if unassigned after accept

---

## 8. Reports

### Views

- Live jobs board by branch/technician/status
- SLA / response / completion
- Quality (ratings, disputes, warranty claims)
- Utilization and win rate

Export later (CSV) for managers/accountants.

---

## 9. Payments

### Journey

1. Configure company payout account
2. Track job settlements and holds
3. View commission deductions
4. Resolve payout failures with finance/support

Technician wage splits may be out-of-platform initially.

---

## 10. Invoices

### Types

- Customer-facing receipts showing company legal identity
- Platform invoices: commission statements, subscription, seat add-ons
- VAT fields when enabled

### Steps

1. Browse invoice list by period
2. Download/share PDF when available
3. Dispute billing via support (not marketplace dispute)

---

## 11. Subscriptions

### Steps

1. Choose Company plan
2. Manage seats/branches add-ons
3. Renewal, grace, downgrade messaging
4. Entitlement enforcement on offers/seats

---

## 12. Metrics

- Assign time after accept
- Branch coverage fill rate
- Seat utilization
- Company rating trend
- Dispute rate

---

## 13. Related Documents

- `TECHNICIAN_JOURNEY.md`
- `ADMIN_JOURNEY.md`
- `PERMISSIONS_MATRIX.md`
- `docs/engines/COMPANY_ENGINE.md`
- `docs/engines/SUBSCRIPTION_ENGINE.md`
