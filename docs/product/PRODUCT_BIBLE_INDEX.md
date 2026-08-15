# Product Bible Index

**Project:** Otlob Platform  
**Commercial Name:** اطلب ولا تتعنى  
**Phase:** 1.9 — Product Bible  
**Status:** Completed  
**Audience:** Product, Design, Engineering, Ops, External Customer team  

---

## Purpose

The Product Bible is the authoritative product definition for Otlob Platform journeys, stories, acceptance rules, UX principles, permissions, and MVP scope. Lifecycle sections are the product/UX projection of the domain lifecycles; Business Engine specifications own canonical persisted enum values and transitions. `docs/ROADMAP.md` owns engineering phase sequencing and the release-to-roadmap mapping; `RELEASE_PLAN.md` owns product release content and gates.

**Phase 1.9 is documentation only** — no Flutter, Firebase, backend, or UI implementation.

---

## Reading Order

1. [PRODUCT_PRINCIPLES.md](PRODUCT_PRINCIPLES.md)  
2. [MVP_SCOPE.md](MVP_SCOPE.md)  
3. [USER_JOURNEYS.md](USER_JOURNEYS.md) / [TECHNICIAN_JOURNEY.md](TECHNICIAN_JOURNEY.md) / [COMPANY_JOURNEY.md](COMPANY_JOURNEY.md) / [ADMIN_JOURNEY.md](ADMIN_JOURNEY.md)  
4. [STATE_MACHINE.md](STATE_MACHINE.md)  
5. [USER_STORIES.md](USER_STORIES.md) → [ACCEPTANCE_CRITERIA.md](ACCEPTANCE_CRITERIA.md)  
6. [BUSINESS_SCENARIOS.md](BUSINESS_SCENARIOS.md) / [EDGE_CASES.md](EDGE_CASES.md) / [ERROR_SCENARIOS.md](ERROR_SCENARIOS.md)  
7. [UX_RULES.md](UX_RULES.md) / [PERMISSIONS_MATRIX.md](PERMISSIONS_MATRIX.md)  
8. [FEATURE_DEPENDENCIES.md](FEATURE_DEPENDENCIES.md) → [RELEASE_PLAN.md](RELEASE_PLAN.md)  

Also read: `docs/engines/README.md`, `docs/BUSINESS_RULES.md`, `docs/engineering/README.md`.

---

## All Product Documents

| Document | Description |
|----------|-------------|
| [USER_JOURNEYS.md](USER_JOURNEYS.md) | Complete customer journeys (guest → refund) |
| [TECHNICIAN_JOURNEY.md](TECHNICIAN_JOURNEY.md) | Technician end-to-end journey |
| [COMPANY_JOURNEY.md](COMPANY_JOURNEY.md) | Company registration to subscriptions |
| [ADMIN_JOURNEY.md](ADMIN_JOURNEY.md) | Admin/ops console journeys |
| [STATE_MACHINE.md](STATE_MACHINE.md) | Lifecycles with entry/exit/allowed/forbidden |
| [EDGE_CASES.md](EDGE_CASES.md) | Exhaustive edge-case catalog |
| [USER_STORIES.md](USER_STORIES.md) | User stories for all roles |
| [ACCEPTANCE_CRITERIA.md](ACCEPTANCE_CRITERIA.md) | Measurable feature completion rules |
| [BUSINESS_SCENARIOS.md](BUSINESS_SCENARIOS.md) | Happy/alternative/failure/recovery paths |
| [ERROR_SCENARIOS.md](ERROR_SCENARIOS.md) | Business and system error catalog |
| [UX_RULES.md](UX_RULES.md) | Loading, RTL, offline, accessibility, trust UX |
| [PRODUCT_PRINCIPLES.md](PRODUCT_PRINCIPLES.md) | Trust, speed, fairness, protection, quality |
| [PERMISSIONS_MATRIX.md](PERMISSIONS_MATRIX.md) | Role permissions explained |
| [FEATURE_DEPENDENCIES.md](FEATURE_DEPENDENCIES.md) | Dependency graph and build order |
| [MVP_SCOPE.md](MVP_SCOPE.md) | In-scope / out-of-scope MVP |
| [RELEASE_PLAN.md](RELEASE_PLAN.md) | Alpha → Beta → Production → v1.5 → v2.0 |
| [PRODUCT_BIBLE_INDEX.md](PRODUCT_BIBLE_INDEX.md) | This index |

---

## Hard Boundaries

- Customer Flutter UI is built by a separate team; this bible defines product contracts they implement against  
- No code in Phase 1.9  
- Server enforces state machines and money safety  
- If Product Bible wording conflicts with an engine lifecycle, the engine enum/transition wins and `STATE_MACHINE.md` must record the product alias or projection  
- If a product release label conflicts with an engineering phase number, `docs/ROADMAP.md` wins for phase mapping; the release scope remains owned by `RELEASE_PLAN.md`  

---

## Phase 1.9 Confirmation

All Product Bible documents listed above are complete.

**Phase 1.9 — Product Bible is finished.**

Implementation begins only after explicit **Phase 2** authorization.
