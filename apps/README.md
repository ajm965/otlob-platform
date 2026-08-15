# apps/

## Purpose

Client application workspaces for Customer, Technician, and Admin surfaces.

## Responsibilities

- Host application skeletons only in Phase 2.1
- Keep each app isolated from backend module internals
- Respect Customer UI ownership boundaries documented in Architecture Review V2

## Dependencies

- `packages/` for shared libraries (future)
- `docs/` for product, API, and architecture contracts
- Backend HTTP/realtime contracts (future implementation)

## Ownership

Platform team owns Technician and Admin skeletons. Customer app workspace is reserved with external Customer-team ownership constraints.

## Future Implementation Notes

- Do not add Flutter feature code in Phase 2.1
- Legacy reserved path `future_flutter_apps/` remains historical; new work uses `apps/`
- App bootstrapping, flavors, and CI jobs come in later Phase 2 sub-phases

## Phase Constraint

Structure and README documentation only.
