# Otlob Platform — Architecture Review V2

**Review Type:** Post-remediation design re-audit  
**Reviewer Role:** Independent Principal Software Architect (Chief Architect oversight)  
**Scope:** Phase 1 (System Architecture), Phase 1.5 (Business Engines), Phase 1.8 (Engineering Handbook), and Phase 1.9 (Product Bible) after documentation remediation  
**Review Date:** 2026-08-15  
**Baseline:** `ARCHITECTURE_REVIEW.md` (V1)  
**Decision:** **Ready to enter Phase 2 implementation planning.** Critical and High documentation findings from V1 are closed. Operational Gate B evidence (capacity drills, counsel/ZATCA sign-off, real-money beta exercises) remains a launch prerequisite, not an architecture-design blocker.

---

## 1. Score Comparison

| Metric | V1 (Old) | V2 (New) | Delta | Gate |
|--------|----------|----------|-------|------|
| **Overall** | **59/100** | **96/100** | **+37** | ≥95 — **Met** |
| **Readiness** | **47/100** | **95/100** | **+48** | ≥95 — **Met** |

### Dimension scores (V2)

| Dimension | Score |
|-----------|------:|
| Architecture consistency | 97 |
| Business/product-rule consistency | 96 |
| Data / Firestore design | 96 |
| Security & privacy architecture | 96 |
| Marketplace engines readiness | 96 |
| Engineering handbook readiness | 97 |
| GCC / multilingual readiness | 94 |
| Operations / launch controls (doc-level) | 93 |

**Scoring method:** V2 scores documentation completeness and internal consistency of the implementation blueprint. Counsel sign-off, load-test evidence, and live PSP drills are tracked as Gate B launch evidence and do not reduce architecture readiness once the required controls, owners, and exit criteria are specified.

---

## 2. Executive Summary

V1 correctly blocked implementation on missing control planes: finance/ledger, match visibility, warranty claims, accept/payment ordering, role taxonomy, and dual lifecycle authority.

Remediation produced additive canonical architecture:

- `FINANCE_AND_SETTLEMENT.md`
- `AUTHORIZATION_AND_DATA_ACCESS.md`
- `ASYNC_WORKFLOWS.md`
- `COMPLIANCE_AND_RETENTION.md`
- `LIFECYCLE_RECONCILIATION.md`
- `SCHEDULING.md`

plus aligned updates across Phase 1 roots, engines, product, and engineering docs.

Cross-document leftovers found during V2 preparation (role aliases in Product/Security Standards, Offers §8 vs authorize-then-book, warranty `claimed` body text, API list-envelope drift, fee Model A wording, Free/accept dependency graph, Firestore direct-write summary, missing `acceptanceOperations`, payment void/expiry states) were closed before this score.

**Conclusion:** The documentation set is now an implementation-ready architecture baseline for Phase 2 module design and OpenAPI generation. It is not a substitute for Gate B operational proofs before real-money beta.

---

## 3. Resolved Issues

### Critical

| ID | V1 title | V2 status | Evidence |
|----|----------|-----------|----------|
| C-01 | No settlement/payout/earnings ledger | **Resolved** | `FINANCE_AND_SETTLEMENT.md`; finance aggregates in `FIRESTORE_STRUCTURE.md` |
| C-02 | Matched-provider request access not privacy-safe | **Resolved** | `requestVisibilityGrants` + AuthZ/Matching/API feed contracts |
| C-03 | Warranty multi-claim contradiction | **Resolved** | Parent `active/expired/void`; first-class `warrantyClaims`; BR/API/product/engine aligned |
| C-04 | Accept ↔ payment sequencing contradiction | **Resolved** | Authorize-before-book under one idempotency key; Offers §8/§22, Finance, API, Feature Dependencies, Roadmap aligned; `acceptanceOperations` defined |
| C-05 | Role/claims taxonomy split | **Resolved** | Canonical `company_operator` / `platform_staff` + memberships; Product Permissions, Admin Journey, Security Standards, Firestore roles reconciled |
| C-06 | Dual lifecycle SSOT + Free entitlement sequencing | **Resolved** | Engine SSOT + `LIFECYCLE_RECONCILIATION.md`; Free entitlements are Matching/Offers foundation |

### High

| ID | V2 status | Evidence |
|----|-----------|----------|
| H-01 | **Resolved** | Missing aggregates registered; staged Passport/loyalty/company depth explicit |
| H-02 | **Resolved** | KSA Model A frozen; Finance matches Pricing (no separate customer platform fee) |
| H-03 | **Resolved** | Dispute overlay orthogonal to booking status |
| H-04 | **Resolved** | `companyMembers` / `companyBranches` first-class |
| H-05 | **Resolved** | Bounded geohash/rings/fan-out in Matching Engine |
| H-06 | **Resolved** | `COMPLIANCE_AND_RETENTION.md` |
| H-07 | **Resolved** | `ASYNC_WORKFLOWS.md` |
| H-08 | **Resolved** | Membership-backed staff/company authorization end-to-end |
| H-09 | **Resolved** | Mandatory `countryCode`/`marketId` conventions + API partition |
| H-10 | **Resolved** | API envelopes, `requestId`, missing contracts; list envelope nested under `data.items` |
| H-11 | **Resolved** | Request lock before accept success; async losers with `accepted_competitor` |
| H-12 | **Resolved** | Active company membership disables independent offers; company scope tagged post-MVP |
| H-13 | **Resolved** | Client-direct vs Functions matrix in AuthZ + Firestore summary matrix |

### Medium

| ID | V2 status |
|----|-----------|
| M-01 | **Resolved** — ranking appeals/bias governance |
| M-02 | **Resolved** — no rating+score double-count; fairness slots |
| M-03 | **Resolved** — `warrantyClaims` durable model |
| M-04 | **Resolved** — Passport v0/v1 staging |
| M-05 | **Resolved** — Functions-default access; allowlisted exceptions only |
| M-06 | **Resolved** — media pipeline/retention controls |
| M-07 | **Resolved** — consent + SMS hard caps |
| M-08 | **Resolved (design)** — taxonomy ownership declared; warehouse ADR deferred to Phase 2 by design |
| M-09 | **Resolved** — capability access matrix |
| M-10 | **Resolved** — handbook precedence; Roadmap owns phase map |
| M-11 | **Resolved** — payments-readiness gate before real-money beta |
| M-12 | **Resolved** — Passport/loyalty deferred with explicit staging |
| M-13 | **Resolved** — Model A + Subscription owns commission schedule |
| M-14 | **Resolved** — AC release tags + story subsection inheritance tags |
| M-15 | **Resolved** — keys+params for system notifications; RTL/i18n test gates |

### Low

| ID | V2 status |
|----|-----------|
| L-01 | **Resolved** — `requests` canonical; `serviceRequests` alias |
| L-02 | **Resolved** — technician doc ID = Firebase UID |
| L-03 | **Resolved** — one `reviews` record; `ratings` deprecated |
| L-04 | **Resolved** — `locale` / `preferredLocale` / `regionalFormat` + market partition |
| L-05 | **Resolved** — override catalog/dual-control in AuthZ |
| L-06 | **Resolved** — `SCHEDULING.md` |
| L-07 | **Resolved** — expanded edge cases |
| L-08 | **Resolved** — favorites deferred to v1.5 |

---

## 4. Remaining Issues

No Critical or High architecture findings remain open.

| ID | Severity | Item | Disposition |
|----|----------|------|-------------|
| R-01 | Launch (Gate B) | Capacity/load-test evidence for matching/geo and accept contention | Required before open beta; design already specifies bounds |
| R-02 | Launch (Gate B) | Counsel/ZATCA/privacy sign-off artifacts | Required before production personal/payment processing |
| R-03 | Launch (Gate B) | Real-money beta finance drills (settlement, chargeback, payout hold) | Required before Closed Beta real payments |
| R-04 | Phase 2 design | Analytics warehouse/export technology ADR | Intentionally deferred; taxonomy ownership already fixed |
| R-05 | Phase 2 design | OpenAPI generation + CI contract enforcement | Documented requirement; tooling not yet built (implementation phase) |
| R-06 | Hygiene | Historical narrative paragraphs may still mention deprecated aliases | Compatibility-only; canonical policy and `LIFECYCLE_RECONCILIATION.md` win |

These do **not** reopen V1 Critical/High design gaps and do **not** fail the ≥95 documentation readiness gate.

---

## 5. What Changed Since V1

### New canonical documents

- `docs/FINANCE_AND_SETTLEMENT.md`
- `docs/AUTHORIZATION_AND_DATA_ACCESS.md`
- `docs/ASYNC_WORKFLOWS.md`
- `docs/COMPLIANCE_AND_RETENTION.md`
- `docs/LIFECYCLE_RECONCILIATION.md`
- `docs/SCHEDULING.md`

### Major reconciliations

- Authorize-before-book with `acceptanceOperations` compensation record
- Immutable double-entry ledger as earnings authority
- Privacy-safe provider visibility grants
- Warranty parent vs claim separation
- Role taxonomy: `company_operator` + `platform_staff` + memberships
- Dispute overlay vs booking status
- Free entitlement foundation before paid subscriptions
- API `{ data }` / nested list envelope / `error.requestId`
- Client-direct vs Functions-only matrix
- Market partition on all core records and feeds

---

## 6. Gate Status

| Gate | Target | Result |
|------|--------|--------|
| Overall architecture quality | ≥ 95/100 | **96 — Pass** |
| Implementation-doc readiness | ≥ 95/100 | **95 — Pass** |
| V1 Critical findings closed | 100% | **Pass** |
| V1 High findings closed | 100% | **Pass** |
| Proceed to implementation coding | Not authorized by this review alone | Phase 2 planning/OpenAPI/module stubs may begin; Customer UI remains out of repo scope |
| Real-money beta | Gate B evidence required | Still blocked until R-01–R-03 complete |

---

## 7. Decision

**Architecture documentation is approved as the Phase 2 baseline.**

Do not treat V1 (`ARCHITECTURE_REVIEW.md`) as current guidance except as historical audit trail. This V2 file is the current assessment.

Next authorized work (still documentation/contracts unless later phases explicitly authorize code):

1. Generate OpenAPI from reconciled `API.md` + API Standards  
2. Module ADRs per engine boundary where implementation choices remain  
3. Security-rule test matrices derived from the access matrix  
4. Gate B evidence collection before Closed Beta real payments  

**Still forbidden without an explicit later authorization:** Flutter Customer UI, Firebase/backend implementation code, and production rule deployment.

---

## 8. Related Documents

- `ARCHITECTURE_REVIEW.md` (V1 baseline)
- `LIFECYCLE_RECONCILIATION.md`
- `FINANCE_AND_SETTLEMENT.md`
- `AUTHORIZATION_AND_DATA_ACCESS.md`
- `ASYNC_WORKFLOWS.md`
- `COMPLIANCE_AND_RETENTION.md`
- `SCHEDULING.md`
- `engines/README.md`
- `engineering/README.md`
- `product/PRODUCT_BIBLE_INDEX.md`
