# packages/core

## Purpose

**Single shared foundation package** intended as the common dependency for every backend module and shared package.

Phase 2.2 establishes structure and documentation placeholders only.

## Responsibilities

- Base domain abstractions (`BaseEntity`, `AggregateRoot`, `UniqueId`, `BaseValueObject`, `DomainEvent`)
- Reusable value objects (Money, Email, Phone, Address, Coordinates, GeoPoint, Percentage, DateRange)
- Result / Failure / Exception patterns
- Pagination models
- Cross-cutting ports (logger, clock, uuid, validator, serializer, cache, event bus)
- Generic validators, types, utils, constants, serialization hooks

## Non-Responsibilities

- Firebase / Firestore
- HTTP / REST
- Flutter / UI
- Feature or marketplace business logic
- Module-specific entities (`Booking`, `Offer`, etc.)

## Dependencies

### Current (Phase 2.2)

- None (documentation/skeleton only)

### Future

- Language standard library only for core implementations
- Adapters for ILogger/ICache/etc. live outside this package
- Align money/time/pagination with `docs/` Architecture Review V2 baseline

## Ownership

Platform core library owners (`CODEOWNERS` → packages)

## Layout

```text
packages/core/
├── README.md
├── src/
│   ├── base/
│   ├── entities/
│   ├── value_objects/
│   ├── result/
│   ├── failures/
│   ├── exceptions/
│   ├── events/
│   ├── types/
│   ├── validators/
│   ├── pagination/
│   ├── utils/
│   ├── logging/
│   ├── contracts/
│   ├── interfaces/
│   ├── constants/
│   ├── extensions/
│   └── serialization/
└── test/
```

## Phase Constraint

Phase 2.2 — **no implementation**. Placeholder Markdown files document future API surfaces only.
