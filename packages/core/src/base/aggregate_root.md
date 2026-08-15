# AggregateRoot

## Status

Phase 2.2 placeholder — **not implemented**.

## Purpose

Entity that owns consistency boundaries and domain-event collection.

## Future API Surface (documentation only)

- `AggregateRoot extends BaseEntity`
- `pullDomainEvents()`
- `addDomainEvent(DomainEvent)`

## Constraints

- No feature aggregates here
- Events remain generic DomainEvent only

## Implementation Gate

Do not add Dart/TypeScript classes, Firebase, HTTP, UI, or feature/business logic until a later phase explicitly authorizes implementation.
