# Architecture Decision Records (ADR)

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Engineering Handbook — ADR Log  
**Phase:** 1.8  
**Status:** Accepted baseline set  

---

## How to Use ADRs

Each ADR captures a significant, lasting technical decision:

1. Context  
2. Decision  
3. Consequences  
4. Alternatives considered  

New ADRs should be appended (ADR-011+) as numbered records. Do not silently rewrite accepted ADRs; supersede with a new ADR if needed.

---

## ADR-001 — Why Flutter

**Status:** Accepted  
**Date:** 2026-08-13  

### Context

Otlob needs high-quality iOS and Android apps for providers (and potentially Admin), with RTL Arabic-first UX, maps, and Firebase integration. A separate team builds the Customer app; this platform still standardizes on a mobile technology for Technician/Admin.

### Decision

Use **Flutter / Dart** for Technician and Admin client applications owned by this organization.

### Consequences

- Single UI codebase for mobile (and optional web for Admin)
- Strong RTL and Firebase plugin ecosystem
- Requires Clean Architecture discipline to avoid UI-centric business logic
- Customer app may also use Flutter externally, but is not implemented in this repo

### Alternatives considered

| Alternative | Why not |
|-------------|---------|
| Native Kotlin + Swift | Higher dual-platform cost |
| React Native | Team standardization preference for Flutter |

---

## ADR-002 — Why Firebase

**Status:** Accepted  
**Date:** 2026-08-13  

### Context

The platform needs managed auth, realtime data, file storage, push, serverless compute, analytics, and crash reporting with fast iteration toward GCC scale, without initially operating custom Kubernetes.

### Decision

Adopt **Firebase** as the primary application platform: Authentication, Firestore, Storage, Cloud Functions, FCM, Analytics, Crashlytics.

### Consequences

- Faster delivery of marketplace MVP→scale path
- Vendor coupling mitigated via ports/adapters
- Cost and quota monitoring mandatory at scale
- Security rules + Functions required for invariant enforcement

### Alternatives considered

| Alternative | Why not (initially) |
|-------------|---------------------|
| Custom Node on GKE/ECS + Postgres | Higher ops burden early |
| Supabase / Appwrite | Weaker fit to chosen mobile+Google ecosystem preference |

---

## ADR-003 — Why Firestore

**Status:** Accepted  
**Date:** 2026-08-13  

### Context

Marketplace workloads need realtime offer/booking updates, flexible documents, horizontal scale, and mobile-friendly sync patterns.

### Decision

Use **Cloud Firestore** as the system of record for transactional marketplace data.

### Consequences

- Model for queries; controlled denormalization
- Composite indexes must be designed deliberately
- Multi-document transactions for exclusivity flows
- Not a relational warehouse—analytics may export later

### Alternatives considered

| Alternative | Why not (initially) |
|-------------|---------------------|
| Cloud SQL Postgres | Better relational joins; slower mobile realtime story |
| Realtime Database | Less flexible querying for marketplace lists |

---

## ADR-004 — Why Repository Pattern

**Status:** Accepted  
**Date:** 2026-08-13  

### Context

Domain logic must remain testable and independent from Firestore SDK details as the team grows.

### Decision

All persistence access from application/domain goes through **repository ports**; Firestore implementations live in infrastructure adapters.

### Consequences

- Use cases unit-testable with fakes
- Easier to swap storage or add caching
- Slightly more boilerplate—accepted for enterprise clarity

### Alternatives considered

| Alternative | Why not |
|-------------|---------|
| SDK calls inside use cases | Tight coupling, poor tests |
| Active Record style | Encourages framework leak into domain |

---

## ADR-005 — Why Clean Architecture

**Status:** Accepted  
**Date:** 2026-08-13  

### Context

Twenty-plus engineers will touch payments, matching, disputes, and apps. Without dependency rules, Firebase/UI concerns will invade core marketplace logic.

### Decision

Adopt **Clean Architecture**: Domain ← Application ← Infrastructure/API/Presentation adapters.

### Consequences

- Clear test and ownership boundaries
- Onboarding consistency via module template
- Reviews can enforce dependency direction
- Overhead for small scripts—those stay outside domain modules

### Alternatives considered

| Alternative | Why not |
|-------------|---------|
| MVC-only / framework-centric | Doesn’t protect domain at this scale |
| Unstructured folders | Fails multi-team concurrency |

---

## ADR-006 — Why Feature-first

**Status:** Accepted  
**Date:** 2026-08-13  

### Context

Horizontal layers alone (`controllers/`, `models/`) create ownership ambiguity across offers, payments, and companies.

### Decision

Organize code **feature-first** (vertical modules: `offers`, `bookings`, `payments`, …) each containing Clean Architecture layers.

### Consequences

- Module owners map cleanly to directories
- Cross-feature coupling becomes visible
- Shared kernel kept intentionally small

### Alternatives considered

| Alternative | Why not |
|-------------|---------|
| Layer-only structure | Ownership and PR conflicts |
| Microservice-per-feature immediately | Premature distributed complexity |

---

## ADR-007 — Why Marketplace

**Status:** Accepted  
**Date:** 2026-08-13  

### Context

Home services in KSA/GCC suffer from trust, price opacity, and coordination friction. Otlob’s commercial model is competitive offers for customer requests—not a single assigned contractor dispatch only.

### Decision

Build a **two-sided marketplace**: customers create requests; nearby technicians/companies submit offers; customers compare and accept; platform orchestrates booking, payment, warranty, disputes.

### Consequences

- Requires Matching, Offers, Pricing, Ranking, Trust engines
- More complex than simple booking catalog
- Network effects and subscription monetization fit naturally
- Strong need for fairness, fraud controls, and explainability

### Alternatives considered

| Alternative | Why not |
|-------------|---------|
| Directory-only listings | Weak transaction quality control |
| Platform-assigned jobs only | Less price discovery; different product |

---

## ADR-008 — Why REST API

**Status:** Accepted  
**Date:** 2026-08-13  

### Context

Multiple clients (external Customer app, future Technician/Admin) need a stable, cacheable, widely understood contract. Team expertise and tooling favor REST/OpenAPI.

### Decision

Expose platform APIs as **versioned REST/JSON** over HTTPS. No GraphQL as the primary public API.

### Consequences

- Clear resource models and status codes
- OpenAPI contract sharing with Customer team
- Some over/under-fetching accepted; optimize with tailored DTOs
- Realtime needs may still use Firestore listeners where rules allow reads

### Alternatives considered

| Alternative | Why not (primary) |
|-------------|-------------------|
| GraphQL | Extra complexity for multi-team contract governance now |
| gRPC only | Weaker browser/mobile universality for all clients |

---

## ADR-009 — Why Modular Backend

**Status:** Accepted  
**Date:** 2026-08-13  

### Context

Cloud Functions can become a monolith folder of unrelated handlers. Marketplace domains evolve at different speeds (payments vs catalog).

### Decision

Implement a **modular backend**: feature modules with domain/application/infrastructure/api, deployed as a cohesive Functions codebase initially (modulith), with clear boundaries for future extraction.

### Consequences

- Scales team ownership without premature microservices
- Shared tooling/CI remain simple
- Extraction possible later per module if load/ownership demands

### Alternatives considered

| Alternative | Why not now |
|-------------|-------------|
| Many microservices day one | Ops and distributed transaction cost |
| Single flat `functions/` dump | Unmaintainable at 20+ engineers |

---

## ADR-010 — Why Home Passport

**Status:** Accepted  
**Date:** 2026-08-13  

### Context

Repeat home services improve when technicians understand property assets (AC units, heaters, electrical/plumbing systems) and history. Customers benefit from maintenance memory and warranty tracking.

### Decision

Invest in **Home Passport** as a first-class domain: digital home profiles, rooms, devices/systems, maintenance history, warranty links, invoices, and upcoming maintenance—feeding pricing confidence and future AI recommendations.

### Consequences

- Additional data model and privacy controls
- Differentiation vs generic job marketplaces
- Must not block core request→offer→booking if passport incomplete
- Strong privacy: owner-scoped by default

### Alternatives considered

| Alternative | Why not |
|-------------|---------|
| Ad-hoc notes on requests only | No longitudinal value |
| Delay entirely to Phase 7 | Harder to backfill history later |

---

## Related Documents

- `ENGINEERING_PRINCIPLES.md`
- `MODULE_TEMPLATE.md`
- `docs/ARCHITECTURE.md`
- `docs/engines/HOME_PASSPORT_ENGINE.md`
- `docs/TECH_STACK.md`
