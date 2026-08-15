# ValidationFailure

## Status

Phase 2.2 placeholder — **not implemented**.

## Purpose

Common cross-module failure type: ValidationFailure.

## Future API Surface (documentation only)

- `ValidationFailure`
- `code`
- `message`
- `details (optional)`

## Constraints

- No feature-specific failure subclasses in core
- Map to HTTP later in presentation layers, not here

## Implementation Gate

Do not add Dart/TypeScript classes, Firebase, HTTP, UI, or feature/business logic until a later phase explicitly authorizes implementation.
