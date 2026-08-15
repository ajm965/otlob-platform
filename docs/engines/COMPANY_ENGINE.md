# Company Engine

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Business Engine Specification  
**Engine ID:** `company`  
**Phase:** 1.5 — Business Engines  
**Status:** Design baseline  
**Scale Target:** Millions of users across KSA and future GCC markets  

---

## 1. Purpose

The Company Engine enables **organization accounts** that employ or contract multiple technicians, operate branches, assign jobs, manage roles, and view consolidated payments, invoices, and statistics—while remaining compliant with Matching, Offers, Subscription, and Ranking rules.

---

## 2. Design Goals

| Goal | Requirement |
|------|-------------|
| Multi-technician ops | Dispatch and assignment first-class |
| Clear authority | Role-based permissions inside company |
| Brand trust | Company verification and ratings |
| Financial clarity | Org-level payouts and invoices |
| Scale | Seat/branch limits via Subscription |

---

## 3. Company Account Model

### 3.1 Core Entity

| Field group | Examples |
|-------------|----------|
| Identity | Legal name, trade name AR/EN, CR number, VAT number |
| Status | pending/active/suspended |
| Verification | KYC/org documents |
| Owner | `ownerUserId` |
| Subscription | Company plan link |
| Branding | Logo, public description |
| Rating aggregates | From company-attributed jobs |

### 3.2 Lifecycle

```text
registration → verification pending → active → (suspended) → deactivated
```

Offers allowed only when `active` + verified (Business Rules).

---

## 4. Multiple Technicians

### 4.1 Membership

| Field | Description |
|-------|-------------|
| `companyId` | |
| `technicianUserId` | |
| Role inside company | See roles |
| Status | invited/active/removed |
| Branch assignment | Optional primary branch |
| Services override | Optional subset |

### 4.2 Rules

- Seat limits enforced by Subscription Engine
- Technician may be independent historically; an active KSA v1 company technician membership disables independent offers and dual-identity bidding on the same request
- Removing technician requires reassignment of in-progress jobs
- Individual Technician Score retained

### 4.3 Invitation Flow

1. Manager invites phone/uid  
2. Technician accepts  
3. Membership active  
4. Claims/permissions refreshed  

---

## 5. Manager & Roles

### 5.1 Role Set (Company-scoped)

| Role | Responsibilities |
|------|------------------|
| `owner` | Full control including billing & delete/transfer |
| `manager` | Dispatch, assignments, reports, technician management |
| `dispatcher` | Assign jobs, monitor live board, limited settings |
| `accountant` | Payments, invoices, financial reports (read/ops) |
| `technician` | Field execution only |
| `branch_manager` | Manager rights limited to a branch |

### 5.2 Permission Matrix (summary)

| Capability | Owner | Manager | Dispatcher | Accountant | Technician |
|------------|:-----:|:-------:|:----------:|:----------:|:----------:|
| Edit company profile | ✓ | ✓ | — | — | — |
| Manage technicians | ✓ | ✓ | limited | — | — |
| Submit company offers | ✓ | ✓ | ✓ | — | — |
| Assign technician | ✓ | ✓ | ✓ | — | — |
| View all branch jobs | ✓ | ✓ | ✓ | read | own |
| Payments & payouts | ✓ | limited | — | ✓ | — |
| Invoices | ✓ | read | — | ✓ | — |
| Statistics | ✓ | ✓ | ✓ | ✓ | limited |
| Manage roles | ✓ | ✓ | — | — | — |
| Subscription billing | ✓ | — | — | read | — |

Platform `admin` overrides for verification/suspension remain outside company roles.

---

## 6. Branches

### 6.1 Purpose

Geo coverage units for matching and operations.

### 6.2 Fields

| Field | Description |
|-------|-------------|
| Name AR/EN | |
| Address / location / geohash | |
| Service radius | |
| Services offered | Subset of company services |
| Manager | Optional branch_manager |
| Status | active/inactive |
| Working hours | Branch schedule |

### 6.3 Matching Behavior

- Company eligible if **any active branch** covers request point and service
- Distance uses nearest eligible branch
- Notify company dispatch; assignment picks available technician preferably from that branch

### 6.4 Limits

Branch count gated by Company subscription entitlements.

---

## 7. Offering & Assignment Workflow

1. Company (owner/manager/dispatcher) submits offer on open request  
2. On acceptance, booking created with `providerType=company`  
3. Dispatcher assigns `technicianUserId` before/at start  
4. Assigned technician executes job media & completion  
5. Rating may apply to both company aggregate and technician  

### Assignment Rules

- Assignee must be active member
- Must be capable of service (skills)
- Preferably within branch coverage
- Reassignment allowed until completion per policy
- If no assignee by start SLA, escalate notifications

---

## 8. Reports

Operational reports (logical):

| Report | Content |
|--------|---------|
| Jobs board | By status, branch, technician |
| SLA report | Response, arrival, completion times |
| Quality report | Ratings, disputes, warranty claims |
| Utilization | Jobs per technician/day |
| Funnel | Offers → accepts → completes |

Export formats later (CSV) for accountants/managers.

---

## 9. Payments

| Topic | Rule |
|-------|------|
| Customer charge | Same Payments domain as individual bookings |
| Payout beneficiary | Company payout account by default |
| Technician wages | Outside platform or future split-payout feature |
| Holds | Disputes may hold company payouts |
| Subscription fees | Billed to company owner payment method |

Company payout KYC required before withdrawals.

---

## 10. Invoices

| Type | Description |
|------|-------------|
| Customer receipts | Per booking; may show company legal name |
| Platform invoices to company | Commission statements, subscription invoices |
| Seat/add-on invoices | Subscription Engine |

Invoice fields support KSA VAT when enabled.

---

## 11. Statistics

Dashboards for company leadership:

- GMV / completed jobs
- Average rating
- Cancellation rate
- Active technicians / seats used
- Branch performance comparison
- Commission paid
- Offer win rate

Statistics are near-real-time aggregates with daily reconciliation.

---

## 12. Verification & Documents

Company must submit:

- Commercial registration
- VAT certificate (when applicable)
- Owner ID
- Authorized signatory proof (as required)
- Brand logo optional

Admin verification mirrors technician KYC but org-scoped.

---

## 13. Interaction with Other Engines

| Engine | Interaction |
|--------|-------------|
| Subscription | Company plan seats/branches/commission |
| Matching | Branch coverage + company priority |
| Offers | Company as provider identity |
| Ranking | Technician scores + company composite |
| Notification | Dispatch and assignment alerts |
| Dispute | Company is liable party for company bookings |
| Pricing | Company commission schedule |

---

## 14. Scale Notes

- Membership subcollection for large orgs
- Branch geo index for matching
- Avoid unbounded arrays of technician IDs on company root doc
- Multi-country companies future: market partitions per country

---

## 15. Observability KPIs

- Companies active / verified
- Seat utilization
- Median assign time after accept
- Company vs independent win rates
- Dispute rate by company size

---

## 16. Non-Goals

- Full HR/payroll system
- Franchise multi-brand hierarchy (future)
- Customer company accounts (B2B request orgs later)

---

## 17. Related Documents

- `SUBSCRIPTION_ENGINE.md`
- `MATCHING_ENGINE.md`
- `OFFERS_ENGINE.md`
- `TECHNICIAN_RANKING_ENGINE.md`
- `NOTIFICATION_ENGINE.md`
- `../SECURITY.md`
- `../API.md`
- `../BUSINESS_RULES.md`

---

## 18. Canonical Policy — Membership and Bid Identity

Company membership and branch records are first-class authorities. Company root ID arrays and a user’s singular `companyId` are compatibility projections only and must not authorize access, offers, assignment, or payout. An active membership records company, user, company-scoped roles, branch scope, status, effective interval, and audit history. KSA v1 permits at most one active technician membership that grants bidding or assignment authority.

KSA v1 prohibits dual-identity bidding. While a technician has an active company membership, that technician cannot submit an independent offer and cannot appear as a separate independent matching candidate. The company is the provider identity for bidding, commercial attribution, liability, and payout; the assigned technician remains the execution identity and retains an individual quality history. Leaving or removal restores independent eligibility only after membership revocation and entitlement projections are reconciled.

For a request, company-level duplicate detection also blocks an offer from any member identity after the company has offered, and blocks a company offer after any member’s legacy independent offer. Existing pre-membership independent bookings remain attributed to the technician and may be completed, but they do not permit a new independent bid.

Company functionality remains post-MVP unless the release scope explicitly enables the complete company membership, branch, assignment, authorization, and finance boundaries together. Company records must not leak into a Free-only MVP as partial dispatch behavior.
