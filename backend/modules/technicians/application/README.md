# technicians/application

## Purpose

Application layer (use cases) for `technicians`.

## Responsibilities

- Orchestrate domain operations via use cases
- DTOs, validators, application services, inbound/outbound interfaces

## Dependencies

- `technicians/domain` only for business types
- Other modules via interfaces

## Ownership

Backend application owners for `technicians`

## Future Implementation Notes

- Idempotency and authorization checks belong here or in shared middleware later
