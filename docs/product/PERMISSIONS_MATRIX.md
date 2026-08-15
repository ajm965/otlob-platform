# Permissions Matrix

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — Permissions Matrix  
**Phase:** 1.9  
**Status:** Baseline  

---

## 1. Purpose

Explain who can do what across the canonical platform roles and their staff/company permission overlays.

Legend: **F** = Full, **L** = Limited/own or scoped, **R** = Read, **N** = None, **A** = Approve/admin action.

---

## 2. Role Definitions

The canonical global platform role codes are `customer`, `technician`, `company_operator`, and `platform_staff`. Deprecated aliases `company` and `admin` remain readable only as compatibility markers and never authorize actions by themselves. Support, Finance, Operations, and Super Admin are product labels for scoped `staffMemberships` permission sets under `platform_staff`. Company owner/admin/dispatcher/finance_viewer/branch_manager/technician_member are scoped `companyMembers` roles, not global custom claims. Authority: `AUTHORIZATION_AND_DATA_ACCESS.md`.

| Product label | Authorization representation | Description |
|---------------|------------------------------|-------------|
| Customer | Global role `customer` | Demand-side end user |
| Technician | Global role `technician` | Individual provider |
| Company | Global role `company_operator` plus active membership | Organization-capable actor |
| Admin | Global role `platform_staff` plus staff membership | Platform administrator |
| Super Admin | `platform_staff` with `super_admin` / break-glass permission set | Highest audited platform privilege |
| Support | `platform_staff` with support permission set | Customer/provider help; limited mutations |
| Finance | `platform_staff` with finance permission set | Money movement oversight |
| Operations | `platform_staff` with operations permission set | Marketplace health and supply/demand operations |

The controlled claims payload carries only compact global role codes, a primary role, authorization version, and a coarse `platform_staff` / `company_operator` gate. Company IDs, branches, staff permission sets, and detailed membership roles come from authoritative membership records. Claims have a bounded size budget, are refreshed after permission changes, and are revoked on suspension, membership removal, or break-glass expiry.

Company internal roles are defined in Company Engine; the matrix below treats “Company” as org-capable actions at platform level. Company features and their role overlay are `v1.5` unless a criterion is explicitly a “not in MVP” gate.

---

## 3. Matrix — Core Capabilities

| Permission | Customer | Technician | Company | Support | Ops | Finance | Admin | Super Admin |
|------------|:--------:|:----------:|:-------:|:-------:|:---:|:-------:|:-----:|:-----------:|
| Register / login self | F | F | F | N | N | N | F | F |
| Manage own profile | F | F | F | L | N | N | F | F |
| Create service request | F | N | N | N | N | N | N | N |
| View own requests | F | N | N | L | L | N | F | F |
| Submit offers | N | F* | F* | N | N | N | N | N |
| Accept / reject offers | F | N | N | N | N | N | N** | N** |
| Start/complete jobs | N | F | L | N | N | N | N | N |
| Chat on own booking | L | L | L | L | N | N | F | F |
| Pay for booking | F | N | N | N | N | L | L | F |
| Initiate refund | N | N | N | N | N | F | L | F |
| Manage Home Passport | F | N | N | L | N | N | F | F |
| Submit KYC docs | N | F | F | N | N | N | R | F |
| Verify KYC / company | N | N | N | N | N | N | A | A |
| Manage catalog | N | N | N | N | L | N | F | F |
| Manage subscriptions (own) | N | F | F | L | N | R | F | F |
| Grant comp subscriptions | N | N | N | N | N | L | L | F |
| Open dispute | L | L | L | L | N | N | F | F |
| Resolve dispute | N | N | N | N | N | L | F | F |
| Moderate reviews/content | N | N | N | L | L | N | F | F |
| Suspend users | N | N | N | N | L | N | F | F |
| View analytics dashboard | N | L | L | L | F | F | F | F |
| View all PII unrestricted | N | N | N | L | L | L | F | F |
| Manage roles / claims | N | N | N | N | N | N | L | F |
| System configuration | N | N | N | N | L | N | L | F |

\*Requires verification + active status + entitlements.  
\*\*Only emergency break-glass with audit—not normal support path.

---

## 4. Permission Explanations (Selected)

### Create service request
Only customers create demand. Providers respond via offers.

### Submit offers
Technicians/companies that are verified, active, eligible, and within subscription caps.

### Accept offers
Only the request-owning customer (or future authorized household role—not in MVP).

### Start/complete jobs
Assigned technician; company dispatchers assign but field technician executes media gates.

### Pay / refund
Customer pays; Finance/Admin refund per policy; Support generally cannot raw-refund without Finance/Admin.

### Verify KYC
Admin/Super Admin (and designated Trust queue). Support may view status, not approve.

### Resolve dispute
Admin/Super Admin; Finance collaborates when money moves; Support gathers info.

### Suspend users
Admin/Super Admin; Ops may request; Support files cases.

### Manage roles/claims
Super Admin primarily; limited Admin for low-risk ops if delegated.

### View PII
Least privilege: Support sees what is needed for tickets; full unrestricted access is Super Admin/Admin tightly audited.

---

## 5. Company Internal Overlay

| Company role | Typical extras |
|--------------|----------------|
| Owner | Billing, delete/transfer, all managers rights |
| Manager | Technicians, branches, offers, reports |
| Dispatcher | Offers, assignments, live board |
| Accountant | Invoices, payouts read, limited profile |
| Branch manager | Branch-scoped dispatch/reports |
| Technician member | Execute assigned jobs only |

---

## 6. Enforcement Rules

1. UI hiding is not security—API must enforce  
2. Every grant of Admin/Super Admin is audited  
3. Suspended ⇒ privileged permissions become N  
4. Permission changes increment the authorization version, revoke/refresh affected sessions, and invalidate cached membership decisions  
5. Break-glass is time-bound, reasoned, separately approved where policy requires, and fully audited  
6. Route permissions use this taxonomy; a new staff label or company role cannot be introduced as a new global role alias  

---

## 7. Related Documents

- `ADMIN_JOURNEY.md`
- `COMPANY_JOURNEY.md`
- `docs/SECURITY.md`
- `docs/engineering/SECURITY_STANDARDS.md`
- `docs/engines/COMPANY_ENGINE.md`
