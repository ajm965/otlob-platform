# loyalty/application

## Purpose

Application layer (use cases) for `loyalty`.

## Responsibilities

- Orchestrate domain operations via use cases
- DTOs, validators, application services, inbound/outbound interfaces

## Dependencies

- `loyalty/domain` only for business types
- Other modules via interfaces

## Ownership

Backend application owners for `loyalty`

## Future Implementation Notes

- Idempotency and authorization checks belong here or in shared middleware later
