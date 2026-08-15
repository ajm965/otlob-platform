# Otlob Platform — Independent Architecture Review

**Review Type:** Pre-investment design audit  
**Reviewer Role:** Independent Principal Software Architect  
**Scope:** Phase 1 (System Architecture), Phase 1.5 (Business Engines), Phase 1.8 (Engineering Handbook), and Phase 1.9 (Product Bible)  
**Review Date:** 2026-08-15  
**Decision:** **Not ready to begin production implementation until Critical and High Priority findings are resolved.**

---

## 1. Executive Summary

Otlob has an unusually strong documentation foundation for a pre-implementation marketplace: the product boundaries are clear, the Customer application ownership boundary is consistently protected, business engines are extensive, and the engineering handbook gives a 20+ engineer team a credible common operating model.

However, this is not yet a $10M-investment-ready implementation blueprint. The core marketplace journey is documented, but several foundational control-plane designs remain unresolved:

1. There is no authoritative **provider settlement, payout, earnings ledger, or withdrawal data model**, despite technician/company earnings and withdrawals appearing in product flows.
2. The provider’s ability to read matched requests is described as “scoped” but there is no persistable, enforceable **match entitlement/read model**. This creates a material privacy risk because request records contain precise addresses and customer media.
3. **Warranty claim lifecycle contradicts itself**: engines allow multiple accepted claims while business rules require warranties to remain `active` for claiming, and product/Firestore models lack a first-class claim aggregate.
4. **Accept ↔ payment ordering is contradictory** across Business Rules, Offers Engine, and API (`booking must exist` vs `authorize near accept`).
5. **Role/claims models diverge**: Security/Business Rules define four roles; Product Permissions Matrix and Admin journeys introduce eight staff/ops roles without a claims schema.
6. Product and engines both claim “authoritative” lifecycles while enums, transient statuses (`accepting`, `superseded`, `matching_sparse`), and MVP build order (offer caps before subscription foundation) remain unreconciled.
7. The architecture promises several capabilities—companies, branches, membership, warranty claims, Home Passport rooms/parts/schedules, loyalty ledgers, plans/coupons, audit logs—without defining their authoritative persistence model.
8. GCC readiness is aspirational rather than operational: `countryCode` is required by engineering/matching standards but largely absent from the physical Firestore model.

The design should be treated as a strong **product-and-architecture discovery baseline**, not an implementation-ready architecture. Resolve the Critical issues and the priority High issues through ADRs, canonical data models, and policy decisions before Phase 2.

Supplemental specialist audits informing this consolidated report: [architecture/data/security audit](6bcbe359-3cfa-4440-be7c-e7e8ad74ba2f), [marketplace engines audit](a4e6314f-8dcc-4c06-8da9-4f5df32a3bce), [product/handbook audit](dfe68c03-3bd4-4ab8-ad30-0112604e9496).

---

## 2. Review Scope and Method

Reviewed:

- Root and Phase 1 documents in `docs/`
- Business Engine specifications in `docs/engines/`
- Engineering Handbook in `docs/engineering/`
- Product Bible in `docs/product/`

Assessment criteria:

1. Architecture consistency
2. Business and product-rule consistency
3. Database and Firestore scalability
4. Security and privacy architecture
5. Marketplace, matching, pricing, subscription, warranty, company, and Home Passport readiness
6. GCC, Arabic/English, performance, technical-debt, and circular-dependency risks

Severity definitions:

| Severity | Meaning |
|----------|---------|
| Critical | Could cause financial loss, privacy exposure, or an unimplementable core path |
| High | Must be decided before a module enters implementation |
| Medium | Material cost, operational, or product risk; resolve during Phase 2 design |
| Low | Quality, governance, or documentation improvement; schedule deliberately |

---

## 3. Strengths

| Area | Assessment |
|------|------------|
| Boundary discipline | The Customer UI exclusion is repeated and unambiguous across architecture, engineering, and product documentation. |
| Domain decomposition | Requests, offers, bookings, trust, subscription, company, and Home Passport are sensibly separated. |
| Marketplace integrity | Offer acceptance, payment mutation, role changes, and warranty issuance are consistently designated as server-controlled. |
| Transaction awareness | Idempotency and transactional exclusive acceptance are repeatedly recognized. |
| Product completeness | State machines, journeys, acceptance criteria, edge cases, and release scope provide a strong common vocabulary. |
| Engineering governance | The handbook provides credible module, PR, review, logging, error, and testing standards. |
| Localization intent | Arabic-first, RTL, bilingual notification, and localized catalog terminology are consistently recognized. |
| Explainability intent | Matching and ranking specify reason codes, factor breakdowns, policy versions, and auditability. |

---

## 4. Critical Issues

### C-01 — No authoritative settlement, payout, earnings, or withdrawal architecture

**Evidence**

- `docs/FIRESTORE_STRUCTURE.md` defines `payments` and `subscriptions`, but no payout, provider balance, immutable financial ledger, withdrawal, payout account, settlement, or reconciliation collection.
- `docs/engines/COMPANY_ENGINE.md` states that payouts go to the company account.
- `docs/product/TECHNICIAN_JOURNEY.md` includes earnings and withdrawals.
- `docs/product/FEATURE_DEPENDENCIES.md` makes withdrawals depend on an earnings ledger, but no ledger model exists.
- `docs/product/MVP_SCOPE.md` defers withdrawal automation while retaining earnings visibility.

**Impact**

The platform cannot safely claim provider earnings, company payouts, dispute holds, partial refunds, commission deductions, or withdrawals without a double-entry or otherwise immutable accounting model. Adding it after bookings and payments exist creates expensive data migration and reconciliation risk.

**Recommendation**

Before Phase 2, publish a Finance and Settlement ADR plus a canonical financial model covering:

- Payment intent, authorization, capture, refund, chargeback, and settlement
- Provider payable, platform revenue, tax payable, refund liability, reserve/hold, and withdrawal balances
- Immutable journal/ledger entries and reconciliation with PSP settlement reports
- Payout beneficiary/KYC, payout states, withdrawal limits, payout failures, and dispute holds
- Company-versus-technician commercial attribution and payout ownership
- Exact cancellation and refund policy matrix

---

### C-02 — Matched-provider access to request data is not enforceable or privacy-safe as designed

**Evidence**

- `docs/SECURITY.md`, Firestore policy summary, says requests are readable by “owner, related provider scoped, admin.”
- `docs/FIRESTORE_STRUCTURE.md` request documents include address/location and customer media.
- `docs/engines/MATCHING_ENGINE.md` produces candidate results and notifications, but no `matches`, `requestVisibility`, or equivalent entitlement collection is defined.

**Impact**

Firestore rules cannot safely infer an arbitrary provider’s matching eligibility from dynamic distance, services, availability, working hours, subscription, and score without either expensive/unreliable rule reads or a persisted authorization grant. A broad query risks exposing exact customer locations and request media to unqualified providers.

**Recommendation**

Choose and document one canonical approach before implementation:

1. **Server-read feed:** providers receive only API-projected request summaries; no direct Firestore reads of requests.
2. **Persisted entitlement:** Matching writes a time-bound provider/request visibility grant containing only the minimum display projection and expiry.

Define exact location precision before accept, media visibility, revocation on provider suspension/request cancellation, audit retention, and notification-wave eligibility.

---

### C-03 — Warranty multi-claim lifecycle is internally contradictory

**Evidence**

- `docs/engines/WARRANTY_ENGINE.md` allows multiple accepted claims (e.g., max 2) and discusses open claims around expiry.
- `docs/BUSINESS_RULES.md` BR-GUA-003: only `active` guarantees can be claimed.
- `docs/FIRESTORE_STRUCTURE.md` / `docs/product/STATE_MACHINE.md` use a top-level `claimed` warranty status and lack a durable claim collection with its own state machine (`cancelled` appears in the engine but not product claim sub-states).

**Impact**

The first claim can terminalize the warranty as `claimed`, making further valid claims illegal—or status meaning becomes undefined. Rework, dispute handoff, and SLA tracking cannot be audited safely.

**Recommendation**

Separate **warranty status** from **claim records**. Keep warranty `active` until expiry/void. Persist `warrantyClaims` (or equivalent) with full claim states. Align BR-GUA-003, Firestore, API, and product state machine to one model.

---

### C-04 — Accept ↔ payment sequencing is contradictory

**Evidence**

- `docs/BUSINESS_RULES.md` BR-PAY-004: payment intent requires a `confirmed` booking; BR-PAY-005 recommends authorize-near-accept.
- `docs/engines/OFFERS_ENGINE.md` requires payment prechecks at accept.
- `docs/API.md` separates accept (`/offers/{id}/accept`) from payment intent (`/payments/intents`).
- Firestore Accept Offer recipe creates booking + notifications but does not define payment/auth compensation.

**Impact**

Implementations can book without funds, authorize without a booking, or create double-charge/orphan-booking failure modes. Job-start gates (BR-PAY-006) cannot be enforced consistently.

**Recommendation**

Lock one KSA v1 sequence with rollback semantics, for example:

1. Accept transaction creates booking `confirmed` + payment intent atomically, then client confirms PSP; or
2. Authorize hold first, then accept/booking under the same idempotency key.

Document failure compensation, webhook ordering, and when job start is allowed.

---

### C-05 — Platform role model is not a single source of truth

**Evidence**

- `docs/SECURITY.md`, `docs/BUSINESS_RULES.md`, and engineering security standards: `customer` / `technician` / `company` / `admin`.
- `docs/product/PERMISSIONS_MATRIX.md` and `docs/product/ADMIN_JOURNEY.md`: Super Admin, Support, Finance, Operations, plus company-scoped roles.
- `docs/TECH_STACK.md` mentions singular claim `role`; Firestore uses `roles[]` + `primaryRole`; company membership claims are not schema’d.

**Impact**

Auth middleware, Firestore rules, refund/dispute permissions, and Admin panel access will diverge. Money and PII paths are likely to be over- or under-privileged.

**Recommendation**

Publish one Authorization ADR freezing:

- Global platform roles
- Staff/ops sub-roles (or memberships)
- Company-scoped roles
- Custom-claims payload shape and size limits
- Refresh/revocation and support break-glass rules

Update Security, Product Permissions, and Business Rules to the same taxonomy—or explicitly mark staff roles post-MVP with claim codes.

---

### C-06 — Dual “authoritative” lifecycles and MVP entitlement sequencing conflict

**Evidence**

- `docs/product/STATE_MACHINE.md` claims authoritative lifecycles.
- Engines introduce additional/transient statuses (`superseded`, `accepting`, `matching_sparse`, subscription `grace`/`paused`) not consistently present in product SM or Firestore enums.
- Competitor-close reasons differ (`rejected_by_acceptance` vs `accepted_competitor`); BR-OFF-009 allows `rejected` or `expired`.
- `docs/product/MVP_SCOPE.md` / Matching need Free-tier caps and subscription weights, while `FEATURE_DEPENDENCIES.md` schedules Subscriptions as build step 7 after core offers.

**Impact**

Enums, APIs, tests, and analytics will fork. Core offer path can ship without entitlement enforcement, breaking fairness/abuse controls that MVP already assumes.

**Recommendation**

1. Declare a single lifecycle SSOT (engines for domain enums; product SM as UX projection—or the reverse) and publish a reconciliation matrix.
2. Split **Free entitlements v1** into Matching/Offers foundation; keep paid Pro/Premium as post-MVP.
3. Ban undocumented transient statuses unless they appear in the SSOT with client visibility rules.

---

## 5. High Priority Issues

### H-01 — Promised domains lack a physical data model and ownership boundary

**Evidence**

The Firestore collection registry (`docs/FIRESTORE_STRUCTURE.md`) omits models required by later documents:

- Company branches and memberships
- Match decisions / provider visibility grants
- Audit logs
- Subscription plans, invoices, and entitlement policy versions
- Coupon/campaign inventory and redemption ledger
- Loyalty accounts and immutable point ledger
- Warranty claim entities and claim evidence lifecycle
- Home Passport rooms, parts, invoices, schedules, and technician/service graph
- Earnings, payout accounts, withdrawals, settlements, and chargebacks
- Operations queues / moderation cases

**Impact**

Different teams will invent incompatible storage patterns, bypass ownership boundaries, and make API/permission claims that cannot be implemented consistently.

**Recommendation**

Create a Phase 2 canonical data-model supplement before implementation. For every missing aggregate, define source of truth, document ID strategy, relationships, indexes, write authority, retention, PII classification, and lifecycle.

---

### H-02 — Money semantics remain ambiguous

**Evidence**

- `docs/engines/PRICING_ENGINE.md` defines `grossAmountHalalas` as what a customer pays “before/after tax per display policy.”
- Platform-fee incidence is configurable, while commission base and tax treatment are separately configurable.
- `docs/BUSINESS_RULES.md` leaves capture timing configurable.
- Booking, payment, subscription, dispute, company, and product documents all depend on these outcomes.

**Impact**

Tax invoices, customer disclosure, provider net earnings, refunds, coupon funding, and PSP integration cannot be built or tested accurately without a single commercial calculation contract.

**Recommendation**

Define one KSA v1 money policy—not just configurable options:

- Tax-inclusive/exclusive price display
- Base amount, surcharge order, discount order, platform fee payer, commission base, VAT base, rounding, and invoice lines
- Authorization/capture timing
- Cancellation/refund/chargeback rules
- Coupon and loyalty funding liability
- Booking-time price snapshot schema

---

### H-03 — Booking/dispute state model is structurally ambiguous

**Evidence**

`docs/product/STATE_MACHINE.md` treats `disputed` as a booking state that “may overlay” a prior state or be forced as a state; it can later “return to prior terminal.” This is neither a single state machine nor a documented orthogonal state model.

**Impact**

Implementations will diverge on whether an in-progress job may complete, whether payment can capture, whether review/warranty remains available, and which state queries power dashboards.

**Recommendation**

Model booking lifecycle and dispute lock separately:

- `bookingStatus`: confirmed / in_progress / completed / cancelled
- `disputeStatus` or `hasOpenDispute`: independent state
- Explicit transition table for payment, warranty, review, payout, and rework while disputed

---

### H-04 — Company membership and branch model conflicts with document-scale requirements

**Evidence**

- `docs/FIRESTORE_STRUCTURE.md` uses `companies.adminUserIds` and `users.companyId`.
- The same document notes large membership should move to a `companyMembers` subcollection.
- `docs/engines/COMPANY_ENGINE.md` requires multi-role memberships, branches, technician mapping, service overrides, and branch managers.
- No branch or membership collection is specified.

**Impact**

Arrays and a single `companyId` cannot represent multi-role membership, historical transfers, branch assignment, multiple company associations, or scalable authorization.

**Recommendation**

Make `companyMembers` and `companyBranches` first-class entities now. Decide whether a technician may have one active company, multiple affiliations, or independent and company modes. Build all Company authorization from memberships, not arrays.

---

### H-05 — Firestore geo/matching query plan is not implementation-ready

**Evidence**

`docs/engines/MATCHING_ENGINE.md` describes geohash prefixes, radius expansion, online candidate caches, service matching, company branches, score ranking, and p95 ≤ 300 ms, but lacks:

- Geohash precision/ring algorithm
- Maximum prefix/query fan-out and candidate count
- Exact query shapes and index definitions per path
- Cache consistency and invalidation model
- Fallback behavior when geo candidate sets are large

**Impact**

Dense cities can generate expensive fan-out and read amplification. The stated latency target is not supportable without capacity assumptions and an operational query design.

**Recommendation**

Create a Matching v1 technical design with city density assumptions, bounded candidate retrieval, geohash cell strategy, query/index matrix, cache TTL/invalidation, capacity/load test targets, and privacy-safe projected feed model.

---

### H-06 — Privacy, KSA compliance, and GCC expansion are not operationally specified

**Evidence**

Documents mention KSA legal review, tax, retention, and future GCC country packs, but do not define:

- Data classification and data inventory
- PDPL lawful basis, consent, deletion/export workflow, or processor/subprocessor governance
- Country-specific data residency and cross-border transfer policy
- E-invoicing/ZATCA obligations and invoice retention
- PSP, payout, identity/KYC, and SMS-provider country selection

**Impact**

Compliance becomes an after-the-fact rewrite affecting schemas, logs, media, support tools, and vendor contracts.

**Recommendation**

Commission privacy, financial-compliance, and country-launch checklists before processing real KSA personal or payment data. Treat GCC expansion as a country onboarding program, not just `countryCode`.

---

### H-07 — Eventing, asynchronous work, retries, and reconciliation ownership are under-specified

**Evidence**

The architecture requires notifications, expiry, warranty generation, denormalization, aggregates, payment webhooks, matching waves, score refresh, and subscription renewal. It does not define an outbox/event schema, queue ownership, retry policy per workflow, dead-letter handling, or reconciliation jobs beyond scattered references.

**Impact**

At-least-once processing will generate duplicate side effects, orphaned projections, and inconsistent notifications unless events, idempotency, and recovery ownership are canonical.

**Recommendation**

Create an asynchronous-work standard: event envelope, producer/consumer ownership, idempotency key convention, retry/backoff, dead-letter policy, replay/reconciliation, observability, and retention.

---

### H-08 — Role/permission strategy will not scale cleanly to company and operations roles

**Evidence**

See C-05. The dual taxonomy remains a High implementation blocker even after the Critical governance decision, because company-scoped roles and staff overlays still need claim/membership mechanics.

**Impact**

Claims may become stale or oversized; broad admin permissions and support access risk PII and financial overreach.

**Recommendation**

Same as C-05, plus CODEOWNERS and Admin route matrix aligned to the frozen taxonomy before Admin UI work begins.

---

### H-09 — `countryCode` / market partition is required by standards but missing from core physical schemas

**Evidence**

- `docs/engineering/DATABASE_STANDARDS.md` and Matching Engine require market/`countryCode` partitioning.
- `docs/FIRESTORE_STRUCTURE.md` largely places `countryCode` only on addresses (`SA`); users, technicians, requests, offers, bookings, and payments lack consistent market fields/indexes.

**Impact**

KSA-only schemas create painful GCC migration and unsafe cross-market queries.

**Recommendation**

Add `countryCode` (and optional `marketId`) to core marketplace documents and indexes; treat market as a mandatory query constraint in API list endpoints.

---

### H-10 — API contract surface drifts from mandatory API standards and engines

**Evidence**

- `docs/engineering/API_STANDARDS.md` requires `{ data }` envelopes and `error.requestId`; `docs/API.md` examples omit these.
- Offer editing and Pricing suggest/validate/finalize operations exist in engines but not in `docs/API.md`.
- Dispute appeal exists in Dispute Engine but not in API.

**Impact**

External Customer team and backend will ship incompatible contracts; Phase 2 will invent endpoints.

**Recommendation**

Reconcile `API.md` to API Standards before OpenAPI generation; add missing offer-edit, pricing, and appeal endpoints (or explicitly defer them with version tags).

---

### H-11 — Accept exclusivity at scale allows loser-status lag races

**Evidence**

Offers Engine proposes async loser closure after lock; Firestore Accept recipe and product SM imply synchronous competitor rejection. Transient `accepting` is not in the product state machine.

**Impact**

UI/API can still show losers as `submitted`, inviting false accept attempts and support confusion.

**Recommendation**

Require exclusive request lock (`booked` / `acceptedOfferId` / documented `accepting`) before any accept success; treat non-winner accepts as hard conflict even if loser status is eventually consistent; align recipes.

---

### H-12 — Company dual-identity bidding and MVP company bleed are unresolved

**Evidence**

Company Engine leaves independent-vs-company bidding open; Offers Engine treats company vs technician identity carefully but does not hard-ban dual bids. Product MVP defers company console while journeys/ACs/stories still include company assignment.

**Impact**

Same person can bid twice; MVP teams may implement company dispatch prematurely.

**Recommendation**

Hard rule for v1: active company membership disables independent offers (or explicit allowlist). Tag all Company ACs/stories `post-MVP` / `v1.5` except “not in MVP” gates.

---

### H-13 — Client-direct Firestore writes conflict with “Functions gate all invariants”

**Evidence**

Architecture requires Functions for invariant mutations; Security/Firestore matrices still allow client writes for messages, addresses, homes, and limited profile updates, plus “public subset” technician reads without field-mask contracts.

**Impact**

Implementers may bypass rate limits, moderation, and PII minimization.

**Recommendation**

Publish an explicit Client-direct vs Functions-only matrix (collection × operation × fields). Default chat/media/KYC to signed-upload + Functions; define public DTOs separately from raw docs.

---

## 6. Medium Priority Issues

| ID | Finding | Impact | Recommendation |
|----|---------|--------|----------------|
| M-01 | The ranking score uses sensitive outcomes (complaints, claims, acceptance rate) without a formal appeals/correction, data-quality, or bias-review process. | Provider fairness and potential discriminatory outcomes. | Define correction workflows, sample thresholds, protected-feature exclusion, drift/bias monitoring, and manual override governance. |
| M-02 | Matching and subscription priority can create pay-to-win supply starvation despite stated fairness principles; Matching also double-counts Technician Score and raw Rating. | Free/new technicians starved; rating overweight. | Fairness quotas; use Score or residual rating, not both at full weight. |
| M-03 | Warranty claim is represented as a claim subflow but lacks a canonical claim aggregate and evidence retention model. | Claim history, SLA, rework, and dispute handoff will be difficult to audit. | Define `warrantyClaims` with lifecycle, evidence, rework, and retention (see C-03). |
| M-04 | Home Passport is product-rich but mismatched to Firestore scope. Rooms, parts, schedules, invoices, preferred technicians, and sharing consents are not persisted. | Scope creep and privacy exposure. | Define a staged Passport v0/v1 model with consent and history boundaries; align ADR-010 with MVP. |
| M-05 | Direct client writes are allowed for addresses, home data, messages, and some profile records without a definitive field allowlist and anti-abuse design. | Unauthorized field mutation or data quality drift. | Specify per-field write schemas, append-only histories, rate limits, and security-rule test matrices (see H-13). |
| M-06 | Storage security specifies signed upload URLs but not malware scanning, media processing, EXIF policy, signed URL lifetime, or deletion/retention execution. | KYC/evidence abuse, privacy, and storage cost risk. | Define media pipeline and retention policy before KYC/evidence launch. |
| M-07 | Notification preferences and SMS consent are described broadly, not as a country-specific consent model; SMS escalation from matching can blow cost. | Regulatory and cost risk. | Consent model + push/in-app first; SMS only critical with hard caps. |
| M-08 | Search and operational analytics are mentioned but no analytics warehouse/event taxonomy or data ownership exists. | Dashboard and AI plans depend on data that may not be captured. | Define event taxonomy, warehouse/export strategy, metric ownership, and retention. |
| M-09 | API standards prescribe REST while architecture allows direct Firestore reads, but a capability-by-capability access decision is absent. | Inconsistent client behavior and security semantics. | Create a data-access matrix: REST-only, realtime listener, or server-generated projection for each feature. |
| M-10 | Engineering docs duplicate Phase 1 standards without formal precedence; Architecture §15 and Release↔Roadmap phase maps conflict. | Teams follow conflicting guidance; staffing gates unclear. | Declare handbook SSOT; one phase mapping owned by Roadmap. |
| M-11 | Release plan calls for real limited payments in Closed Beta before compliance, payout, and reconciliation completion gates are fully defined. | Financial and operational launch risk. | Add explicit payments-readiness gate before any real-money beta. |
| M-12 | Product promise and roadmap sequencing differ: Home Passport and loyalty are Phase 1.5 engine priorities but MVP defers them, while ADR-010 argues early investment. | Scope ambiguity and planning churn. | Declare Passport v0 (history-only) versus v1 scope and align it across ADR, MVP, roadmap, and engines. |
| M-13 | Pricing fee models A/B/C and commission ownership remain dual-sourced across Pricing and Subscription engines. | Wrong net/payout and VAT incidence. | Lock Model A (or B) for SA MVP; Subscription owns schedule; Pricing only computes. |
| M-14 | Acceptance criteria and stories are not MVP-tagged (Pro subscribe, company assign appear beside Free-only MVP). | Staging “done” pulls v1.5 work. | Prefix AC/stories `MVP` / `v1.5` / `v2.0`. |
| M-15 | Multilingual strategy mixes message keys vs stored AR/EN blobs; testing guide lacks RTL/i18n gates. | Third-language/GCC expansion friction; untested AR UX. | Prefer keys+params for system notifications; add AR/EN money/RTL acceptance tests for MVP. |

---

## 7. Low Priority Issues

| ID | Finding | Recommendation |
|----|---------|----------------|
| L-01 | Collection naming uses `requests` while coding standards illustrate `serviceRequests`; terminology is not fully canonical. | Publish a bounded ubiquitous-language glossary. |
| L-02 | `technicians` document ID strategy is undecided (same UID or dedicated ID). | Choose UID-as-ID unless a clear multi-profile requirement exists. |
| L-03 | `ratings` may be separate or embedded, leaving an implementation fork. | Choose one v1 representation and document migration trigger. |
| L-04 | User locale supports only `ar`/`en`, while GCC rollout will require locale-vs-market distinction. | Separate `preferredLocale`, `countryCode`, and regional formatting policy. |
| L-05 | “Admin may override” appears in multiple engines without approval thresholds. | Define override catalog, dual-control rules, and audit requirements. |
| L-06 | Scheduling is limited to a preferred window; travel-time, arrival confirmation, reschedule, and timezone semantics need a dedicated scheduling model. | Add a scheduling/availability design before scheduled-service launch. |
| L-07 | Product edge cases omit explicit data deletion, legal hold, accessibility failure, disaster recovery, chargeback, warranty TZ expiry, offer `superseded`, and out-of-order webhooks. | Expand edge-case catalog and privacy/ops runbooks. |
| L-08 | Guest “favorite technician” appears in customer journeys without an engine/API contract. | Mark future or add a thin favorites contract. |

---

## 8. Consistency Assessment

### 8.1 Architecture Consistency

**Assessment: Partially consistent.**

Clean Architecture, modular backend, REST, and server-owned invariants are consistently stated. The inconsistency is between a broad set of product/engine promises and the narrower canonical data and authorization model. The documents explain intent well, but several foundational aggregates remain implied rather than designed.

### 8.2 Business Rules Consistency

**Assessment: Partially consistent.**

Request → offer → booking → job → warranty → review is consistently represented. Conflicts/ambiguities exist in:

- Warranty status vs multi-claim records (C-03)
- Accept ↔ payment ordering (C-04)
- Booking versus dispute state representation
- Capture timing and payment prerequisites for job start
- Cancellation/refund economics
- Company payout versus individual technician earnings
- Offer competitor-close status/reason codes
- Free entitlements sequencing vs paid subscription deferral

### 8.3 Product Consistency

**Assessment: Good direction; scope requires consolidation.**

The Product Bible is rich and generally matches engines. The most material conflict is scope: Home Passport, loyalty, advanced subscriptions, withdrawals, and company operations are deeply designed but explicitly deferred from MVP. This is workable only if staged product versions are made canonical.

### 8.4 Engineering Standards

**Assessment: Strong.**

The handbook is appropriate for a larger team. It needs a precedence model because Phase 1 and Phase 1.8 documents overlap. It also needs enforcement artifacts in Phase 2: CODEOWNERS, CI quality gates, lint configurations, rule tests, and ADR workflow.

---

## 9. Database and Firestore Scalability Assessment

### Strengths

- Clear timestamps, soft-delete concept, halala money storage, and index registry
- Awareness of high-cardinality subcollections and transactional exclusivity
- Avoidance of client-controlled critical writes

### Risks

1. Missing aggregates/data collections identified in H-01
2. No exact geo-query design (H-05)
3. Hot document risk for request offer count, rating aggregates, notification counters, and company membership arrays
4. Offer acceptance loser closure can exceed Firestore batch limits; the design mentions asynchronous closure but needs a durable operation-state model
5. Security rules cannot be the only mechanism for dynamic matching authorization (C-02)
6. No bulk export, point-in-time recovery, restore verification, or retention/deletion execution design

### Required Firestore Decisions Before Phase 2

- Canonical document IDs
- Authoritative vs denormalized projections
- Match entitlement/access model
- Financial and loyalty ledgers
- Company/branch/membership hierarchy
- Firestore query/index matrix for every list/feed
- Hot-path capacity assumptions and load-test targets

---

## 10. Security Risks

| Risk | Severity | Required control |
|------|----------|------------------|
| Request address/media exposure to unmatched providers | Critical | Server-projected feeds or persisted time-bound access grants |
| Financial ledger/payout absence | Critical | Immutable accounting, reconciliation, segregation of duties |
| Over-broad or stale roles/claims | High | Scoped RBAC/ABAC design, claims refresh/revocation, audits |
| KYC/dispute media abuse | Medium | Upload authorization, scanning, content policy, retention, legal hold |
| App/device abuse and automated signups | Medium | App Check/device risk/velocity controls before open beta, not merely Phase 6 |
| Admin and support PII access | High | Least privilege, break-glass, audit alerts, support-view redaction |
| Webhook spoof/replay | High | Signature verification, replay prevention, immutable event log |

---

## 11. Scalability Risks

| Risk | Impact | Mitigation direction |
|------|--------|----------------------|
| Dense-city geo fan-out | High latency/cost | Bounded geohash retrieval, cached projections, load testing |
| Notification fan-out | Provider spam and queue cost | Priority waves, dedupe, caps, cancellation on state change |
| Aggregate contention | Failed/slow transactions | Sharded counters/materialized projections |
| Async side-effect duplication | Multiple notifications/warranties/points | Inbox/outbox, idempotency, reconciliation |
| Chat/media growth | Storage/read cost | Pagination, lifecycle retention, media tiers |
| Cross-market policy sprawl | Slow GCC expansion | Versioned country policy packs and governance |

---

## 12. Product Risks

| Risk | Impact | Recommendation |
|------|--------|----------------|
| Low supply at launch | Empty offers, poor retention | City/service launch playbook and supply-density thresholds |
| Pay-to-win perceptions | Provider churn and customer mistrust | Exposure fairness metrics and plan boost caps |
| Emergency positioning | Legal/trust harm if SLA unmet | Explicit service-level disclaimers and escalation policy |
| Price opacity | Payment disputes | Lock KSA commercial policy; show mandatory breakdown |
| Overbuilt MVP | Delayed launch | Make MVP scope authoritative and postpone soft dependencies |
| Warranty overpromise | Claims cost and provider dissatisfaction | Service-specific legal terms and financial reserve policy |

---

## 13. Technical Debt Risks

1. **Documentation debt:** policy choices are repeatedly marked configurable rather than decided.
2. **Data-model debt:** engines introduce aggregates not represented in the Firestore model.
3. **Integration debt:** payment provider, payout provider, KYC, SMS, maps, and analytics contracts have no selection/adapter acceptance criteria.
4. **Operational debt:** manual beta operations may become permanent without queue ownership and SLAs.
5. **Client-contract debt:** external Customer application can drift before OpenAPI, API change governance, and contract-testing are established.
6. **Policy-version debt:** matching, pricing, subscriptions, warranties, and ranking all use policy versions but no central configuration lifecycle is defined.

---

## 14. Circular Dependencies and Complexity Analysis

### Identified Dependency Cycles

| Cycle | Risk | Resolution |
|-------|------|------------|
| Matching → subscription priority → offer conversion → ranking → matching | Feedback loop can entrench paid/high-score providers | Add exploration/fairness budget and cohort monitoring |
| Pricing → Home Passport signals → completed jobs → Home Passport history → future price estimates | Incomplete/incorrect passport data can bias price suggestions | Make Passport inputs optional, confidence-scored, and non-binding |
| Warranty → claims → ranking → matching → provider volume → warranty exposure | Claim rates may penalize high-volume providers without normalization | Normalize by exposure/category; maintain correction and appeal process |
| Loyalty → discounts → payment/refund → loyalty clawback | Ledger drift if payment events duplicate or reverse | Immutable loyalty ledger keyed by financial events |
| Company assignment → technician score → company ranking → assignment allocation | Internal assignment may optimize scores rather than customer outcome | Separate company composite from individual quality and audit allocation |

### Complexity Assessment

| Dimension | Rating | Reason |
|-----------|--------|--------|
| Domain complexity | High | Two-sided marketplace, money, trust, real-time operations |
| Data complexity | High | Firestore + denormalization + geo + media + audit/financial records |
| Security complexity | High | KYC, home PII, payments, multi-role organizations |
| Operational complexity | High | Matching waves, verification, disputes, refunds, support |
| Implementation maturity | Medium-low | Strong documentation, unresolved foundational contracts |

**Conclusion:** The platform should begin as a well-bounded modular monolith, but only after locking financial, access-control, and eventing foundations. It should not begin as distributed microservices.

---

## 15. Missing Documentation

The following documents are required before or at the start of Phase 2:

1. Finance, settlement, payout, and reconciliation architecture
2. Canonical data-model addendum for missing aggregates
3. Match entitlement and provider privacy/access-control design
4. Asynchronous workflow/eventing/reconciliation standard
5. KSA privacy/PDPL, retention, deletion/export, and legal-hold policy
6. KSA payment, VAT/e-invoicing, refund, and chargeback operational policy
7. Company membership/branch authorization ADR
8. Scheduling, availability, rescheduling, and no-show policy
9. Analytics event taxonomy, data warehouse/export, and metric ownership
10. API contract governance plan with external Customer team
11. Production SLO, capacity, backup/restore, incident, and cost model
12. AI governance policy before any model is user-visible

---

## 16. Recommendations and Gated Next Steps

### Gate A — Must close before Phase 2 implementation

1. Resolve **C-01 through C-06**.
2. Produce the missing canonical data-model supplement (including `countryCode`, claims, warranty claims, company memberships/branches).
3. Finalize KSA v1 commercial/payment/accept sequence policy.
4. Choose direct Firestore vs REST/server-projection access per capability (H-13).
5. Freeze authorization taxonomy and Free entitlements v1 for Matching/Offers.
6. Reconcile `API.md` with API Standards and engine-required endpoints (H-10).

### Gate B — Must close before any real-money Closed Beta

1. Reconciliation, refunds, payouts, chargebacks, and finance controls.
2. KSA privacy, retention, vendor, and invoice compliance sign-off.
3. Admin/support segregation of duties and audit monitoring.
4. Matching load test and privacy test evidence.
5. Media/KYC security pipeline and incident playbooks.
6. Lifecycle SSOT reconciliation matrix signed by Product + Architecture.

### Gate C — Must close before GCC country expansion

1. Country-launch governance pack: legal, tax, currencies, payment rails, KYC, SMS, language, residency.
2. Market policy configuration ownership and version rollout process.
3. Per-country data protection impact assessment.

---

## 17. Scores

| Area | Score / 100 | Notes |
|------|-------------|-------|
| Architecture consistency | 62 | Strong principles; lifecycle/role SSOT and control-plane gaps |
| Business and marketplace rules | 58 | Core flow strong; warranty/accept-pay/subscription contradictions are Critical |
| Product consistency | 66 | Rich journeys; MVP tagging and company bleed unresolved |
| Engineering standards | 80 | Strong handbook; precedence vs Phase 1 docs still fuzzy |
| Data/Firestore design | 52 | Useful base collections; market partition and claim/ledger models missing |
| Security architecture | 55 | Good intent; provider privacy, claims taxonomy, client-write matrix open |
| GCC and multilingual readiness | 54 | Arabic-first intent strong; `countryCode` not in core schemas |
| Operational readiness | 46 | Eventing, finance ops, SLOs, recovery, and support controls not yet designed |

### Overall Score: **59 / 100**

### Readiness Score Before Development: **47 / 100**

**Interpretation:** Proceed only with a tightly scoped **Foundation Design Gate** (not general feature implementation). Do not begin irreversible implementation of payments, provider request feeds, company operations, or real-user onboarding until Critical findings C-01–C-06 and Gate A High items are closed and approved.

---

## 18. Final Review Position

Otlob is a promising and unusually well-articulated marketplace concept. The documents establish a solid vocabulary and a credible desired architecture. The investment risk is not lack of ideas; it is implementing an ambitious marketplace before its financial ledger, privacy-safe matching access, warranty/claim model, accept↔payment sequence, role taxonomy, canonical data model, and operating controls are made explicit.

Specialist deep-dives that strengthened this consolidated position: [architecture/data/security](6bcbe359-3cfa-4440-be7c-e7e8ad74ba2f), [marketplace engines](a4e6314f-8dcc-4c06-8da9-4f5df32a3bce), [product/handbook](dfe68c03-3bd4-4ab8-ad30-0112604e9496).

The recommended next action is a **Phase 2 Foundation Design Gate**, not general feature implementation. Its output should be approved ADRs and canonical contracts for the issues listed in Gate A.
