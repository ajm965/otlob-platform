# home_passport/application

## Purpose

Application layer (use cases) for `home_passport`.

## Responsibilities

- Orchestrate domain operations via use cases
- DTOs, validators, application services, inbound/outbound interfaces

## Dependencies

- `home_passport/domain` only for business types
- Other modules via interfaces

## Ownership

Backend application owners for `home_passport`

## Future Implementation Notes

- Idempotency and authorization checks belong here or in shared middleware later
