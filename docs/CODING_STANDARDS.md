# Coding Standards

**Project:** Otlob Platform  
**Document Type:** Engineering Coding Standards  
**Phase:** 1 — Foundation  
**Status:** Baseline  

---

## 1. Purpose

This document defines coding, documentation, and review standards for Otlob Platform. Phase 1 produces documentation only; these rules govern all future implementation.

**Practice SSOT:** Day-to-day engineering practice lives in `docs/engineering/` (especially `docs/engineering/CODING_STANDARDS.md`). This root document remains a Phase 1 foundation summary and must not contradict the handbook; on conflict, the handbook and ADRs win per `docs/engineering/README.md`.

---

## 2. Universal Principles

1. **Correctness over cleverness**
2. **Server enforces business rules**
3. **Explicit over implicit**
4. **Small, reviewable pull requests**
5. **Arabic-first product thinking** (locale-safe code)
6. **No Customer UI in this repository**
7. SOLID, DRY, KISS — applied pragmatically

---

## 3. Language Standards

### 3.1 TypeScript (Cloud Functions)

| Rule | Detail |
|------|--------|
| Language | TypeScript, strict mode |
| Module system | ES modules or project-standard chosen in Phase 2 |
| `any` | Forbidden except rare escape hatches with comment |
| Nullability | Prefer explicit unions; avoid unchecked assertions |
| Async | `async/await`; no unhandled promise rejections |
| Validation | Schema validation at HTTP boundary (e.g., Zod/Joi) |
| Errors | Typed error codes mapped to HTTP statuses |
| Logging | Structured JSON logs with `requestId` |

### 3.2 Dart / Flutter (Future Technician & Admin only)

| Rule | Detail |
|------|--------|
| Architecture | Clean Architecture + feature-first |
| State management | Choose one approved approach per app and stay consistent |
| UI code | Presentation layer only; no direct Firestore business writes for invariants |
| l10n | AR/EN keys; RTL tested |
| Secrets | No server secrets in clients |
| Customer app | Not developed here |

### 3.3 Security Rules Language

- Keep rules readable with shared functions
- Unit-test rules
- Prefer deny-by-default

---

## 4. API & Contract Standards

1. REST only for public platform APIs
2. Consistent resource naming (plural nouns)
3. Stable error `code` strings in `snake_case`
4. Amounts in halalas (integers)
5. Timestamps in ISO-8601 in JSON responses
6. Idempotency for acceptance and payment endpoints
7. OpenAPI in `shared/contracts` must match implemented behavior

Breaking contract changes require version bump and migration notes.

---

## 5. Domain & Architecture Standards

### 5.1 Layering

- Domain has no Firebase/Flutter imports
- Use cases orchestrate domain + ports
- Infrastructure adapters implement ports
- Controllers/handlers are thin

### 5.2 Feature Modules

- One business capability per module
- No cross-feature deep imports of internals; depend on public application APIs/ports

### 5.3 Repository Pattern

- Repositories return domain models/DTOs agreed by module
- No leaking Firestore `DocumentSnapshot` into domain

### 5.4 Dependency Injection

- Composition root wires dependencies
- Avoid global mutable singletons for domain services

---

## 6. Naming Conventions

| Element | Convention |
|---------|------------|
| Collections | `camelCase` plural |
| JSON fields | `camelCase` |
| Enums/status codes | `snake_case` |
| TypeScript files | `camelCase.ts` or `kebab-case.ts` (pick one in Phase 2 and enforce) |
| Dart files | `snake_case.dart` |
| REST paths | `/kebab-case` resources |
| Branches | see `GIT_WORKFLOW.md` |

Use business language from `BUSINESS_RULES.md` (`offer`, `booking`, `guarantee`) consistently.

---

## 7. Comments & Documentation

- Comment **why**, not what is obvious
- Public APIs documented in `API.md` / OpenAPI
- Complex transactions reference business rule IDs (e.g., `BR-OFF-009`)
- Update docs in the same PR when behavior changes

---

## 8. Testing Standards (Phase 2+)

| Layer | Expectation |
|-------|-------------|
| Domain/use cases | Unit tests for invariants |
| API handlers | Integration tests with emulators |
| Rules | Firebase rules unit tests |
| Payments | Contract tests + webhook signature tests |
| Critical flows | Accept-offer concurrency tests |

No merge of money/accept flows without tests.

---

## 9. Error Handling Standards

1. Map domain errors → stable API error codes
2. Do not return stack traces to clients
3. Log internal details with correlation IDs
4. Distinguish `409 conflict` vs `400 validation` vs `403 forbidden`

---

## 10. Security Coding Standards

1. Validate all inputs at boundary
2. Re-check authz on every privileged operation
3. Never trust client prices/roles/status transitions
4. Redact PII in logs
5. Use allowlists for content types and fields
6. Apply rate limits on abusive endpoints

See `SECURITY.md`.

---

## 11. Performance Standards

1. Design queries with indexes first
2. Paginate all lists
3. Bound arrays and payload sizes
4. Avoid N+1 Firestore reads in handlers (batch/getAll)
5. Keep Functions cold-start conscious (lazy heavy imports where needed)

---

## 12. Localization Standards

1. No hardcoded user-facing Arabic/English in domain persistence enums
2. Notification payloads include AR/EN or key+params
3. Formatting for SAR and dates uses locale utilities
4. Assume RTL in client UX decisions (future apps)

---

## 13. Code Review Checklist

- [ ] Matches approved architecture layers
- [ ] Business rules enforced server-side
- [ ] No Customer UI added
- [ ] Tests for critical paths
- [ ] Docs updated if contracts/rules changed
- [ ] No secrets committed
- [ ] Error codes stable and documented
- [ ] AuthZ ownership checks present

---

## 14. Formatting & Tooling (To be pinned in Phase 2)

| Area | Tooling intent |
|------|----------------|
| TS | ESLint + Prettier |
| Dart | `dart format` + `lints`/`flutter_lints` |
| Commits | Conventional commits |
| CI | Lint, test, typecheck required |

Exact config files arrive with implementation scaffolding.

---

## 15. Forbidden Practices

- MVP shortcuts that bypass booking/payment invariants
- God classes / mega modules
- Copy-paste business rules across apps without shared contracts
- Committing `node_modules`, build artifacts, or `.env` secrets
- Generating random demo screens

---

## 16. Related Documents

- `ARCHITECTURE.md`
- `PROJECT_STRUCTURE.md`
- `GIT_WORKFLOW.md`
- `SECURITY.md`
- `API.md`
- `BUSINESS_RULES.md`
