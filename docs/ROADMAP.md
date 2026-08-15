# Roadmap

**Project:** Otlob Platform  
**Document Type:** Delivery Roadmap  
**Phase:** 1.9 — Product Bible (completed)  
**Status:** Baseline + Engines + Engineering Handbook + Product Bible  

---

## 1. Purpose

This roadmap defines phased delivery for Otlob Platform from foundation through production hardening. It prioritizes architecture correctness, security, and marketplace invariants over speed shortcuts.

**Remediation decision:** A documented Foundation Design Gate now precedes implementation, Free entitlements move into the Matching/Offers foundation, and finance/privacy/compliance are production prerequisites rather than late hardening. This resolves sequencing that could otherwise ship core or real-money flows without their controls (`C-06`, `M-10`, `M-11`).

---

## 2. Guiding Delivery Rules

1. No Customer Flutter UI in this repository
2. No fake demo screens as substitutes for domain design
3. No production payment flows without security review
4. Each phase has explicit exit criteria
5. Documentation updates accompany any architectural change

---

## 3. Phase Overview

| Phase | Name | Outcome |
|-------|------|---------|
| **1** | Project Foundation | Enterprise docs + repo structure |
| **1.5** | Business Engines | Marketplace engine specifications |
| **1.8** | Engineering Handbook | Mandatory engineering standards for the team |
| **1.9** | Product Bible | Journeys, states, stories, MVP, release plan |
| **1.95** | Foundation Design Gate | Canonical finance, access, lifecycle, data, async, and compliance decisions |
| **2** | Platform Skeleton | Auth, rules stubs, schemas, CI baseline |
| **3** | Core Marketplace | Requests, offers, bookings |
| **4** | Fulfillment & Trust | Jobs, media, payments, warranties, reviews |
| **5** | Provider & Ops Clients | Technician app + Admin panel |
| **6** | Scale & Hardening | Performance, compliance, reliability |
| **7** | Growth Capabilities | Subscriptions maturity, companies, advanced geo |

---

## 4. Phase 1 — Project Foundation (COMPLETED)

### Objectives

- Establish commercial and technical context
- Define architecture, data model, APIs, security, and standards
- Reserve folders for future apps without implementing UI
- Align teams on boundaries (especially Customer app ownership)

### Deliverables

- [x] `README.md`
- [x] `docs/ARCHITECTURE.md`
- [x] `docs/ROADMAP.md`
- [x] `docs/DATABASE.md`
- [x] `docs/API.md`
- [x] `docs/BUSINESS_RULES.md`
- [x] `docs/TECH_STACK.md`
- [x] `docs/SECURITY.md`
- [x] `docs/PROJECT_STRUCTURE.md`
- [x] `docs/FIRESTORE_STRUCTURE.md`
- [x] `docs/CODING_STANDARDS.md`
- [x] `docs/GIT_WORKFLOW.md`
- [x] `docs/DEVELOPMENT_GUIDE.md`
- [x] Repository folder scaffolding (`backend`, `docs`, `shared`, `future_flutter_apps`, …)

### Exit Criteria

- All Phase 1 documents reviewed and accepted
- No implementation code required
- Explicit sign-off to start Phase 1.5 (Business Engines) or Phase 2

---

## 5. Phase 1.5 — Business Engines (COMPLETED)

### Objectives

- Specify marketplace business engines in enough detail for senior backend implementation later
- Define cross-engine interactions (Matching → Offers → Pricing → Subscription → Ranking → Warranty → Dispute → Notification → Company → Home Passport → Loyalty)
- Keep documentation-only scope (no Flutter, no Firebase implementation, no UI)

### Deliverables

- [x] `docs/engines/README.md` — engines index
- [x] `docs/engines/MATCHING_ENGINE.md`
- [x] `docs/engines/OFFERS_ENGINE.md`
- [x] `docs/engines/PRICING_ENGINE.md`
- [x] `docs/engines/SUBSCRIPTION_ENGINE.md`
- [x] `docs/engines/WARRANTY_ENGINE.md`
- [x] `docs/engines/DISPUTE_ENGINE.md`
- [x] `docs/engines/NOTIFICATION_ENGINE.md`
- [x] `docs/engines/TECHNICIAN_RANKING_ENGINE.md`
- [x] `docs/engines/HOME_PASSPORT_ENGINE.md`
- [x] `docs/engines/COMPANY_ENGINE.md`
- [x] `docs/engines/LOYALTY_ENGINE.md`

### Engine Coverage Summary

| Engine | Core responsibility |
|--------|---------------------|
| Matching | Eligible nearby providers, scoring, priority waves, tie-breaks |
| Offers | Lifecycle, caps, accept/reject/expire, comparison ranking |
| Pricing | Suggested/min/max, fees, commission, tax, surcharges, coupons |
| Subscription | Free / Pro / Premium / Company entitlements & billing lifecycle |
| Warranty | Issuance, validation, claims, expiry |
| Dispute | Evidence, admin decision, refund/compensation, appeal |
| Notification | Push/SMS/email/in-app, reminders, escalation |
| Technician Ranking | Score 0–100 factor model |
| Home Passport | Digital home, assets, history, upcoming maintenance |
| Company | Multi-tech orgs, roles, branches, reports, payouts |
| Loyalty | Points, referrals, levels, redemption |

### Exit Criteria

- All Phase 1.5 engine documents present and internally consistent with Phase 1 architecture
- No implementation code required
- **Phase 1.5 is completed**
- Explicit sign-off required to start Phase 1.8 (Engineering Handbook) or Phase 2 (implementation skeleton)

---

## 6. Phase 1.8 — Engineering Handbook (COMPLETED)

### Objectives

- Publish mandatory engineering standards for a 20+ engineer organization
- Standardize modules, APIs, Firestore usage, security, Git/PR/review, testing, errors, and logging
- Capture foundational Architecture Decision Records (ADR-001–ADR-010)
- Remain documentation-only (no Flutter, Firebase, backend, or UI implementation)

### Deliverables

- [x] `docs/engineering/README.md` — Engineering Handbook index
- [x] `docs/engineering/ENGINEERING_GUIDE.md`
- [x] `docs/engineering/CODING_STANDARDS.md`
- [x] `docs/engineering/MODULE_TEMPLATE.md`
- [x] `docs/engineering/API_STANDARDS.md`
- [x] `docs/engineering/DATABASE_STANDARDS.md`
- [x] `docs/engineering/SECURITY_STANDARDS.md`
- [x] `docs/engineering/GIT_WORKFLOW.md`
- [x] `docs/engineering/PULL_REQUEST_GUIDE.md`
- [x] `docs/engineering/CODE_REVIEW_GUIDE.md`
- [x] `docs/engineering/TESTING_GUIDE.md`
- [x] `docs/engineering/ERROR_HANDLING_GUIDE.md`
- [x] `docs/engineering/LOGGING_GUIDE.md`
- [x] `docs/engineering/ARCHITECTURE_DECISIONS.md` (ADR-001 … ADR-010)
- [x] `docs/engineering/ENGINEERING_PRINCIPLES.md`

### Exit Criteria

- All Phase 1.8 handbook documents present and consistent with Phase 1 / 1.5 baselines
- No implementation code required
- **Phase 1.8 is completed**
- Explicit sign-off required to start Phase 1.9 (Product Bible) or Phase 2 (implementation skeleton)

---

## 7. Phase 1.9 — Product Bible (COMPLETED)

### Objectives

- Define complete product journeys for Customer, Technician, Company, and Admin
- Specify state machines, edge cases, user stories, and acceptance criteria
- Establish UX rules, product principles, and permissions matrix
- Lock MVP scope and staged release plan (Alpha → v2.0)
- Remain documentation-only (no Flutter, Firebase, backend, or UI implementation)

### Deliverables

- [x] `docs/product/PRODUCT_BIBLE_INDEX.md`
- [x] `docs/product/USER_JOURNEYS.md`
- [x] `docs/product/TECHNICIAN_JOURNEY.md`
- [x] `docs/product/COMPANY_JOURNEY.md`
- [x] `docs/product/ADMIN_JOURNEY.md`
- [x] `docs/product/STATE_MACHINE.md`
- [x] `docs/product/EDGE_CASES.md`
- [x] `docs/product/USER_STORIES.md`
- [x] `docs/product/ACCEPTANCE_CRITERIA.md`
- [x] `docs/product/BUSINESS_SCENARIOS.md`
- [x] `docs/product/ERROR_SCENARIOS.md`
- [x] `docs/product/UX_RULES.md`
- [x] `docs/product/PRODUCT_PRINCIPLES.md`
- [x] `docs/product/PERMISSIONS_MATRIX.md`
- [x] `docs/product/FEATURE_DEPENDENCIES.md`
- [x] `docs/product/MVP_SCOPE.md`
- [x] `docs/product/RELEASE_PLAN.md`

### Exit Criteria

- All Phase 1.9 Product Bible documents present and consistent with Phases 1 / 1.5 / 1.8
- No implementation code required
- **Phase 1.9 is completed**
- Explicit sign-off required to start Phase 2 (implementation skeleton)

---

## 8. Foundation Design Gate (COMPLETED DOCUMENTATION BASELINE)

### Deliverables

- [x] `docs/FINANCE_AND_SETTLEMENT.md`
- [x] `docs/AUTHORIZATION_AND_DATA_ACCESS.md`
- [x] `docs/ASYNC_WORKFLOWS.md`
- [x] `docs/COMPLIANCE_AND_RETENTION.md`
- [x] Canonical aggregate, market partition, ID, reviews/ratings, warranty-claim, and lifecycle corrections in root Phase 1 documents

### Exit Criteria

- Critical architecture decisions are internally reconciled and approved before implementation
- Production and real-money gates remain subject to legal, vendor, operational, and reconciliation sign-off

---

## 9. Phase 2 — Platform Skeleton

### Objectives

- Bootstrap backend project structure (no full domain yet)
- Define Auth roles/claims strategy in code scaffolding
- Add Firestore/Storage security rule skeletons
- Establish CI lint/test/deploy pipelines to `dev`
- Publish shared API contract stubs
- Establish Free entitlement policy v1 needed by Matching/Offers; paid subscriptions remain staged
- Establish outbox/idempotency/audit foundations and market-scoped schemas

### Key Workstreams

| Stream | Work |
|--------|------|
| Backend | Functions project, health endpoint, config per env |
| Security | Rules scaffolding, admin claim bootstrap process |
| Shared | OpenAPI/REST contract files, enum constants |
| DevEx | Emulator guidance, CONTRIBUTING alignment |
| Quality | Linting, formatting, PR checks |

### Exit Criteria

- Deployable empty/safe Functions to `dev`
- Rules deployable (deny-by-default where unfinished)
- CI green on `main`
- Customer team can review API drafts without UI coupling

**Non-goals:** Offer engine, payments, Flutter screens.

---

## 10. Phase 3 — Core Marketplace Domain

### Objectives

- Implement request creation and lifecycle
- Nearby technician targeting (initial geo strategy)
- Offer submission, comparison data, acceptance
- Booking creation on accepted offer

### Key Capabilities

- Categories & services catalog (read APIs)
- Addresses / service location binding
- Request open → expire/cancel
- Offer create/withdraw (policy-bound)
- Accept offer → booking (transactional)
- Privacy-safe provider visibility grants and authorize-before-accept orchestration

### Exit Criteria

- End-to-end request→offer→booking works via API
- Invariants enforced server-side
- Audit fields and idempotency on accept
- Integration tests for conflict cases (double accept)

**Non-goals:** Automated withdrawals, advanced dispute court, Technician UI polish. Ledger-ready financial attribution and reconciliation contracts are not optional.

---

## 11. Phase 4 — Fulfillment, Payments & Trust

### Objectives

- Payment authorization/capture/refund flows (PSP adapter)
- Job start/complete with before/after media
- Warranty generation
- Reviews & ratings
- Notifications for major state transitions
- Immutable journals, provider payable/holds, settlement and reconciliation

### Key Capabilities

- Payment authorization bound to accept under one idempotency key; capture on eligible completion
- Compatibility-only payment intents for already confirmed bookings (retry/recovery)
- Storage uploads with server validation metadata
- Guarantee documents with validity windows
- Review uniqueness per booking
- Dispute intake (basic)

### Exit Criteria

- Money movement only through payment module
- Warranty issued only after eligible completion
- Review spam controls in place
- Crash/analytics events for core funnel

---

## 12. Phase 5 — Technician App & Admin Panel

### Objectives

- Build Technician Flutter application against stable APIs
- Build Admin panel for ops/moderation
- Keep Customer app external (consume same APIs)

### Technician App (planned features)

- Auth & profile / documents
- Incoming requests & offer tools
- Booking execution & media upload
- Earnings/subscription views (as available)

### Admin Panel (planned features)

- User/technician/company moderation
- Catalog management
- Dispute resolution workspace
- Manual adjustments with audit trail

### Exit Criteria

- Technician critical journeys production-ready
- Admin can resolve disputes and verify documents
- No Customer UI introduced into this monorepo without explicit ownership change

---

## 13. Phase 6 — Scale & Hardening

### Objectives

- Performance, cost, and reliability hardening
- Security penetration review
- Harden and audit the KSA compliance controls required before production; do not introduce them for the first time here
- Ops runbooks and SLOs

### Workstreams

- Index and query optimization
- Rate limits and anti-abuse
- Backup/export strategy
- Paging and fan-out improvements
- Secrets rotation drills
- Staging load tests

### Exit Criteria

- Documented SLOs and on-call basics
- Security findings triaged
- Cost dashboards reviewed
- Production incident playbooks exist

---

## 14. Phase 7 — Growth Capabilities

### Objectives

- Company multi-technician maturity
- Subscription plans and entitlements
- Home profiles, assets, maintenance history intelligence
- Advanced matching / ranking (quality, proximity, price fairness)
- Chat depth and support tooling

### Exit Criteria

- Company role workflows complete
- Subscription gating enforced server-side
- Home maintenance history usable across bookings
- Experimentation framework available

---

## 15. Cross-Phase Work (Continuous)

| Track | Continuous activities |
|-------|------------------------|
| Security | Threat modeling updates, rules reviews |
| Documentation | Keep docs synchronized with reality |
| Quality | Tests, code review, static analysis |
| Localization | AR-first copy review with EN parity |
| Product | Funnel metrics and marketplace health |

---

## 16. Dependency Map

```text
Phase 1 Docs
    → Phase 1.5 Business Engines
        → Phase 1.8 Engineering Handbook
            → Phase 1.9 Product Bible
                → Foundation Design Gate
                    → Phase 2 Skeleton
                    → Phase 3 Core Marketplace
                        → Phase 4 Fulfillment & Trust
                            → Phase 5 Clients (Technician/Admin)
                                → Phase 6 Hardening
                                    → Phase 7 Growth
```

Customer app development may proceed **in parallel** after Phase 2/3 contracts stabilize, in a separate repository owned by the Customer team.

---

## 17. Risk Register (Initial)

| Risk | Impact | Mitigation |
|------|--------|------------|
| Client-side rule bypass attempts | High | Server-side invariants |
| Geo accuracy / matching quality | Medium | Iterate geohash + service radius policies |
| Payment chargebacks | High | Clear evidence (before/after), dispute flow |
| Provider/location privacy | Critical | Time-bound minimized visibility projections; no raw request reads |
| Ledger/payout mismatch | Critical | Immutable balanced journals and daily reconciliation |
| Document KYC delays | Medium | Admin queues + status machine |
| Scope creep into Customer UI | High | Hard repo boundary + PR checks |
| Premature optimization | Medium | Phase gates |

---

## 18. Success Metrics (Later Phases)

- Time-to-first-offer
- Offer acceptance rate
- Booking completion rate
- Dispute rate
- Review coverage
- Technician response latency
- Crash-free sessions

Exact targets set during Phase 3+ product planning.

---

## 19. Phase Completion Statements

### Phase 1

Upon completion and acceptance of all Phase 1 documents and folder scaffolding, **Phase 1 is finished**.

### Phase 1.5

Upon completion of all Business Engine documents under `docs/engines/`, **Phase 1.5 is finished**.

### Phase 1.8

Upon completion of all Engineering Handbook documents under `docs/engineering/`, **Phase 1.8 is finished**.

### Phase 1.9

Upon completion of all Product Bible documents under `docs/product/`, **Phase 1.9 is finished**.

Implementation must not start until Phase 2 is explicitly authorized.

---

## 20. Related Documents

- `ARCHITECTURE.md`
- `BUSINESS_RULES.md`
- `API.md`
- `SECURITY.md`
- `DEVELOPMENT_GUIDE.md`
- `engines/README.md`
- `engines/*_ENGINE.md`
- `engineering/README.md`
- `engineering/*` (Engineering Handbook)
- `product/PRODUCT_BIBLE_INDEX.md`
- `product/*` (Product Bible)
- `FINANCE_AND_SETTLEMENT.md`
- `AUTHORIZATION_AND_DATA_ACCESS.md`
- `ASYNC_WORKFLOWS.md`
- `COMPLIANCE_AND_RETENTION.md`
