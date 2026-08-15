# audit

## Purpose

Backend module skeleton for **Privileged action audit records**.

## Responsibilities

- Own future domain model and use cases for this capability
- Expose application services/interfaces for other modules
- Isolate persistence and transport adapters in infrastructure/presentation

## Dependencies

- Canonical policies in `docs/` and `docs/engines/`
- Sibling modules only through application interfaces (no infrastructure coupling)
- `packages/core`, `packages/logging`, `packages/common` (future)

## Ownership

Backend platform team. Module reviewers follow CODEOWNERS when implementation starts.

## Future Implementation Notes

- Implement entities/value objects only after module ADR/contracts are approved
- Do not add Firebase Admin SDK calls outside `infrastructure/`
- Do not add HTTP route registration in Phase 2.1
- Align enums and statuses with `docs/LIFECYCLE_RECONCILIATION.md`

## Layer Map

| Layer | Folders |
|-------|---------|
| domain | entities, value_objects, repositories, events, failures, enums |
| application | use_cases, dto, validators, services, interfaces |
| infrastructure | repositories, datasources, models, mappers, cache |
| presentation | controllers, requests, responses, middleware |
| tests | unit, integration |

## Phase Constraint

Structure only — no business logic, APIs, or Firebase implementation.
