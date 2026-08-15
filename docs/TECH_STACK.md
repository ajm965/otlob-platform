# Tech Stack

**Project:** Otlob Platform  
**Document Type:** Technology Selection & Rationale  
**Phase:** 1 — Foundation  
**Status:** Baseline  

---

## 1. Purpose

This document records the approved technology stack for Otlob Platform, the rationale for each choice, alternatives considered, and constraints for future phases.

No implementation is performed in Phase 1.

**Remediation decision:** Technology usage is clarified so Firebase realtime and claims cannot be interpreted as permission to expose raw sensitive documents or encode dynamic authorization, and the selected stack explicitly supports ledger/outbox/reconciliation responsibilities (`C-01`, `C-02`, `C-05`, `H-07`, `H-13`).

---

## 2. Stack Summary

| Layer | Technology | Role |
|-------|------------|------|
| Mobile (future apps) | Flutter / Dart | Technician app (future); Customer app external |
| Admin UI (future) | Flutter Web or approved web stack | Operations console |
| Authentication | Firebase Authentication | Identity, tokens, session |
| Primary database | Cloud Firestore | Transactional marketplace data |
| Object storage | Firebase Storage | Documents and job media |
| Backend compute | Firebase Cloud Functions | REST APIs, workflows, side effects |
| Push notifications | Firebase Cloud Messaging | Device alerts |
| Product analytics | Firebase Analytics | Funnel and engagement |
| Crash reporting | Firebase Crashlytics | Client stability |
| Maps / geo UX | Google Maps Platform | Maps, places, routing aids |
| Source control / CI | GitHub | Code, PRs, Actions |
| Localization | AR-first + EN | Product languages |

---

## 3. Detailed Choices

### 3.1 Flutter / Dart

**Why**

- Single codebase for iOS and Android (Technician app; Admin optionally)
- Strong ecosystem for maps, Firebase, and RTL
- Aligns with marketplace mobile delivery speed without sacrificing structure when Clean Architecture is applied

**Constraints**

- Customer Flutter app is **not** owned by this repository
- No UI code in Phase 1
- Feature-first folders and repository pattern mandatory when apps begin

**Alternatives considered**

| Alternative | Why not selected |
|-------------|------------------|
| Native Kotlin + Swift | Higher dual-platform cost |
| React Native | Team standardization on Flutter preferred |

### 3.2 Firebase Authentication

**Why**

- Managed identity with JWT ID tokens
- Fits Cloud Functions verification model
- Supports phone-centric KSA onboarding patterns

**Planned usage**

- Phone OTP for customers/technicians (preferred market fit)
- Email/password or SSO options for admin/company as needed
- Versioned coarse global-role claims only; company and staff permissions remain in authoritative membership records

### 3.3 Cloud Firestore

**Why**

- Realtime listeners for explicit party-owned projections of offers, booking status, chat, notifications, and match visibility
- Horizontal scale for marketplace document workloads
- Security rules + server Functions for defense in depth

**Constraints**

- Model for query patterns, not purely relational normalization
- Critical writes through Functions
- Composite indexes declared and reviewed
- Raw request, finance, membership, staff, address, and Home Passport documents are not client-direct data sources

### 3.4 Firebase Storage

**Why**

- Integrated auth-aware object storage
- Suitable for KYC docs and job photo evidence

**Constraints**

- Strict content-type and size limits
- Path conventions tied to entity IDs
- Virus/malware scanning strategy in later hardening phase

### 3.5 Firebase Cloud Functions

**Why**

- Co-located with Firebase data plane
- Ideal for REST endpoints and event triggers
- Enforces business invariants server-side

**Language recommendation**

- TypeScript (Node.js runtime) for Functions — strong typing, ecosystem, maintainability

**API style**

- REST over HTTPS only (Phase 1 design)

### 3.6 Firebase Cloud Messaging

**Why**

- Standard push channel for Android/iOS
- Required for nearby-request alerts and booking updates

### 3.7 Firebase Analytics & Crashlytics

**Why**

- Low-friction product telemetry and crash triage
- Supports marketplace funnel instrumentation

### 3.8 Google Maps Platform

**Why**

- Industry-standard maps, geocoding, and distance UX in KSA
- Supports technician proximity and address selection

**Constraints**

- API keys restricted by app/bundle and HTTP referrer
- Server geocoding usage metered and logged

### 3.9 GitHub

**Why**

- Industry-standard collaboration
- PR reviews, branch protection, Actions CI

---

## 4. Supporting Technologies (Planned)

| Concern | Planned approach |
|---------|------------------|
| Payments | KSA-approved PSP adapter; authorization-before-accept and capture-on-completion policy |
| Finance | Immutable double-entry ledger plus settlement/payout/reconciliation adapters |
| Secrets | Firebase/Google Secret Manager |
| CI/CD | GitHub Actions → Firebase deploy |
| Feature flags | Remote Config or equivalent (later) |
| Error tracking (backend) | Cloud Logging + alerting |
| i18n | AR/EN message catalogs; ICU-friendly formatting |

---

## 5. Environment Matrix

| Environment | Firebase project | Purpose |
|-------------|------------------|---------|
| `dev` | `otlob-dev` (name TBD) | Developer experimentation |
| `staging` | `otlob-staging` | QA / UAT |
| `production` | `otlob-prod` | Live marketplace |

Clients must never ship production secrets. Config is environment-injected.

---

## 6. Non-Goals for Stack (Phase 1)

- No custom Kubernetes platform
- No premature multi-region active-active design
- No GraphQL surface (REST only)
- No local SQL as system of record
- No Customer app framework decisions inside this repo beyond shared contracts

---

## 7. Versioning Policy (Technology)

- Pin major versions of Firebase SDKs and Functions runtime in implementation phases
- Document upgrade windows in release notes
- Avoid bleeding-edge unstable APIs in production paths

---

## 8. Decision Log Format

Future ADR (Architecture Decision Record) entries should include:

1. Context
2. Decision
3. Consequences
4. Alternatives rejected

Store ADRs under `docs/adr/` when implementation begins (not required for Phase 1 completion).

---

## 9. Related Documents

- `ARCHITECTURE.md`
- `SECURITY.md`
- `FIRESTORE_STRUCTURE.md`
- `API.md`
- `DEVELOPMENT_GUIDE.md`
- `AUTHORIZATION_AND_DATA_ACCESS.md`
- `FINANCE_AND_SETTLEMENT.md`
- `ASYNC_WORKFLOWS.md`
