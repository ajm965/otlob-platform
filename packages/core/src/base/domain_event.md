# DomainEvent

## Status

Phase 2.2 placeholder — **not implemented**.

## Purpose

Generic domain event envelope for aggregate notifications.

## Future API Surface (documentation only)

- `DomainEvent`
- `occurredAt`
- `eventId`
- `aggregateId (optional generic)`

## Constraints

- No feature event payloads in core
- Feature events extend later in modules

## Implementation Gate

Do not add Dart/TypeScript classes, Firebase, HTTP, UI, or feature/business logic until a later phase explicitly authorizes implementation.
