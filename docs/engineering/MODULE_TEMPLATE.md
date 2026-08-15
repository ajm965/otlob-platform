# Module Template

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Engineering Handbook — Official Module Template  
**Phase:** 1.8  
**Status:** Mandatory for all new modules  

---

## 1. Purpose

This is the **official template** every future module must follow. Consistency enables a 20+ engineer team to navigate, review, and test predictably.

Applies to backend feature modules and, when apps exist, to Flutter feature modules (Technician/Admin only in this repo).

---

## 2. Backend Module Skeleton (TypeScript / Functions)

```text
modules/<feature>/
├── README.md                 # Module purpose, owners, links to engines
├── domain/
│   ├── entities/
│   ├── value-objects/        # optional
│   ├── repositories/         # ports (interfaces only)
│   ├── services/             # pure domain services (optional)
│   ├── errors/
│   └── events/               # domain events (optional)
├── application/
│   ├── use-cases/
│   ├── dto/
│   ├── validators/
│   ├── mappers/              # DTO ↔ domain (optional)
│   └── ports/                # additional ports (notify, clock, id)
├── infrastructure/
│   ├── persistence/          # Firestore repository adapters
│   ├── messaging/            # FCM/queue adapters (if owned here)
│   ├── external/             # PSP/maps/etc. adapters
│   └── config/
├── api/                      # HTTP handlers / route registration
│   ├── routes/
│   ├── controllers/          # or handlers/
│   └── presenters/           # response mapping (optional)
└── tests/
    ├── unit/
    ├── integration/
    └── fixtures/
```

**Note:** Backend modules do **not** include a Flutter `presentation` UI layer. For backend, `api/` is the delivery/presentation adapter.

---

## 3. Flutter Feature Module Skeleton (Future Technician/Admin)

```text
features/<feature>/
├── domain/
│   ├── entities/
│   ├── repositories/         # ports
│   ├── errors/
│   └── use_cases/            # if client-side orchestration needed
├── application/              # optional orchestration / DTO
│   ├── dto/
│   └── validators/
├── data/                     # infrastructure equivalent
│   ├── repositories/         # implementations
│   ├── datasources/
│   └── dto/
├── presentation/
│   ├── pages/                # NOT for Customer app in this repo
│   ├── widgets/
│   ├── blocs_or_controllers/
│   └── view_models/
└── tests/
```

Customer UI must not be added under this repository’s Flutter trees.

---

## 4. Required Building Blocks

Every module must include the following concepts (names may match template folders).

### 4.1 Domain

| Element | Responsibility |
|---------|----------------|
| Entities | Core business objects with identity |
| Domain rules | Invariants expressed in entities/services |
| Repository ports | Abstract persistence |
| Domain errors | Typed business failures |
| Events (optional) | Significant state changes |

Domain must not import Firebase, Flutter, Express, or HTTP frameworks.

### 4.2 Application

| Element | Responsibility |
|---------|----------------|
| UseCases | One primary action per use case class/function |
| DTOs | Input/output shapes at application boundary |
| Validators | Input validation before domain execution |
| Authorization hooks | “Can this actor run this use case?” |
| Transaction orchestration | Multi-document consistency |

### 4.3 Infrastructure

| Element | Responsibility |
|---------|----------------|
| Repository implementations | Firestore/Storage/etc. |
| External gateways | PSP, SMS, email providers |
| Mappers | Persistence records ↔ domain |

### 4.4 Presentation / API

| Backend | Flutter (future) |
|---------|------------------|
| HTTP route + handler | Pages/widgets/controllers |
| Auth middleware | Session/token wiring |
| Response mapping | View rendering |

### 4.5 Repositories

- Interface in domain/application ports
- Implementation in infrastructure/data
- Method names reflect domain language

### 4.6 UseCases

Naming: `AcceptOffer`, `SubmitOffer`, `CreateRequest`

Each use case:

1. Validate input  
2. Authorize actor  
3. Load aggregates  
4. Execute domain logic  
5. Persist via ports  
6. Emit side effects (notify) via ports  
7. Return DTO/result  

### 4.7 Entities

- Identity + lifecycle fields as needed
- Protect invariants (e.g., cannot accept expired offer)
- Prefer small focused entities over anemic bags of fields when behavior exists

### 4.8 DTOs

- `CreateXRequest`, `XResponse`, list item DTOs
- No domain persistence annotations
- Explicit nullability

### 4.9 Validators

- Schema validation at API edge
- Domain validation for invariants
- Stable validation error codes

### 4.10 Errors

| Type | Example |
|------|---------|
| Validation | `validation_failed` |
| Business | `offer_already_accepted` |
| AuthZ | `forbidden` |
| Not found | `offer_not_found` |
| Unexpected | mapped to `internal_error` at edge |

See `ERROR_HANDLING_GUIDE.md`.

### 4.11 Tests

Required categories per `TESTING_GUIDE.md`:

- Unit: domain + use cases  
- Integration: repository + API  
- Fixtures/factories for entities  

---

## 5. Module README Template

Every module `README.md` must include:

```markdown
# <Module Name>

## Purpose
## Owner / Backup
## Related engines / business rules
## Public use cases
## Public API routes (if any)
## Data ownership (collections)
## Non-goals
## Test how
```

---

## 6. Creating a New Module — Checklist

- [ ] Name approved; no overlap with existing module
- [ ] Owner assigned
- [ ] Folders created per template
- [ ] Ports defined before adapters
- [ ] Engine/business rule links added
- [ ] API/OpenAPI updated if external surface changes
- [ ] Tests scaffolded
- [ ] CODEOWNERS entry updated (when adopted)

---

## 7. Cross-Cutting Code

Do **not** put feature logic in `shared/` unless truly cross-cutting:

- Auth middleware
- Logging helpers
- Money/time utilities
- Error mapping
- Idempotency primitives

Feature rules stay in feature modules.

---

## 8. Anti-Patterns

- `helpers.ts` dumping ground
- Use case calling another module’s infrastructure directly
- Entity depending on Firestore types
- Presentation widgets calling Firestore for invariants
- Module without tests or README

---

## 9. Related Documents

- `CODING_STANDARDS.md`
- `ENGINEERING_GUIDE.md`
- `TESTING_GUIDE.md`
- `ARCHITECTURE_DECISIONS.md` (ADR-004, ADR-005, ADR-006, ADR-009)
