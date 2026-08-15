# Otlob Platform — Engineering Handbook Index

**Project:** Otlob Platform  
**Commercial Name:** اطلب ولا تتعنى  
**Phase:** 1.8 — Engineering Handbook  
**Status:** Completed  
**Audience:** All engineers (20+ person team)  

---

## Purpose

This handbook is the **mandatory operating standard** for engineering on Otlob Platform. It defines how we design, code, review, test, secure, and evolve the marketplace toward GCC-scale operations.

**Phase 1.8 is documentation only** — no Flutter, Firebase, backend, or UI implementation.

---

## Reading Order (Onboarding)

1. [ENGINEERING_PRINCIPLES.md](ENGINEERING_PRINCIPLES.md)  
2. [ENGINEERING_GUIDE.md](ENGINEERING_GUIDE.md)  
3. [ARCHITECTURE_DECISIONS.md](ARCHITECTURE_DECISIONS.md)  
4. [CODING_STANDARDS.md](CODING_STANDARDS.md)  
5. [MODULE_TEMPLATE.md](MODULE_TEMPLATE.md)  
6. [API_STANDARDS.md](API_STANDARDS.md) / [DATABASE_STANDARDS.md](DATABASE_STANDARDS.md) / [SECURITY_STANDARDS.md](SECURITY_STANDARDS.md)  
7. [GIT_WORKFLOW.md](GIT_WORKFLOW.md) → [PULL_REQUEST_GUIDE.md](PULL_REQUEST_GUIDE.md) → [CODE_REVIEW_GUIDE.md](CODE_REVIEW_GUIDE.md)  
8. [TESTING_GUIDE.md](TESTING_GUIDE.md) / [ERROR_HANDLING_GUIDE.md](ERROR_HANDLING_GUIDE.md) / [LOGGING_GUIDE.md](LOGGING_GUIDE.md)  

Also required (outside this folder): `docs/ARCHITECTURE.md`, `docs/BUSINESS_RULES.md`, `docs/engines/README.md`.

## Standards precedence and ownership

The Engineering Handbook is the implementation-practice SSOT. Root Phase 1 documents provide architecture and business constraints; they do not duplicate or override handbook mechanics. Apply this order when documents overlap:

1. Approved ADR for the specific decision
2. Security and legal constraint
3. Owning Business Engine for domain lifecycle/enums and invariants
4. Engineering Handbook for API, database, security, testing, coding, and delivery standards
5. Product Bible for UX projection, release tags, journeys, and acceptance behavior
6. Root examples or historical guidance

`docs/ROADMAP.md` exclusively owns engineering phase numbers and release-to-phase mapping. `docs/product/RELEASE_PLAN.md` owns release content and gates. A conflict is resolved in the owning document and cross-references are updated; teams must not choose whichever duplicate is convenient.

---

## Handbook Contents

| Document | Description |
|----------|-------------|
| [ENGINEERING_GUIDE.md](ENGINEERING_GUIDE.md) | How engineers work: workflow, ownership, DoD |
| [CODING_STANDARDS.md](CODING_STANDARDS.md) | Naming, formatting, DI, Clean Architecture, SOLID/DRY/KISS |
| [MODULE_TEMPLATE.md](MODULE_TEMPLATE.md) | Official module structure template |
| [API_STANDARDS.md](API_STANDARDS.md) | REST naming, versioning, errors, pagination, idempotency |
| [DATABASE_STANDARDS.md](DATABASE_STANDARDS.md) | Firestore naming, timestamps, indexes, transactions, scale |
| [SECURITY_STANDARDS.md](SECURITY_STANDARDS.md) | AuthN/AuthZ, secrets, storage, audit |
| [GIT_WORKFLOW.md](GIT_WORKFLOW.md) | Branches, commits, merges, releases, tags |
| [PULL_REQUEST_GUIDE.md](PULL_REQUEST_GUIDE.md) | PR checklist, reviewers, merge gates |
| [CODE_REVIEW_GUIDE.md](CODE_REVIEW_GUIDE.md) | Architecture/security/performance review standards |
| [TESTING_GUIDE.md](TESTING_GUIDE.md) | Unit/integration/API/acceptance/regression + coverage |
| [ERROR_HANDLING_GUIDE.md](ERROR_HANDLING_GUIDE.md) | Business/validation/unexpected errors, retries |
| [LOGGING_GUIDE.md](LOGGING_GUIDE.md) | Levels, PII rules, sensitive data |
| [ARCHITECTURE_DECISIONS.md](ARCHITECTURE_DECISIONS.md) | ADR-001 … ADR-010 |
| [ENGINEERING_PRINCIPLES.md](ENGINEERING_PRINCIPLES.md) | Scalability, security, performance, DX, docs, automation |

---

## Architecture Decision Records (Quick Index)

| ID | Decision |
|----|----------|
| ADR-001 | Why Flutter |
| ADR-002 | Why Firebase |
| ADR-003 | Why Firestore |
| ADR-004 | Why Repository Pattern |
| ADR-005 | Why Clean Architecture |
| ADR-006 | Why Feature-first |
| ADR-007 | Why Marketplace |
| ADR-008 | Why REST API |
| ADR-009 | Why Modular Backend |
| ADR-010 | Why Home Passport |

Full text: [ARCHITECTURE_DECISIONS.md](ARCHITECTURE_DECISIONS.md).

---

## Related Platform Docs

| Area | Location |
|------|----------|
| System architecture | `docs/ARCHITECTURE.md` |
| Business engines | `docs/engines/` |
| API design | `docs/API.md` |
| Security architecture | `docs/SECURITY.md` |
| Roadmap | `docs/ROADMAP.md` |

---

## Hard Boundaries (Reminder)

- No Customer Flutter UI in this repository  
- No substituting docs with fake demo screens  
- Server enforces marketplace invariants  
- Handbook updates go through PR review  

---

## Phase 1.8 Confirmation

All Engineering Handbook documents listed above are complete.

**Phase 1.8 — Engineering Handbook is finished.**

Implementation begins only after explicit **Phase 2** authorization.
