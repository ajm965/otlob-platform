# companies/application

## Purpose

Application layer (use cases) for `companies`.

## Responsibilities

- Orchestrate domain operations via use cases
- DTOs, validators, application services, inbound/outbound interfaces

## Dependencies

- `companies/domain` only for business types
- Other modules via interfaces

## Ownership

Backend application owners for `companies`

## Future Implementation Notes

- Idempotency and authorization checks belong here or in shared middleware later
