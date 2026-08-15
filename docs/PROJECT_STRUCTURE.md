# Project Structure

**Project:** Otlob Platform  
**Document Type:** Repository Structure Specification  
**Phase:** 1 — Foundation  
**Status:** Baseline  

---

## 1. Purpose

This document defines the monorepo layout, ownership boundaries, and rules for where code and documentation belong.

**Critical boundary:** Customer Flutter UI is **not** developed in this repository.

**Remediation decision:** The root documentation index and target module map now name the missing finance, authorization/access, asynchronous-work, and compliance ownership documents so Phase 2 teams have one discoverable source for each control plane (`C-01`, `C-02`, `C-05`, `H-06`, `H-07`).

---

## 2. Top-Level Layout

```text
otlob-platform/
├── README.md
├── docs/                          # Enterprise documentation (Phase 1 complete set)
├── backend/                       # Cloud Functions, rules, backend config
│   ├── functions/                 # Future TypeScript Functions app
│   ├── rules/                     # Firestore & Storage rules (future)
│   └── config/                    # Env templates, project mapping
├── shared/                        # Cross-app contracts and constants
│   ├── contracts/                 # OpenAPI / API schemas (future)
│   ├── types/                     # Shared type definitions (future)
│   └── constants/                 # Enums, limits, error codes (future)
├── future_flutter_apps/           # Reserved client workspaces
│   ├── future_customer/           # EXTERNAL OWNERSHIP — do not implement UI here
│   ├── future_technician/         # Planned Technician app (later phases)
│   └── future_admin/              # Planned Admin panel (later phases)
├── scripts/                       # Developer/ops scripts (future)
└── .git/
```

---

## 3. Directory Responsibilities

### 3.1 `docs/`

Authoritative architecture and process documentation.

| File | Responsibility |
|------|----------------|
| `ARCHITECTURE.md` | System design |
| `TECH_STACK.md` | Technology choices |
| `ROADMAP.md` | Phased plan |
| `DATABASE.md` | Logical data model |
| `FIRESTORE_STRUCTURE.md` | Physical collections |
| `API.md` | REST contracts |
| `BUSINESS_RULES.md` | Domain rules |
| `SECURITY.md` | AuthN/AuthZ and rules intent |
| `FINANCE_AND_SETTLEMENT.md` | Ledger, money, payouts, settlement, reconciliation |
| `AUTHORIZATION_AND_DATA_ACCESS.md` | Role taxonomy, match visibility, direct/realtime access |
| `ASYNC_WORKFLOWS.md` | Outbox, retries, dead letters, replay, reconciliation |
| `COMPLIANCE_AND_RETENTION.md` | PDPL/privacy, retention, media, KSA/GCC launch gates |
| `LIFECYCLE_RECONCILIATION.md` | Canonical enum × engine × persistence × product matrix |
| `SCHEDULING.md` | Appointment windows, travel buffers, no-shows, reschedule |
| `PROJECT_STRUCTURE.md` | This file |
| `CODING_STANDARDS.md` | Phase 1 summary; practice SSOT is `docs/engineering/` |
| `GIT_WORKFLOW.md` | Branching and releases |
| `DEVELOPMENT_GUIDE.md` | Contributor setup |

Future additions: implementation ADR records under `docs/adr/`, runbooks, and feature threat models. The four Phase 1 control-plane documents above are current architecture, not deferred implementation notes.

### 3.2 `backend/`

Server-side platform.

| Path | Purpose |
|------|---------|
| `backend/functions/` | HTTPS REST API, triggers, scheduled jobs |
| `backend/rules/` | `firestore.rules`, `storage.rules`, indexes |
| `backend/config/` | Environment configuration templates |

**Phase 1:** folders reserved; no implementation code required.

### 3.3 `shared/`

Stable cross-surface definitions so Customer (external), Technician, and Admin clients do not drift.

| Path | Purpose |
|------|---------|
| `shared/contracts/` | OpenAPI YAML, JSON schemas |
| `shared/types/` | Shared TS/Dart type packs (later) |
| `shared/constants/` | Status enums, limits, error codes |

Rules:

- No Flutter widgets in `shared/`
- No Firebase secret values
- Version breaking contract changes deliberately

### 3.4 `future_flutter_apps/`

Reserved namespaces for mobile/web clients.

#### `future_customer/`

- Owned by a **separate developer/team**
- May contain only a pointer README explaining external ownership
- **Forbidden:** screens, widgets, customer UX implementation in this monorepo

#### `future_technician/`

- Future Technician Flutter application root
- Implementation starts only when roadmap Phase 5 is authorized
- Must follow Clean Architecture + feature-first structure when created

#### `future_admin/`

- Future Admin panel root (Flutter Web or approved web stack)
- Implementation later; admin capabilities first exist as APIs

### 3.5 `scripts/`

Automation helpers (codegen, emulators wrappers, deploy helpers). Empty in Phase 1 except structural presence.

---

## 4. Target Backend Structure (Phase 2+)

When implementation begins, Functions should follow Clean Architecture + feature modules:

```text
backend/functions/src/
├── main.ts
├── config/
├── shared/                 # logging, errors, auth middleware
├── modules/
│   ├── identity/
│   ├── catalog/
│   ├── requests/
│   ├── offers/
│   ├── bookings/
│   ├── payments/
│   ├── finance/
│   ├── subscriptions/
│   ├── companies/
│   ├── authorization/
│   ├── technicians/
│   ├── notifications/
│   ├── reviews/
│   ├── disputes/
│   ├── guarantees/
│   ├── messaging/
│   ├── home/
│   └── async_work/
└── infrastructure/         # firestore, storage, fcm, psp adapters
```

Each module (recommended):

```text
feature/
├── domain/           # entities, rules, ports
├── application/      # use cases / DTO
├── infrastructure/   # repository implementations
└── api/              # HTTP handlers / routes
```

---

## 5. Target Flutter App Structure (Future — Technician/Admin only)

When Flutter apps are created under `future_technician` / `future_admin`:

```text
lib/
├── main.dart
├── app/                    # bootstrap, DI, router
├── core/                   # network, errors, theme tokens, l10n
└── features/
    └── <feature>/
        ├── domain/
        ├── data/
        └── presentation/   # NOT for customer app in this repo
```

**Do not** create this tree for Customer in Phase 1–N inside this repository.

---

## 6. Ownership Matrix

| Path | Owner | Notes |
|------|-------|-------|
| `docs/` | Platform architecture | PR review required |
| `backend/` | Backend team | Security-sensitive |
| `shared/` | Platform team | Contract reviews with all app teams |
| `future_flutter_apps/future_customer/` | External team | No UI commits here |
| `future_flutter_apps/future_technician/` | Mobile team (future) | |
| `future_flutter_apps/future_admin/` | Ops/frontend (future) | |
| `scripts/` | Platform/DevOps | |

---

## 7. What Must Not Appear in This Repo (Phase 1)

- Flutter screens/widgets for Customer
- Fake demo UI
- Hard-coded secrets
- Production data dumps
- Unrelated experimental apps

---

## 8. Documentation vs Code Rule

| Phase | Allowed in repo |
|-------|-----------------|
| Phase 1 | Docs + empty/reserved folders + README pointers |
| Phase 2+ | Backend/shared implementation per roadmap |
| Phase 5+ | Technician/Admin apps |
| Never (default) | Customer UI (unless ownership decision formally changes) |

---

## 9. Related Documents

- `README.md` (root)
- `ARCHITECTURE.md`
- `CODING_STANDARDS.md`
- `DEVELOPMENT_GUIDE.md`
- `ROADMAP.md`
