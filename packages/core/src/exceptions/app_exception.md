# AppException

## Status

Phase 2.2 placeholder — **not implemented**.

## Purpose

Root exception type for unexpected/infrastructure abort paths.

## Future API Surface (documentation only)

- `AppException`
- `message`
- `cause`
- `code`

## Constraints

- Prefer Result for expected domain failures
- No HTTP status coupling

## Implementation Gate

Do not add Dart/TypeScript classes, Firebase, HTTP, UI, or feature/business logic until a later phase explicitly authorizes implementation.
