# finance/application

## Purpose

Application layer (use cases) for `finance`.

## Responsibilities

- Orchestrate domain operations via use cases
- DTOs, validators, application services, inbound/outbound interfaces

## Dependencies

- `finance/domain` only for business types
- Other modules via interfaces

## Ownership

Backend application owners for `finance`

## Future Implementation Notes

- Idempotency and authorization checks belong here or in shared middleware later
