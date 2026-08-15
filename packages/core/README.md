# packages/core

## Purpose

Internal shared package skeleton: **core**.

## Responsibilities

- Provide reusable library surface for apps and backend (future)
- Avoid feature business rules that belong in backend modules

## Dependencies

- Architecture and coding standards under `docs/`
- Other `packages/*` only through explicit public APIs (future)

## Ownership

Platform shared-libraries team / package CODEOWNERS

## Future Implementation Notes

- No Dart/TS implementation classes in Phase 2.1
- `design_system` must not host Customer-product screens
- `permissions` aligns with `docs/AUTHORIZATION_AND_DATA_ACCESS.md` later
- `logging` aligns with engineering logging guide later

## Phase Constraint

Structure and documentation only.
