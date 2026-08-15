# Coding Standards

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Engineering Handbook — Company Coding Standards  
**Phase:** 1.8  
**Audience:** All engineers  
**Status:** Mandatory  

---

## 1. Purpose

Company-level coding standards for Otlob Platform across TypeScript (Cloud Functions), Dart/Flutter (Technician/Admin only in this repo), security rules, and shared contracts.

Customer app code follows the same API/error contracts but lives outside this repository.

---

## 2. Universal Principles

Apply continuously:

- **SOLID**
- **DRY** (without premature abstraction)
- **KISS**
- Clean Architecture dependency rule
- Repository Pattern for persistence ports
- Explicit Dependency Injection
- Server-side enforcement of business invariants

See also `ENGINEERING_PRINCIPLES.md`.

---

## 3. Naming Conventions

### 3.1 General

| Element | Convention | Example |
|---------|------------|---------|
| Collections (Firestore) | `camelCase` plural; physical registry chooses exact name | Canonical v1 registry name `requests`; `serviceRequests` is a descriptive alias/example only |
| JSON / API fields | `camelCase` | `createdAt` |
| Enum / status codes | `snake_case` strings | `in_progress` |
| Error codes | `snake_case` | `offer_already_accepted` |
| REST paths | kebab-case resources | `/home-profiles` |
| Feature modules | `snake_case` or `kebab-case` (one standard per runtime) | `offers` |
| Branches | see `GIT_WORKFLOW.md` | `feature/OTL-123-accept-offer` |

### 3.2 Folder Naming

| Runtime | Folder names |
|---------|--------------|
| Backend TS | `kebab-case` or `camelCase` — **pick one in Phase 2 scaffolding and do not mix** (recommended: `kebab-case` for folders) |
| Dart packages/folders | `snake_case` |
| Docs | `SCREAMING_SNAKE` or clear `Title` markdown names as established |

Module root folders match feature names: `offers`, `bookings`, `payments`.

### 3.3 File Naming

| Language | Convention | Example |
|----------|------------|---------|
| TypeScript | `kebab-case.ts` (recommended) or `camelCase.ts` — single choice enforced by lint | `accept-offer.use-case.ts` |
| Dart | `snake_case.dart` | `accept_offer.dart` |
| Tests | `*.test.ts` / `*_test.dart` | `accept-offer.use-case.test.ts` |
| OpenAPI | `openapi.yaml` / versioned files | `openapi-v1.yaml` |

### 3.4 Variable Naming

- `camelCase` for locals and fields
- Boolean prefixes: `is`, `has`, `can`, `should` (`isActive`, `hasWarranty`)
- Avoid 1–2 character names except loop indices in tiny scopes
- Money variables include unit: `amountHalalas` (never ambiguous `amount`)

### 3.5 Method / Function Naming

- Verbs or verb phrases: `acceptOffer`, `calculateCommission`
- Pure predicates: `isEligibleProvider`
- Factories: `createOfferFromRequest`
- Do not encode layer in every name (`handleXController` only at edges)

### 3.6 Class / Type Naming

| Kind | Convention | Example |
|------|------------|---------|
| Class | `PascalCase` | `OfferRepository` |
| Interface / port | `PascalCase` noun; optional `Port` suffix | `OfferRepository`, `PaymentGatewayPort` |
| DTO | `PascalCase` + `Dto` / `Request` / `Response` | `CreateOfferRequest` |
| Enum type | `PascalCase` | `OfferStatus` |
| Exception / error class | `PascalCase` + `Error` | `OfferNotAcceptableError` |
| Use case | verb + noun | `AcceptOffer` / `AcceptOfferUseCase` |

### 3.7 Constants

- `UPPER_SNAKE_CASE` for true constants
- Prefer typed config objects over scattered magic numbers
- Limits and TTLs named with units: `OFFER_TTL_MINUTES`

### 3.8 Enums

- Persist as stable string codes (`snake_case`)
- Never persist localized labels
- Centralize shared enums in `shared/constants` when cross-surface

---

## 4. Comments

| Do | Do not |
|----|--------|
| Explain **why** and trade-offs | Narrate obvious code |
| Reference rule IDs (`BR-OFF-009`) | Leave stale TODOs without tickets |
| Document public ports/APIs | Comment out dead code—delete it |

`TODO` / `FIXME` must include owner and ticket ID.

---

## 5. Documentation in Code

- Public modules: brief module README when non-obvious
- Complex transactions: link to engine doc section
- OpenAPI is source of HTTP contract truth once introduced
- Keep ADR references when implementing a decision

---

## 6. Formatting

| Area | Standard |
|------|----------|
| TypeScript | Prettier + ESLint (pinned in Phase 2) |
| Dart | `dart format` + official lints |
| Markdown | Consistent headings; wrap reasonably |
| No style debates in PR | Fix via tooling |

CI enforces format; unformatted PRs fail.

---

## 7. Error Handling

- Map domain failures to stable API error codes
- Never swallow errors silently
- Distinguish validation vs conflict vs authz vs unexpected
- See `ERROR_HANDLING_GUIDE.md`

---

## 8. Logging

- Structured logs with `requestId`, module, action
- Levels per `LOGGING_GUIDE.md`
- No secrets, tokens, or raw PII

---

## 9. Dependency Injection

| Rule | Detail |
|------|--------|
| Composition root | Wire dependencies at bootstrap only |
| Constructors | Prefer constructor injection |
| Domain | Never imports DI containers |
| Testing | Substitute fakes at ports |
| Forbidden | Service locator sprawl in domain/use cases |

---

## 10. Repository Pattern

| Rule | Detail |
|------|--------|
| Port in domain/application | Interface defines persistence needs |
| Adapter in infrastructure | Firestore/Storage/PSP implementations |
| Return types | Domain models or agreed DTOs—not raw SDK snapshots in domain |
| Queries | Named methods reflecting use cases (`listSubmittedByRequest`) |
| Transactions | Coordinated in application/use-case layer via Unit of Work/ports |

---

## 11. Clean Architecture Rules

1. Dependencies point inward
2. Domain has zero Flutter/Firebase/HTTP framework imports
3. Use cases orchestrate domain + ports
4. Controllers/handlers are thin: validate → authorize → execute → map response
5. Presentation (future apps) depends on application APIs/contracts, not infrastructure

---

## 12. SOLID

| Principle | Application |
|-----------|-------------|
| S | One reason to change per class/module |
| O | Extend via new handlers/strategies, not giant switches when growing |
| L | Substitutable repository/gateway implementations |
| I | Small ports over god interfaces |
| D | Depend on abstractions at boundaries |

---

## 13. DRY

- Share contracts/constants, not random utilities
- Duplicate three times only if abstraction is unclear—then extract carefully
- Do not DRY across layers by leaking infrastructure types upward

---

## 14. KISS

- Prefer straightforward use cases over speculative frameworks
- No microservices until module boundaries and load demand them
- No “clever” one-liners that obscure money/auth logic

---

## 15. Language-Specific Notes

### TypeScript

- `strict` mode required
- Avoid `any`; prefer `unknown` + narrowing
- Explicit return types on exported functions encouraged
- Async errors must not become unhandled rejections

### Dart (Technician/Admin only here)

- Feature-first folders
- Presentation contains no marketplace invariant enforcement that belongs on server
- l10n keys for AR/EN

---

## 16. Forbidden Practices

- God modules mixing payments + chat + matching
- Magic numbers for fees/TTLs
- Client-trusted prices/roles
- Customer UI contributions in this repo
- Committing `node_modules`, secrets, production exports

---

## 17. Related Documents

- `MODULE_TEMPLATE.md`
- `ERROR_HANDLING_GUIDE.md`
- `LOGGING_GUIDE.md`
- `TESTING_GUIDE.md`
- `API_STANDARDS.md`
- `ENGINEERING_GUIDE.md`
