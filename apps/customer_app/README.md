# Customer App

## Purpose

Application workspace skeleton for the Otlob Customer App.

## Responsibilities

- Hold future client source layout only
- Consume shared contracts/packages when implementation is authorized
- Remain free of backend business logic

## Dependencies

- `packages/*` (future shared libraries)
- Platform API contracts under `docs/API.md` and future OpenAPI in packages/contracts alignment
- Architecture Review V2 baseline (`docs/ARCHITECTURE_REVIEW_V2.md`)

## Ownership

External Customer team (UI ownership outside this platform team's delivery of backend contracts)

## Future Implementation Notes

- Folder reserved for contract/integration alignment only in early phases. Do not implement Customer Flutter UI business screens here unless ownership is explicitly transferred.
- No Dart/Flutter feature code in Phase 2.1
- Folder names under `lib/` / `test/` are reserved placeholders only

## Phase Constraint

Phase 2.1 creates structure only. Do not implement UI, widgets, screens, or Firebase client wiring here yet.
