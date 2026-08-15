# Authorization and Data Access Architecture

**Project:** Otlob Platform  
**Document Type:** Phase 1 Authorization and Access Decision  
**Phase:** 1 — Foundation  
**Status:** Canonical baseline

---

## 1. Purpose and Decision

This document defines the canonical role taxonomy, claims boundary, company authorization model, provider request visibility, and direct-Firestore-versus-Functions access matrix.

**Decision:** Authorization combines a small global-role claim set with authoritative staff and company membership records. Dynamic marketplace eligibility is never inferred in Firestore rules. Provider request discovery uses server-generated, time-bound visibility projections and never grants providers direct read access to raw customer request documents.

Older references to a singular `role`, broad `admin`, `users.companyId`, `companies.adminUserIds`, “related provider scoped,” or “public subset” are compatibility descriptions only. They do not override this document.

---

## 2. Canonical Role Taxonomy

### 2.1 Global claims

| Claim code | Meaning |
|------------|---------|
| `customer` | May act on customer-owned resources |
| `technician` | Has an individual provider profile; eligibility is checked separately |
| `company_operator` | May enter company context when an active membership authorizes the action |
| `platform_staff` | May enter a staff context when an active staff membership authorizes the action |

`company` is a deprecated alias for `company_operator`. `admin` is a deprecated compatibility alias indicating only that a staff membership lookup is required; it never grants unrestricted platform access by itself.

### 2.2 Platform staff memberships

`staffMemberships` are authoritative and may grant one or more scoped codes:

- `super_admin`
- `support`
- `finance`
- `operations`
- `trust_safety`
- `catalog_manager`
- `compliance_auditor`

Every privileged route names required permission codes. Staff codes are not copied into the ID token except for a coarse `platform_staff` gate and optional membership-version marker. This avoids stale, oversized claims.

### 2.3 Company memberships

`companyMembers` are authoritative and may grant:

- `owner`
- `company_admin`
- `branch_manager`
- `dispatcher`
- `technician_member`
- `finance_viewer`

Each membership has company scope, optional branch scope, status, effective dates, and a membership version. A user may have historical or invited memberships, but KSA v1 permits at most one active technician employment membership. An active company technician membership disables independent offers.

---

## 3. Custom Claims Shape and Lifecycle

Custom claims contain only:

- a schema version
- global role codes
- coarse `platform_staff` / `company_operator` indicators
- an authorization version used to detect stale sessions

Claims do not contain company lists, branch lists, staff permission sets, balances, verification state, or dynamic matching eligibility.

Membership and permission changes increment the affected authorization version and revoke refresh tokens for urgent suspension or privilege removal. APIs compare token version with authoritative user authorization version for privileged operations. Normal changes take effect on token refresh; emergency suspension is checked server-side on every privileged call.

Break-glass access is time-bound, reason-bound, MFA-protected, approved according to severity, and produces immutable audit records and alerts. It does not bypass finance dual control.

---

## 4. Provider Match Visibility

### 4.1 Canonical model

Matching creates `requestVisibilityGrants` for each eligible provider identity and notification wave. The grant is both:

- an authorization entitlement to retrieve one limited request projection; and
- the privacy-minimized projection itself.

Providers do not directly read `requests`. The provider feed and detail endpoints read valid grants through Functions. Realtime updates may listen to a provider-owned projection stream, but never to raw requests.

### 4.2 Pre-accept projection

Before acceptance, a provider may receive only:

- request and service identifiers
- category/service labels
- approximate district/city and coarse distance band
- preferred time window
- customer-provided problem summary after moderation controls
- approved media derivatives only when the matching wave policy allows them
- budget range if the customer chose to disclose it
- grant expiry and eligibility reason codes

The projection excludes exact coordinates, street/building, national address, customer contact details, raw media metadata, home profile details, and customer identity.

Exact service address and authorized contact channels become available only to the winning provider after a confirmed booking. Company access is limited to authorized dispatchers and the assigned technician.

### 4.3 Grant lifecycle

A grant is time-bound and bound to `countryCode`, `marketId`, request, provider identity, eligibility policy version, and notification wave. It is revoked or made unusable when:

- the request is booked, cancelled, expired, or materially republished
- the provider is suspended, loses verification, entitlement, service eligibility, or active membership
- its wave or explicit expiry ends
- a privacy or trust-and-safety hold applies

All feed/detail access is audited at a privacy-appropriate level. Expired grant projections are retained only for the short audit period in `COMPLIANCE_AND_RETENTION.md`, without preserving unnecessary customer media.

---

## 5. Client Access Matrix

“Direct read” means a Firestore listener or query to a purpose-built client projection. “Functions” means REST or another server-authorized operation. All unspecified access is Functions-only or denied.

| Capability / data | Direct read | Direct write | Functions-only decision |
|-------------------|-------------|--------------|-------------------------|
| Own user projection | Optional owner listener | None | Profile mutation and device registration |
| Public provider discovery | Purpose-built `providerPublicProfiles` projection | None | Raw technician/company documents and all mutations |
| Catalog | Active public/authenticated projection | None | Catalog administration |
| Addresses | None | None | All CRUD; raw location is private |
| Customer requests | Optional owner-safe projection | None | Create, edit, publish, cancel, detail |
| Provider request feed | Optional provider-owned visibility projection listener | None | Grant creation, feed/detail retrieval, offer eligibility |
| Offers | Optional party-safe projection | None | Submit, edit, finalize, withdraw, reject, accept |
| Bookings/jobs | Optional party-safe projection | None | All lifecycle mutations and media attachment |
| Payments/ledger/payouts | None | None | All reads and writes through role-specific DTOs |
| Notifications | Owner listener permitted | Mark-read field only if the published contract retains direct write; Functions is canonical | Create, delivery, preference changes |
| Chats/messages | Participant-safe projection/listener | Text message append may be allowed only after Phase 2 field/rate-limit review; Functions is canonical v1 | Thread creation, media message finalization, moderation, deletion |
| Reviews | Published review projection | None | Create and moderation |
| Guarantees/claims/disputes | Optional party-safe projection | None | All mutations and evidence attachment |
| Company/membership/branch | Optional member-safe projection | None | Invitations, role/branch changes, assignment |
| Home Passport | Optional owner-safe projection | None | All mutation, sharing consent, maintenance append |
| Media | Signed upload target only | Signed object upload only | Authorization, metadata finalization, scan approval, access URL |
| Staff/admin data | None | None | Permission-scoped, audited APIs only |

Direct projections contain explicit allowlisted fields and are never aliases for raw domain documents. The implementation contract must publish each projection schema before enabling client access.

---

## 6. Realtime Access Matrix

| Experience | Realtime source | Privacy boundary |
|------------|-----------------|------------------|
| Customer offer updates | Customer-owned offer summary projection | Only offers for owned request |
| Provider matched-request feed | Provider-owned visibility grant projection | Time-bound minimized fields |
| Booking status | Party-safe booking projection | Booking parties and assigned technician |
| Chat | Participant-safe chat/message projection | Active participants only |
| Notifications | User-owned inbox projection | Recipient only |
| Payment status | API polling or server push notification; no raw listener | Customer-safe DTO; provider sees earnings-safe DTO |
| Public provider profile/reviews | Cacheable projection; realtime not required | Published fields only |
| Admin/finance queues | No client-direct Firestore | Permission-scoped APIs and audited access |

Realtime is a delivery choice, not an authorization shortcut. REST remains canonical for commands and sensitive reads.

---

## 7. Company and Branch Authorization

`companyMembers` and `companyBranches` are first-class aggregates. Company profile arrays and `users.companyId` may remain as deprecated read caches during migration, but cannot authorize an action.

Branch-scoped actions require an active membership whose company and branch scope cover the resource. Company-wide owner/admin roles cover all active branches. Dispatchers may assign only technicians with active memberships in an allowed branch. Historical membership remains attached to historical bookings for audit but confers no current access.

Company commercial attribution is frozen at offer submission and booking acceptance. Removing or transferring a member does not rewrite historical provider or payout ownership.

---

## 8. Staff Segregation and Audit

- Support may view redacted customer/provider records and manage non-financial support actions.
- Finance may manage approved refunds, holds, payouts, reconciliation, and invoice operations; high-value actions require dual control.
- Operations may monitor marketplace state and execute explicitly catalogued non-financial overrides.
- Trust and Safety manages moderation, suspensions, disputes, and evidence under need-to-know access.
- Catalog Manager controls service taxonomy and market availability.
- Compliance Auditor is read-only for approved audit datasets.
- Super Admin assigns staff memberships and handles emergency controls; it is not a substitute for dual approval.

Every staff read of sensitive PII and every privileged mutation records actor, permission, purpose/reason, resource, request ID, time, outcome, and approval reference where required.

Every “admin may override” capability must appear in an approved override catalog naming eligible role, allowed source/target state, reason codes, customer/provider notice, monetary threshold, second-approval requirement, expiry/reversal behavior, and audit/alert severity. An undocumented override is denied.

---

## 9. Finding Resolution

This decision resolves `C-02`, `C-05`, `H-04`, `H-08`, `H-12`, `H-13`, `M-05`, `M-09`, `L-05`, and the access portions of `H-01`.

---

## 10. Related Documents

- `SECURITY.md`
- `API.md`
- `FIRESTORE_STRUCTURE.md`
- `DATABASE.md`
- `BUSINESS_RULES.md`
- `FINANCE_AND_SETTLEMENT.md`
- `COMPLIANCE_AND_RETENTION.md`
