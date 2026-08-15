# packages/

## Purpose

Internal packages shared across apps and backend tooling.

## Responsibilities

- Host reusable libraries: core, network, design_system, permissions, storage, logging, common
- Prevent duplication of cross-cutting utilities
- Keep marketplace invariants out of client packages

## Dependencies

- `docs/` for contracts and standards
- Consumed by `apps/` and `backend/` in later phases

## Ownership

Platform shared-libraries owners

## Future Implementation Notes

- Publish strategy (Melos/npm/pub) decided in a later Phase 2 sub-phase
- No code generation output committed until codegen phase

## Phase Constraint

Skeleton only.
