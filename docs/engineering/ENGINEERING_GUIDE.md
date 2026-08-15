# Engineering Guide

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Engineering Handbook  
**Location:** `docs/engineering/ENGINEERING_GUIDE.md`  
**Phase:** 1.8  
**Audience:** All engineers (20+ person team)  
**Status:** Mandatory baseline  

---

## 1. Purpose

This guide defines how engineers work on Otlob Platform day to day: workflow, architecture obedience, module ownership, documentation duties, review expectations, and Definition of Done.

All engineers must read this document before contributing code in Phase 2+.

---

## 2. Mission Context

Otlob is a Saudi Arabia–first home services marketplace designed to scale across the GCC. Engineering quality, security, and documentation are not optional—they are product features.

**Hard boundaries**

- Customer Flutter UI is owned by a separate team/repository
- This monorepo holds platform docs, backend, shared contracts, and future Technician/Admin apps
- Business rules are enforced server-side

---

## 3. Development Workflow

### 3.1 Standard Flow

```text
1. Read relevant docs (architecture, engines, standards)
2. Confirm ticket scope and owning module
3. Create feature/fix branch from main
4. Implement behind module boundaries
5. Add/update tests
6. Update docs/contracts if behavior changes
7. Open Pull Request with checklist completed
8. Address review feedback
9. Merge only when CI and reviews pass
10. Verify staging when required
```

### 3.2 Before Writing Code

Ask:

1. Which module owns this change?
2. Which business rule IDs apply (`docs/BUSINESS_RULES.md` / engines)?
3. Does `docs/API.md` or OpenAPI need an update?
4. Does Firestore shape/index guidance change?
5. Is this a security-sensitive path (payments, roles, accept offer)?

If unclear, stop and clarify with the module owner or architect—do not guess across boundaries.

### 3.3 Environments

| Environment | Use |
|-------------|-----|
| Local + emulators | Primary development |
| `dev` | Shared integration |
| `staging` | QA / UAT |
| `production` | Live marketplace |

Never develop against production data or credentials.

### 3.4 Ticket Hygiene

- One PR ≈ one logical change
- Link ticket ID in branch, commits, and PR
- Split oversized work into sequenced PRs

---

## 4. Architecture Rules

Engineers must follow:

| Rule | Requirement |
|------|-------------|
| Clean Architecture | Domain independent of Firebase/Flutter/HTTP |
| Feature-first modules | Vertical slices by capability |
| Repository Pattern | Domain depends on ports; adapters implement |
| Dependency Injection | Explicit composition roots |
| REST only | Public platform APIs are REST |
| Server invariants | Money, acceptance, roles, warranty via backend |
| Arabic-first product | Locale-safe enums; AR/EN user messaging |

**Forbidden**

- Business rules only in clients
- Cross-module deep imports of internals
- Customer UI in this repository
- Secrets in source control
- Shortcuts that skip transactions on exclusive flows (e.g., accept offer)

Authoritative references:

- `docs/ARCHITECTURE.md`
- `docs/engines/*`
- `docs/engineering/ENGINEERING_PRINCIPLES.md`
- `docs/engineering/ARCHITECTURE_DECISIONS.md`

---

## 5. Module Ownership

### 5.1 Ownership Model

Every module has:

| Role | Duty |
|------|------|
| Owner | Approves design changes and module PRs |
| Backup owner | Covers absence |
| Contributors | Implement with owner review |

### 5.2 Example Module Map (evolves with team)

| Module | Typical ownership |
|--------|-------------------|
| `identity` | Platform / security |
| `catalog` | Backend |
| `requests` / `offers` / `bookings` | Marketplace backend |
| `payments` | Payments + security co-review |
| `subscriptions` | Growth / backend |
| `matching` / `ranking` | Marketplace algorithms |
| `notifications` | Platform |
| `companies` | Org / backend |
| `home_passport` | Consumer domain backend |
| `disputes` / `guarantees` | Trust & safety backend |
| `shared/contracts` | Platform architects + all client liaisons |

### 5.3 Cross-Module Changes

If a PR touches two or more modules:

1. Require review from each module owner
2. Prefer an ADR for lasting boundary changes
3. Update engine docs when behavior contracts change

---

## 6. Documentation Rules

### 6.1 Documentation First for Contracts

API, schema, and engine behavior changes require documentation updates **in the same PR** as code (once implementation phases begin).

### 6.2 Where Docs Live

| Content | Location |
|---------|----------|
| System architecture | `docs/` |
| Business engines | `docs/engines/` |
| Engineering handbook | `docs/engineering/` (this set) |
| ADRs | `docs/engineering/ARCHITECTURE_DECISIONS.md` or `docs/adr/` later |
| OpenAPI | `shared/contracts/` (Phase 2+) |

### 6.3 Writing Standards

- English for engineering docs
- Precise, unambiguous language
- Stable error codes and enum names
- No undocumented “temporary” public behavior

### 6.4 Customer App Coordination

Share contract diffs with the external Customer team before merging breaking API changes.

---

## 7. Review Process

1. Author completes PR checklist (`PULL_REQUEST_GUIDE.md`)
2. CI must be green
3. At least one peer review; module owner for owned paths
4. Security-sensitive paths require security-aware reviewer
5. Architect review for boundary/ADR-impacting changes
6. Author remains responsible for production readiness of the change

Details: `CODE_REVIEW_GUIDE.md`, `PULL_REQUEST_GUIDE.md`.

---

## 8. Definition of Done

A change is **Done** only when all applicable items are true:

### 8.1 Functional

- [ ] Meets ticket acceptance criteria
- [ ] Enforces relevant business rules server-side
- [ ] Handles failure paths and empty states

### 8.2 Quality

- [ ] Meets coding standards
- [ ] Lint/format/typecheck pass
- [ ] Required tests added/updated and passing
- [ ] No new critical linter or security findings

### 8.3 Architecture & Security

- [ ] Respects module boundaries and Clean Architecture
- [ ] AuthN/AuthZ verified for every privileged operation
- [ ] No secrets committed; no PII in logs

### 8.4 Documentation & Contracts

- [ ] Docs/OpenAPI/engine notes updated if behavior changed
- [ ] Error codes documented if new
- [ ] Migration/backfill notes included if data shape changed

### 8.5 Operability

- [ ] Structured logging with correlation IDs where applicable
- [ ] Metrics/events considered for funnel-critical paths
- [ ] Feature flags used when risky rollout needs them

### 8.6 Process

- [ ] PR approved per policy
- [ ] CI green
- [ ] Linked ticket updated

If any required box is unchecked, it is **not Done**.

---

## 9. Onboarding Checklist (New Engineer)

1. Read root `README.md`
2. Read `docs/ARCHITECTURE.md`, `docs/BUSINESS_RULES.md`
3. Read `docs/engines/README.md` (skim engines for your domain)
4. Read this handbook index and all `docs/engineering/*` standards
5. Complete environment setup (`docs/DEVELOPMENT_GUIDE.md`)
6. Pair on first PR with module owner
7. Land a small docs or test PR before large feature work

---

## 10. Escalation

| Issue | Escalate to |
|-------|-------------|
| Ambiguous product rule | Product + domain owner |
| Architecture conflict | Principal/Lead architect |
| Security concern | Security reviewer / lead |
| Production incident | On-call + incident process (Phase 6+) |

---

## 11. Related Handbook Documents

- `CODING_STANDARDS.md`
- `MODULE_TEMPLATE.md`
- `API_STANDARDS.md`
- `DATABASE_STANDARDS.md`
- `SECURITY_STANDARDS.md`
- `GIT_WORKFLOW.md`
- `PULL_REQUEST_GUIDE.md`
- `CODE_REVIEW_GUIDE.md`
- `TESTING_GUIDE.md`
- `ERROR_HANDLING_GUIDE.md`
- `LOGGING_GUIDE.md`
- `ARCHITECTURE_DECISIONS.md`
- `ENGINEERING_PRINCIPLES.md`
