# backend/modules/

## Purpose

Clean Architecture module skeletons for the Otlob backend domain.

## Responsibilities

- Provide one bounded module per marketplace capability
- Separate domain, application, infrastructure, and presentation layers
- Host future unit/integration tests per module

## Dependencies

- Architecture Review V2 and engine specs under `docs/`
- Shared packages under `packages/` (future)
- Platform config under `config/` (future)

## Ownership

Backend platform team. Finance-sensitive modules (`payments`, `wallet`, `finance`) require finance dual-control review when implementation begins.

## Future Implementation Notes

- No use-case, entity, repository, or controller code in Phase 2.1
- Firebase/Firestore adapters belong only under each module's `infrastructure/` later
- HTTP controllers belong under `presentation/` later; no routes wired yet

## Phase Constraint

Folders and README files only.
