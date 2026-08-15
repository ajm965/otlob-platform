# Development Guide

**Project:** Otlob Platform  
**Document Type:** Contributor Development Guide  
**Phase:** 1 — Foundation  
**Status:** Baseline  

---

## 1. Purpose

This guide explains how engineers contribute to Otlob Platform: reading order, environment philosophy, local workflows (planned), and phase gates.

**Phase 1 is documentation-only.** Implementation tooling is described so Phase 2 starts cleanly.

---

## 2. First-Week Reading Order

1. Root `README.md`
2. `ARCHITECTURE.md`
3. `BUSINESS_RULES.md`
4. `FIRESTORE_STRUCTURE.md`
5. `API.md`
6. `SECURITY.md`
7. `PROJECT_STRUCTURE.md`
8. `CODING_STANDARDS.md` (summary; practice SSOT is `docs/engineering/CODING_STANDARDS.md`)
9. `GIT_WORKFLOW.md`
10. `ROADMAP.md`
11. `TECH_STACK.md`
12. `DATABASE.md`
13. `FINANCE_AND_SETTLEMENT.md`, `AUTHORIZATION_AND_DATA_ACCESS.md`, `ASYNC_WORKFLOWS.md`, `COMPLIANCE_AND_RETENTION.md`
14. `LIFECYCLE_RECONCILIATION.md`
15. `docs/engineering/README.md` and relevant engine docs

Do not implement features until Phase 2 is authorized and docs are accepted.

---

## 3. Scope Reminders

| Do | Do not |
|----|--------|
| Improve docs and contracts | Build Customer Flutter UI here |
| Design backend modules | Ship fake demo screens |
| Plan indexes/rules | Bypass business invariants |
| Coordinate with Customer team via APIs | Put server secrets in clients |

---

## 4. Repository Setup (Phase 1)

```bash
git clone <repo-url> otlob-platform
cd otlob-platform
```

At Phase 1 there is no app install step. Confirm docs exist under `docs/`.

---

## 5. Planned Tooling (Phase 2+)

### 5.1 Required Tools

| Tool | Purpose |
|------|---------|
| Git | Source control |
| Node.js LTS | Cloud Functions |
| npm/pnpm/yarn (one standard) | Package management |
| Firebase CLI | Emulators, deploy |
| Dart/Flutter SDK | Future Technician/Admin apps only |
| GitHub account | PRs |

### 5.2 Firebase Emulators (Planned)

Local stack should include:

- Auth
- Firestore
- Functions
- Storage

Typical flow (illustrative):

```bash
cd backend/functions
npm install
npm run build
firebase emulators:start --config ../config/firebase.json
```

Exact scripts will be added with scaffolding.

---

## 6. Environment Configuration

| Env | Use |
|-----|-----|
| `dev` | Local/dev Firebase project |
| `staging` | Shared QA |
| `production` | Live |

Rules:

1. Never point local experiments at production
2. Use `.env.example` templates committed; real `.env` ignored
3. Secrets via Secret Manager for deployed Functions

---

## 7. How to Add a Backend Feature (Phase 3+)

1. Confirm rule IDs in `BUSINESS_RULES.md`
2. Confirm data fields in `FIRESTORE_STRUCTURE.md`
3. Confirm/adjust endpoints in `API.md` / OpenAPI
4. Implement module use case + tests
5. Enforce AuthZ
6. Update indexes/rules if needed
7. Open PR with test plan

---

## 8. How to Change Contracts Safely

1. Discuss with Customer app team and future Technician/Admin owners
2. Prefer additive fields
3. If breaking: bump API version, document migration
4. Never silently change enum meanings

---

## 9. Working with the External Customer Team

- Share `API.md` and eventual OpenAPI as the integration contract
- Share error codes and status enums from `shared/constants` (future)
- Do not require Customer UI source to live in this monorepo
- Coordinate Auth claims and bootstrap expectations

---

## 10. Quality Gate Before Merge

- [ ] Follows architecture layering
- [ ] Business rules enforced server-side
- [ ] Tests for critical changes
- [ ] Docs updated
- [ ] No secrets
- [ ] No Customer UI
- [ ] CI green (when available)

---

## 11. Debugging Guidelines (Future)

1. Reproduce with emulators first
2. Capture `requestId` from logs
3. Verify Auth claims and ownership
4. Check Firestore indexes for failed queries
5. For payments, verify idempotency keys and webhook signatures

---

## 12. Localization Development Notes

- Default locale Arabic
- Store language-neutral codes in DB
- Add both `ar` and `en` for user-visible notification content or use keys
- Test RTL layouts when Flutter clients exist

---

## 13. Definition of Done (Feature)

A feature is done when:

1. API behavior matches docs
2. Rules/AuthZ enforced
3. Tests pass
4. Observability events added for funnel-critical steps
5. Docs updated
6. Reviewed and merged

---

## 14. Phase Gates

| From | To | Gate |
|------|----|------|
| Phase 1 | Phase 2 | Docs accepted; structure approved |
| Phase 2 | Phase 3 | Skeleton deployable; CI baseline |
| Phase 3 | Phase 4 | Request/offer/booking solid |
| Phase 4 | Phase 5 | Payments/jobs/trust flows solid |
| Phase 5 | Phase 6 | Clients usable; ops ready to harden |

---

## 15. Getting Help

- Architecture questions → `ARCHITECTURE.md` owners
- Domain disputes → `BUSINESS_RULES.md` + product
- Security questions → `SECURITY.md` owners
- Contract questions → platform + all client teams

---

## 16. Related Documents

- `README.md`
- `ROADMAP.md`
- `GIT_WORKFLOW.md`
- `CODING_STANDARDS.md`
- `PROJECT_STRUCTURE.md`
