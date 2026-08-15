# services/presentation

## Purpose

Transport/adapters boundary for `services` (HTTP/controllers later).

## Responsibilities

- Controllers, request/response shapes, middleware hooks

## Dependencies

- `services/application` use cases

## Ownership

Backend API owners for `services`

## Future Implementation Notes

- Do not register routes or generate OpenAPI from empty folders in Phase 2.1
