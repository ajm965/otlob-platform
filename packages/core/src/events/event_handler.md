# EventHandler (future)

## Status

Phase 2.2 placeholder — **not implemented**.

## Purpose

Generic handler contract placeholder for domain/integration events.

## Future API Surface (documentation only)

- `EventHandler<T extends DomainEvent>`
- `handle(event)`

## Constraints

- No message bus implementation
- No Firebase Pub/Sub

## Implementation Gate

Do not add Dart/TypeScript classes, Firebase, HTTP, UI, or feature/business logic until a later phase explicitly authorizes implementation.
