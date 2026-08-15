# Security

**Project:** Otlob Platform  
**Document Type:** Security Architecture & Access Control  
**Phase:** 1 — Foundation  
**Status:** Baseline  

---

## 1. Purpose

This document defines authentication, authorization, role permissions, Firestore/Storage security intent, secrets handling, and security engineering practices for Otlob Platform.

Security is enforced primarily **server-side** (Cloud Functions) with Firestore/Storage rules as defense in depth.

**Remediation decision:** Coarse claims now delegate to authoritative staff/company memberships, provider matching uses minimized grants, sensitive resources use Functions/projections, and production privacy/finance controls are gated. Deprecated broad role/subset wording grants no standalone access (`C-02`, `C-05`, `H-06`, `H-08`, `H-13`, `M-05`, `M-06`).

---

## 2. Security Goals

| Goal | Description |
|------|-------------|
| Confidentiality | PII, documents, chats, payments metadata protected |
| Integrity | Marketplace state cannot be forged by clients |
| Availability | Rate limits and abuse controls protect core flows |
| Accountability | Admin and financial actions are audited |
| Least privilege | Every role gets minimum required access |

---

## 3. Authentication Design

### 3.1 Identity Provider

**Firebase Authentication** issues ID tokens verified by Cloud Functions and Security Rules.

### 3.2 Planned Sign-in Methods

| Audience | Method |
|----------|--------|
| Customer | Phone OTP (primary) |
| Technician | Phone OTP (+ optional email) |
| Company admin | Phone/email |
| Platform admin | Email + strong controls (MFA required in production) |

Final method mix is confirmed in Phase 2; architecture supports claims-based auth regardless of factor.

### 3.3 Session Model

- Clients present `Authorization: Bearer <ID_TOKEN>`
- Tokens verified on each privileged API call
- Revocation/suspension checked against `users.status` and custom claims

### 3.4 Bootstrap

On first authenticated call to `POST /auth/bootstrap`:

1. Create `users/{uid}` if missing
2. Assign default role(s) per onboarding path
3. Never accept client-supplied admin role

---

## 4. Authorization Model

### 4.1 Roles

| Role Code | Description |
|-----------|-------------|
| `customer` | Demand-side user |
| `technician` | Individual provider |
| `company_operator` | Coarse indicator; active company membership supplies permissions |
| `platform_staff` | Coarse indicator; active staff membership supplies permissions |

Roles are stored in:

1. Firebase Auth custom claims for global/coarse role gates
2. `users.roles` for claims synchronization
3. `companyMembers` and `staffMemberships` as authoritative scoped permissions

`company` and `admin` are deprecated compatibility aliases. Neither grants scoped access without membership lookup. Claims contain an authorization version and do not contain company/branch lists or detailed staff permissions.

### 4.2 Permission Principles

1. Role check ≠ ownership check — both required when accessing a resource
2. Company members authorize via active company/branch membership + role
3. Staff authorize via active staff membership and route permission; break-glass is time-bound and audited
4. Deny by default

### 4.3 Role Permissions Matrix

| Capability | Customer | Technician | Company member | Platform staff |
|------------|:--------:|:----------:|:-------:|:-----:|
| Manage own profile | ✓ | ✓ | ✓ | ✓ |
| Manage addresses/homes | ✓ | — | — | read/support |
| Create service request | ✓ | — | — | — |
| View own requests | ✓ | visibility projection only | visibility projection only | permission-scoped |
| Submit offers | — | ✓* | ✓* | — |
| Accept/reject offers | ✓ | — | — | override rare |
| Execute jobs / upload media | — | ✓ | assign+✓ | — |
| Initiate payment | ✓ | — | — | finance permission |
| Manage subscription | — | ✓ | ✓ | grant/revoke |
| Manage company technicians | — | — | membership-scoped | operations override |
| Moderate reviews/disputes | — | — | — | trust/safety permission |
| Manage catalog | — | — | — | catalog permission |
| Verify KYC docs | — | — | — | trust/safety permission |
| Suspend users | — | — | — | trust/safety/super-admin permission |

\*Requires verification + active status + entitlements.

### 4.4 Resource Ownership Examples

| Resource | Owner / Parties |
|----------|-----------------|
| Address | `userId` |
| Request | `customerId` |
| Offer | provider + request customer |
| Booking | customer + provider (+ assigned technician) |
| Payment | customer (full), provider (limited), admin |
| Chat | `participantIds` |
| TechnicianDocument | technician owner + admin |
| Dispute | booking parties + admin |
| RequestVisibilityGrant | named provider identity until expiry/revocation |
| Company/Branch | active membership scope |
| Financial records | customer/provider-safe DTOs or permission-scoped finance access |

---

## 5. Server-Side Enforcement (Mandatory)

The following must never rely on client Firestore writes alone:

- Offer accept / booking creation
- Payment intent & state transitions
- Role/claim changes
- Verification approvals
- Guarantee issuance
- Refunds and dispute resolutions
- Subscription entitlement mutations
- Admin suspensions
- Match visibility grant creation/revocation
- Company/staff membership changes
- Ledger, withdrawal, payout, reconciliation, and financial adjustments

Pattern:

```text
Verify token → load user → authorize → validate → transaction → audit → side effects
```

---

## 6. Firestore Security Rules (Design Intent)

> Exact `firestore.rules` authored in Phase 2. This section defines the policy.

### 6.1 Global Defaults

- Deny all by default
- `isSignedIn()`, `isOwner(uid)`, `hasRole('admin')`, `isParty(ids)` helpers
- Soft-deleted docs (`deletedAt != null`) hidden from normal client reads

### 6.2 Collection Policies (Summary)

| Collection | Read | Create | Update | Delete |
|------------|------|--------|--------|--------|
| users | owner, admin | Function/bootstrap | owner (non-role fields), admin/Functions | soft via admin |
| technicians | explicit public projection / owner / staff | Function | Function; staff verification | staff |
| companies | explicit public/member projection / staff | Function | membership-scoped Function; staff verification | staff |
| companyMembers/branches | member projection / staff | Function | Function | Function |
| staffMemberships | authorized security staff | Function | controlled Function | none |
| categories | auth | admin | admin | admin |
| services | auth | admin | admin | admin |
| addresses | owner projection, staff scoped | Function | Function | Function soft |
| requests | owner projection, staff scoped | Function | Function | soft Function |
| requestVisibilityGrants | named provider projection, staff scoped | Matching Function | Matching Function | expiry/revocation |
| offers | parties, admin | provider/Function | Function | soft Function |
| bookings | parties, admin | Function | Function | soft admin |
| payments | limited parties, admin | Function | Function | none |
| subscriptions | owner, admin | Function | Function | none |
| reviews | published public, parties, admin | Function | admin moderation | soft admin |
| ratings | same as reviews | Function | Function | soft admin |
| notifications | owner | Function | owner read-mark | none/TTL job |
| chats | participants, admin | Function | participants limited | admin |
| messages | participants projection | Function canonical | Function | soft |
| disputes | parties, admin | Function | admin resolve / party evidence | none |
| guarantees/warrantyClaims | parties, staff scoped | Function | Function/staff | none |
| technicianDocuments | owner, admin | Function | admin review | admin |
| finance/ledger/payout | no direct client read | Function | Function | none |
| audit/outbox/operations | no direct client read | Function/system | Function/system | retention controlled |
| homeProfiles/home* | owner projection, staff scoped | Function | Function | Function soft |
| maintenanceHistory | owner projection, staff scoped | Function/system | Function limited | soft |

### 6.3 Field-Level Protection

Rules/Functions must prevent clients from writing:

- `roles`, admin flags
- `verificationStatus` (except admin)
- payment `status`
- aggregate counters (except trusted increments)
- `schemaVersion` downgrades

Prefer Functions for sensitive updates even when rules could allow narrower writes.

The complete direct-read/direct-write/Functions matrix and realtime choices are canonical in `AUTHORIZATION_AND_DATA_ACCESS.md`. “Public subset” always means a separate allowlisted projection, never field-level hope against a raw sensitive document.

---

## 7. Storage Security Rules (Design Intent)

### 7.1 Path Conventions

```text
users/{uid}/avatar/{fileName}
requests/{requestId}/media/{fileName}
bookings/{bookingId}/before/{fileName}
bookings/{bookingId}/after/{fileName}
technicians/{technicianId}/documents/{docType}/{fileName}
disputes/{disputeId}/evidence/{fileName}
chats/{chatId}/{fileName}
```

### 7.2 Constraints

| Control | Rule |
|---------|------|
| Auth | Must be signed in |
| Ownership | Path uid/entity must match authorized party |
| Content-Type | Allowlist images/PDF as appropriate |
| Size | Hard max per purpose (e.g., 5–10 MB images) |
| Overwrite | Disallow silent overwrite of evidence where needed |
| Public | No public write; read via signed URLs or auth rules |

### 7.3 Preferred Upload Flow

1. Client calls `POST /media/upload-urls`
2. Server authorizes purpose + entity
3. Client uploads to signed URL
4. Client submits storage path to domain API
5. Server validates object metadata exists and matches allowlist
6. Object remains quarantined until scanning/processing succeeds; user-visible derivatives have prohibited EXIF/location metadata removed

---

## 8. Secrets & Configuration

| Secret | Storage |
|--------|---------|
| PSP keys | Secret Manager |
| Maps server key | Secret Manager |
| Webhook signing secrets | Secret Manager |
| Admin bootstrap keys | Ops vault / Secret Manager |
| Client Firebase config | Non-secret but env-specific; restrict API keys |

**Never** commit secrets to git. **Never** embed server secrets in Flutter apps.

---

## 9. Payment Security

1. PCI scope minimized via PSP tokenization / hosted fields
2. Idempotency keys required
3. Webhook authenticity verified
4. Amounts recomputed server-side from booking, not trusted from client
5. Provider payout data separated from customer payment methods
6. Immutable balanced ledger is financial authority; staff cannot edit posted entries or balance projections
7. Refund, payout, and reconciliation permissions are segregated with dual control above approved thresholds

---

## 10. Abuse, Fraud & Rate Limiting

| Threat | Control |
|--------|---------|
| Offer spam | Caps per request + per provider rate limits |
| Request spam | Per-customer creation limits |
| Brute force OTP | Firebase + additional throttling |
| Fake reviews | One per booking + moderation |
| Bot signups | Device/App Check and velocity controls before open beta |
| Enum scraping | Auth + pagination + anomaly alerts |

---

## 11. Privacy & PII

| Data | Handling |
|------|----------|
| Phone/email | Private to owner/admin; masked in logs |
| National ID docs | Owner + admin only; Storage restricted |
| Chat content | Participants + admin support |
| Location | Exact location withheld from providers until confirmed booking; retained per policy |
| Payment IDs | Store PSP references only |

Logs must avoid raw PII where possible; use user IDs and redaction.

Operational data classification, lawful basis, subject rights, media controls, legal holds, residency/transfers, vendor governance, and retention are defined in `COMPLIANCE_AND_RETENTION.md`.

---

## 12. Audit Logging

Record at minimum for:

- Admin verification decisions
- Suspensions
- Offer acceptances
- Payment captures/refunds
- Dispute resolutions
- Guarantee void/claim
- Role/claim changes
- Company/staff membership and branch-scope changes
- Sensitive staff reads and break-glass access
- Ledger adjustments, withdrawal/payout actions, reconciliation closure

Audit fields: actor, action, entity, before/after summary, timestamp, request id.

---

## 13. Secure Development Practices

1. Threat model updates per major feature
2. Dependency vulnerability scanning in CI (Phase 2+)
3. Least-privilege service accounts for Functions
4. Separate Firebase projects per environment
5. Rules unit tests before production deploy
6. No production data in `dev`
7. PR reviews required for `backend/` and rules

---

## 14. Incident Response (Design Intent)

| Step | Action |
|------|--------|
| Detect | Alerts on auth anomalies, payment failures, rules denials spikes |
| Contain | Suspend users, rotate secrets, disable risky endpoints via flag |
| Eradicate | Patch, revoke tokens, invalidate sessions |
| Recover | Restore services, communicate internally |
| Learn | Postmortem with action items |

Detailed runbooks arrive in Phase 6.

---

## 15. Compliance Gate (KSA)

- Privacy/data inventory and counsel-approved retention register
- PDPL lawful-basis, consent, export/correction/deletion, processor, residency and transfer controls
- VAT/ZATCA invoice, refund, chargeback, PSP/payout/KYC provider, and financial retention sign-off
- Legal-hold, media deletion, incident, and vendor/subprocessor workflows

Legal review and the controls in `COMPLIANCE_AND_RETENTION.md` are mandatory before production data or real-money beta, not deferred hardening.

---

## 16. Security Anti-Patterns (Forbidden)

- Granting admin from client apps
- Trusting client-calculated prices for capture
- Open Storage buckets
- Shared production credentials in chat/email
- Logging ID tokens or document images
- Customer UI secrets coupled into this repo’s server keys

---

## 17. Phase Alignment

| Phase | Security work |
|-------|---------------|
| 1 | This design baseline |
| 2 | Rules skeletons, claims sync, deny-by-default |
| 3–4 | Enforce marketplace & payment invariants |
| 5 | Client secure storage, certificate pinning evaluation |
| 6 | Pen test, App Check, hardening |

---

## 18. Related Documents

- `ARCHITECTURE.md`
- `API.md`
- `FIRESTORE_STRUCTURE.md`
- `BUSINESS_RULES.md`
- `GIT_WORKFLOW.md`
- `CODING_STANDARDS.md`
- `AUTHORIZATION_AND_DATA_ACCESS.md`
- `FINANCE_AND_SETTLEMENT.md`
- `COMPLIANCE_AND_RETENTION.md`
