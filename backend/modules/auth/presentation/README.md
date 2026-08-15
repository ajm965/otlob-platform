# auth/presentation

## Purpose

Transport/adapters boundary for `auth` (HTTP/controllers later).

## Responsibilities

- Controllers, request/response shapes, middleware hooks

## Dependencies

- `auth/application` use cases

## Ownership

Backend API owners for `auth`

## Future Implementation Notes

- Do not register routes or generate OpenAPI from empty folders in Phase 2.1
