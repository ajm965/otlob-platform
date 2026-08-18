# backend/

## Purpose

Server-side monorepo area for Cloud Functions host, security rules placeholders, backend config, and Clean Architecture domain modules.

## Responsibilities

- Host `modules/` bounded contexts (domain/application contracts)
- Host `functions/` as the Cloud Functions HTTPS platform skeleton
- Reserve `rules/` and backend-local `config/` for later implementation phases
- Enforce server-side ownership of marketplace invariants when coding begins

## Dependencies

- `docs/` Architecture Review V2 baseline and engine specifications
- `config/` for environment/security constants (repo-level)
- `packages/` for shared libraries (future)

## Ownership

Backend platform team. Finance modules require additional finance review.

## Future Implementation Notes

- Feature use cases, repositories, and HTTP controllers stay in `backend/modules/`
- Firebase Admin and HTTPS bootstrap live in `backend/functions/`
- Do not add marketplace business logic to the Functions host

## Layout

```text
backend/
├── modules/          # Domain modules (Phase 2.1 skeleton)
├── functions/        # Cloud Functions HTTPS host (platform skeleton)
├── rules/            # Future Firestore/Storage rules (reserved)
├── config/           # Backend-local config templates (reserved)
└── README.md
```

## Phase Constraint

Domain modules remain contract-only until a feature sprint. `functions/` is the executable platform host.
