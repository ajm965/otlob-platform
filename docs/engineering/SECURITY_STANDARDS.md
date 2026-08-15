# Security Standards

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Engineering Handbook — Security Standards  
**Phase:** 1.8  
**Status:** Mandatory  

---

## 1. Purpose

Mandatory security engineering standards for authentication, authorization, secrets, environments, storage, and audit logging. Complements `docs/SECURITY.md` (architecture) with engineer-facing rules.

---

## 2. Authentication Rules

| Rule | Detail |
|------|--------|
| Identity provider | Firebase Authentication |
| API auth | Verify ID token on every privileged request |
| Bootstrap | Create `users/{uid}` via trusted bootstrap path |
| Admin elevation | Never client self-serve; ops-controlled claims sync |
| MFA | Required for admin in production |
| Session revocation | Honor suspension flags / claim revocation |
| OTP abuse | Rate limit and monitor |

Tokens must not appear in logs, URLs, or analytics payloads.

---

## 3. Authorization Rules

1. Deny by default  
2. Check **role** and **resource party/ownership**  
3. Re-check inside transactions for race-sensitive flows  
4. Company actions require membership role  
5. Admin actions audited  
6. Do not use 200 + empty to hide auth bugs—use correct 401/403  

---

## 4. Role Permissions

| Role | Privilege summary |
|------|-------------------|
| `customer` | Own requests, accepts, payments, reviews, homes |
| `technician` | Eligible offers, assigned jobs, own profile/docs |
| `company_operator` | May enter company context when an active membership authorizes the action |
| `platform_staff` | May enter staff context when an active staff membership authorizes the action |

`company` and `admin` are deprecated aliases only. Company and staff privileges always re-check authoritative membership records. See `docs/AUTHORIZATION_AND_DATA_ACCESS.md` and `docs/SECURITY.md`.

---

## 5. Least Privilege

| Surface | Rule |
|---------|------|
| Service accounts | Minimal IAM roles per function set |
| Firestore rules | Narrow reads/writes; prefer Functions for invariants |
| Storage paths | Entity-scoped paths only |
| Engineers | Env access separated; prod break-glass documented |
| Third parties | Scoped PSP/maps keys with referrer/bundle restrictions |

### 5.1 Client-direct vs Functions-only access

Functions/API is the default. Direct Firestore/Storage access is an explicit exception and never authorizes invariant fields.

| Capability | Client-direct allowance | Functions/API-only scope |
|------------|-------------------------|--------------------------|
| Public catalog/provider display | Read a documented public projection only | Build/redact projection; raw provider, KYC, membership, and internal score records |
| Own profile preferences | Update allowlisted display/locale/notification fields only | Roles, status, verification, entitlement, score, company, and money fields |
| Addresses/home data | Read own projection; no direct writes in MVP | Create/update/delete, validation, ownership, audit, and retention |
| Requests/offers/bookings/payments/warranties/claims/disputes/subscriptions | No direct writes | All mutations and sensitive reads/projections |
| Provider matched-request feed | No raw request reads | Privacy-minimized server projection or persisted time-bound visibility grant |
| Chat messages | Realtime read may be allowed for booking parties | Send/moderate/rate-limit; append fields and participant identity are server-set |
| Media/KYC/evidence | Upload bytes only through short-lived signed authorization to an entity-scoped path | Create upload authorization, finalize metadata, scan/process, remove EXIF as policy requires, retain/delete |
| Notifications | Read own inbox; mark-read may be narrowly allowlisted | Create/send/template/channel results |

Every allowed direct operation requires a field allowlist, ownership/party rule, rate/size limit, emulator rule tests, and a documented public DTO distinct from the raw document. New direct access is denied until this matrix and the capability’s detailed contract are updated.

---

## 6. Secrets Management

| Secret type | Storage |
|-------------|---------|
| PSP keys, webhook secrets | Secret Manager |
| SMS provider keys | Secret Manager |
| Admin bootstrap secrets | Secret Manager / vault |
| Maps server key | Secret Manager |

**Forbidden:** secrets in git, screenshots, chat, client apps, CI logs.

Rotation drills required before/during Phase 6 hardening.

---

## 7. Environment Variables

| Rule | Detail |
|------|--------|
| Templates | Commit `.env.example` only |
| Real env files | Gitignored |
| Naming | Clear prefixes `OTLOB_`, per environment |
| Production | Injected by deployment system, not developer laptops |
| Validation | Boot-time required config checks |

---

## 8. Storage Rules

| Rule | Detail |
|------|--------|
| Auth required | No public write buckets |
| Path conventions | Per `docs/SECURITY.md` / Firestore structure |
| Content-type allowlists | Images/PDF as purpose requires |
| Size caps | Enforced server-side and rules |
| Signed uploads | Preferred via `media/upload-urls` |
| Evidence integrity | No silent overwrite of dispute/warranty evidence |
| KYC docs | Owner + admin only |

---

## 9. Audit Logging

Must audit:

- Admin verification / suspension / role changes
- Offer acceptance
- Payment capture/refund
- Dispute resolve / appeal
- Warranty void / claim accept
- Secret-access operational events (where available)

Audit record minimum: actor, action, entity, timestamp, requestId, outcome, reason.

Retention per compliance policy.

---

## 10. Data Protection

- Mask phones/emails in logs
- Minimize PII in push notification bodies
- Encrypt in transit (TLS) everywhere
- Follow KSA/GCC privacy expectations; legal review before launch
- Deletion/export workflows are required before production personal-data processing; legal holds suspend only the scoped deletion and preserve an audit trail
- Evidence, financial, and audit retention decisions state purpose, duration, access scope, hold behavior, and post-hold disposition

---

## 11. Secure SDLC Requirements

| Gate | Requirement |
|------|-------------|
| PR | Security checklist for sensitive paths |
| Dependencies | Vulnerability scanning in CI (Phase 2+) |
| Rules | Unit tests for Firestore/Storage rules |
| Payments | Threat review before production enablement |
| Penetration test | Phase 6 |

---

## 12. Incident Expectations

Engineers must escalate suspected breaches immediately. Do not silently rotate shared credentials without incident tracking.

---

## 13. Related Documents

- `docs/SECURITY.md`
- `API_STANDARDS.md`
- `LOGGING_GUIDE.md`
- `CODE_REVIEW_GUIDE.md`
- `ENGINEERING_PRINCIPLES.md`
