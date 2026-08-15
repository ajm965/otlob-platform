# warranty/application

## Purpose

Application layer (use cases) for `warranty`.

## Responsibilities

- Orchestrate domain operations via use cases
- DTOs, validators, application services, inbound/outbound interfaces

## Dependencies

- `warranty/domain` only for business types
- Other modules via interfaces

## Ownership

Backend application owners for `warranty`

## Future Implementation Notes

- Idempotency and authorization checks belong here or in shared middleware later
