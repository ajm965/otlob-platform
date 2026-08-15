# Architecture

**Project:** Otlob Platform  
**Document Type:** System Architecture Specification  
**Phase:** 1 — Foundation  
**Status:** Approved for documentation baseline  

---

## 1. Purpose

This document defines the enterprise architecture for Otlob Platform: a Saudi Arabia home-services marketplace connecting customers with nearby technicians and companies.

It establishes:

- System context and boundaries
- Clean Architecture layering
- Feature-first modularization
- Cross-cutting concerns
- Data and event flows
- Multi-app strategy
- Scalability and reliability targets

This is a design document only. No runtime code is specified for Phase 1.

**Remediation decision:** The architecture now names finance, privacy-safe access projections, market partitioning, lifecycle precedence, and durable asynchronous work as foundational controls because the prior baseline implied these capabilities without assigning authority. This is additive and preserves the modular-monolith and server-mutation decisions (`C-01`, `C-02`, `C-06`, `H-07`, `H-09`, `H-13`).

---

## 2. System Context

### 2.1 Actors

| Actor | Description |
|-------|-------------|
| Customer | Requests home services, compares offers, books, pays, reviews |
| Technician | Individual service provider who bids and executes jobs |
| Company Admin | Manages company profile, technicians, and company offers |
| Platform Admin | Moderates users, disputes, payouts, and catalog |
| Payment Provider | External PSP for authorization, capture, refunds |
| Maps Provider | Google Maps for geocoding, distance, and location UX |
| Notification Channels | FCM push, optional SMS/email gateways |

### 2.2 System Boundary

```text
┌─────────────────────────────────────────────────────────────────┐
│                        Otlob Platform                           │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Customer App │  │Technician App│  │ Admin Panel  │           │
│  │ (external)   │  │  (future)    │  │  (future)    │           │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘           │
│         │                 │                 │                   │
│         └────────────┬────┴─────────────────┘                   │
│                      ▼                                          │
│         ┌────────────────────────────┐                          │
│         │   API Gateway / Functions  │                          │
│         │   (REST, Auth, Validation) │                          │
│         └────────────┬───────────────┘                          │
│                      ▼                                          │
│         ┌────────────────────────────┐                          │
│         │ Domain Services / Use Cases│                          │
│         └────────────┬───────────────┘                          │
│                      ▼                                          │
│    ┌───────────┬───────────┬────────────┬───────────┐           │
│    │ Firestore │  Storage  │    FCM     │ Analytics │           │
│    └───────────┴───────────┴────────────┴───────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Explicit Non-Ownership

- The **Customer Flutter application** is built by another developer/team.
- This repository must not contain Customer UI, screens, or widgets.
- Technician and Admin clients are planned but not implemented in Phase 1.

---

## 3. Architectural Style

### 3.1 Guiding Principles

| Principle | Application |
|-----------|-------------|
| Clean Architecture | Domain independent of frameworks; UI and Firebase are adapters |
| Feature-first | Vertical modules by business capability (requests, offers, bookings…) |
| Repository Pattern | Domain depends on abstract repositories; adapters implement them |
| Dependency Injection | Explicit composition roots; no service locators in domain |
| SOLID | Single responsibility modules; open for extension via ports |
| DRY | Shared contracts in `shared/`; no duplicated domain rules |
| KISS | Prefer simple, explicit flows over premature abstraction |

### 3.2 Clean Architecture Layers

```text
┌──────────────────────────────────────────────┐
│ Presentation (apps — future / external)      │  Flutter UI, Admin UI
├──────────────────────────────────────────────┤
│ Application / Use Cases                      │  Orchestration, DTOs
├──────────────────────────────────────────────┤
│ Domain                                       │  Entities, Rules, Ports
├──────────────────────────────────────────────┤
│ Infrastructure                               │  Firestore, Storage, FCM,
│                                              │  Payments, Maps adapters
└──────────────────────────────────────────────┘
```

**Dependency rule:** Outer layers may depend on inner layers. Domain never depends on Firebase, Flutter, or HTTP frameworks.

### 3.3 Feature-First Modules

Each feature owns its use cases, domain models, repository ports, and (later) adapters.

Recommended feature modules:

| Module | Responsibility |
|--------|----------------|
| `identity` | Auth, profiles, roles |
| `catalog` | Categories, services |
| `geo` | Addresses, proximity, service areas |
| `requests` | Service request lifecycle |
| `offers` | Bidding / quoting |
| `bookings` | Accepted work orders |
| `payments` | Customer authorization, capture, refunds |
| `finance` | Immutable ledger, earnings, settlement, payout, reconciliation |
| `subscriptions` | Technician/company plans |
| `jobs` | Work execution, before/after media |
| `guarantees` | Warranties |
| `reviews` | Ratings and reviews |
| `disputes` | Conflict resolution |
| `messaging` | Chats and messages |
| `notifications` | In-app and push |
| `companies` | Company org and technicians |
| `home_profiles` | Homes, assets, maintenance history |
| `admin` | Moderation and ops tools |

Cross-cutting modules: `shared_kernel`, `security`, `observability`, `localization`.

---

## 4. Backend Architecture

### 4.1 API Style

- **REST only** for client–server contracts in Phase 1 design.
- Firebase Auth ID tokens for authentication.
- Cloud Functions (HTTPS) as the primary API surface.
- Firestore may be used for realtime reads only through explicitly approved party-owned projections; **all mutations that enforce business invariants must go through Functions**.

The capability-level decision is in `AUTHORIZATION_AND_DATA_ACCESS.md`: providers never read raw unaccepted requests; finance, membership, staff, address, and Home Passport access is Functions-only. Direct writes are exceptional, field-allowlisted projection operations, not domain mutations.

### 4.2 Recommended Request Path

```text
Client
  → HTTPS REST endpoint (Cloud Function)
  → Auth middleware (verify Firebase ID token)
  → Authorization (role + resource ownership)
  → Input validation
  → Use case
  → Domain rules
  → Repository / Unit of Work
  → Firestore / Storage / external APIs
  → Side effects (notifications, analytics)
  → Response DTO
```

### 4.3 Why Server-Side Mutation Gate

Marketplace invariants (offer acceptance exclusivity, payment state, warranty issuance) cannot be safely enforced by client-only Firestore writes. Treat Functions as the source of truth for transactional workflows.

---

## 5. Data Architecture

### 5.1 Primary Store

**Cloud Firestore** is the system of record for transactional marketplace data.

Design principles:

1. Document models optimized for read patterns
2. Controlled denormalization for lists and dashboards
3. Subcollections for high-cardinality child data (messages, history)
4. Idempotent writes for payments and offer acceptance
5. Soft deletes where auditability is required
6. Explicit versioning fields on mutable domain documents
7. Required `countryCode` and `marketId` partition on marketplace records and queries
8. Immutable ledgers/events for financial and audit authority

### 5.2 File Store

**Firebase Storage** for:

- Technician documents (licenses, IDs)
- Job before/after images
- Dispute evidence
- Profile avatars (optional)

Paths must be role-scoped and validated by Storage rules + server metadata.

### 5.3 Search & Geo

Near-term: Firestore geo queries / geohash strategy for nearby technicians.  
Later: dedicated search index if catalog/request volume requires it.

### 5.4 Analytics

Firebase Analytics + Crashlytics support product and client health. Analytics events use a governed taxonomy, privacy classification, market partition, named metric owner, and retention class. Warehouse/export remains a Phase 2 design choice; transactional collections are not an analytics warehouse.

**KSA v1 analytics ownership:** Product owns funnel definitions; Engineering owns event schema/versioning in `shared/contracts` (or equivalent); Security/Compliance own PII classification; each engine owns domain event emission for its transitions via `ASYNC_WORKFLOWS.md`. A Phase 2 ADR selects warehouse/export technology. Until then, implementation may emit the governed client/server events only—no ad-hoc parallel taxonomies.

---

## 6. Domain Lifecycle Overview

```text
RequestDraft → RequestOpen → OffersReceived → OfferAccepted
  → BookingConfirmed → PaymentAuthorized/Captured
  → JobInProgress → JobCompleted → WarrantyActive
  → ReviewSubmitted → Closed

Alternate paths: Cancelled, Expired, Refunded.
Dispute is an independent overlay that may lock payout/completion transitions without replacing booking status.
```

Full rules: `BUSINESS_RULES.md`.  
Persistence shapes: `FIRESTORE_STRUCTURE.md`.  
HTTP contracts: `API.md`.

**Lifecycle authority:** engine documents own domain transition semantics; `DATABASE.md` and `FIRESTORE_STRUCTURE.md` reconcile canonical persisted/public enums; product state machines are UX projections. Internal operation states such as `accepting` or matching wave states never become public lifecycle values unless explicitly added to the canonical registry. Compatibility aliases are documented in the physical model.

---

## 7. Multi-App Strategy

| Client | Owner | Phase |
|--------|-------|-------|
| Customer App | Separate developer | External — consume APIs/contracts only |
| Technician App | Platform team (future) | After backend core |
| Admin Panel | Platform team (future) | After backend core |
| Shared packages | Platform team | Contracts, types, i18n keys |

**Shared contract principle:** Apps depend on versioned API contracts and shared type definitions, not on each other’s codebases.

---

## 8. Localization & RTL Architecture

- Arabic is primary; English is secondary.
- All user-facing strings are keyed (`ar`, `en`).
- Dates, currency (SAR), and numbers follow KSA locale conventions.
- Domain documents store language-neutral enums; localized labels live in catalog/i18n layers.
- RTL is a client concern, but APIs must not assume LTR layouts or English-only content.

---

## 9. Security Architecture (Summary)

| Concern | Approach |
|---------|----------|
| Authentication | Firebase Auth (phone/email as decided per role) |
| Authorization | Coarse global claims + authoritative staff/company memberships + resource ownership |
| Data access | Least privilege Firestore/Storage rules |
| Secrets | Environment config / Secret Manager — never in clients |
| Audit | Immutable privileged, access, lifecycle, and financial audit events |

Details: `SECURITY.md`.

---

## 10. Scalability & Reliability

### 10.1 Scalability Targets (Design Intent)

| Area | Approach |
|------|----------|
| Read-heavy lists | Denormalized summary docs + indexes |
| Write contention | Avoid hot documents; shard counters if needed |
| Offer storms | Cap offers per request; rate-limit submissions |
| Chat volume | Messages as subcollections; paginated queries |
| Media | Storage + CDN-backed delivery; size/type limits |
| Notifications | Fan-out via Functions; prefer topic/device tokens |

### 10.2 Reliability

- Idempotency keys for payment and offer-accept operations
- Retry with backoff for external PSP calls
- Dead-letter handling for failed async jobs
- Explicit timeout and cancellation policies for open requests
- Durable transactional outbox, idempotent consumers, dead-letter ownership, replay controls, and reconciliation per `ASYNC_WORKFLOWS.md`

### 10.3 Observability

- Structured logs per request ID
- Crashlytics for clients
- Analytics events for funnel stages (request → offer → book → complete → review)

---

## 11. Integration Architecture

| Integration | Purpose | Coupling |
|-------------|---------|----------|
| Firebase Auth | Identity | Strong |
| Firestore | Persistence | Strong |
| Storage | Media/docs | Strong |
| FCM | Push | Strong |
| Google Maps | Geo UX | Client + limited server geocoding |
| Payment PSP | Money movement | Adapter behind payment port |
| Payout/KYC provider | Beneficiary verification and disbursement | Adapter behind Finance ports |
| SMS OTP (optional) | Auth verification | Adapter |

All third-party SDKs sit behind ports so providers can be swapped without rewriting domain logic.

---

## 12. Deployment Architecture (Planned)

```text
GitHub → CI checks → Deploy Functions/Rules to Firebase project
                 → Promote staging → production
```

Environments: `dev`, `staging`, `production`.  
Release process: `GIT_WORKFLOW.md`.

---

## 13. Quality Attributes

| Attribute | Requirement |
|-----------|-------------|
| Maintainability | Feature modules + clear layering |
| Testability | Domain/use cases pure and unit-testable |
| Security | Server-enforced invariants |
| Performance | Indexed queries; avoid N+1 client patterns |
| Availability | Stateless Functions; managed Firebase services |
| Auditability | Soft deletes + event history for critical entities |
| Extensibility | New services/categories without schema rewrites |

---

## 14. Anti-Patterns (Forbidden)

- Putting business rules only in Flutter clients
- Customer UI inside this repository
- Unbounded client writes to sensitive collections
- God modules that mix requests, payments, and chat
- Premature microservices before module boundaries are stable
- Hard-coded English-only domain labels in persistence
- Sharing Admin privileges via client-only flags
- Deriving provider visibility from dynamic rule evaluation or exposing raw request documents
- Computing earnings/balances from mutable payment or booking records
- Cross-market queries without an explicit authorized market scope

---

## 15. Phase Alignment

| Phase | Architecture focus |
|-------|--------------------|
| 1 | Documentation, boundaries, contracts (this phase) |
| 2 | Backend skeleton, Auth, rules, core schemas |
| 3 | Request/Offer/Booking domain implementation |
| 4 | Payments, jobs, warranties, reviews |
| 5 | Technician app + Admin panel |
| 6 | Hardening, scale, compliance, ops maturity |

---

## 16. Related Documents

- `TECH_STACK.md`
- `DATABASE.md`
- `FIRESTORE_STRUCTURE.md`
- `API.md`
- `BUSINESS_RULES.md`
- `SECURITY.md`
- `PROJECT_STRUCTURE.md`
- `ROADMAP.md`
- `FINANCE_AND_SETTLEMENT.md`
- `AUTHORIZATION_AND_DATA_ACCESS.md`
- `ASYNC_WORKFLOWS.md`
- `COMPLIANCE_AND_RETENTION.md`
- `LIFECYCLE_RECONCILIATION.md`
- `SCHEDULING.md`

---

## 17. Approval

Phase 1 architecture is the baseline for all subsequent implementation. Any change to layering, ownership boundaries, or mutation strategy requires architecture review.

The Phase 2 entry gate also requires approved canonical finance, authorization/access, async workflow, compliance/retention, data-model, lifecycle, and API contracts referenced below. Real-money beta additionally requires operational finance reconciliation and KSA legal/compliance sign-off.
