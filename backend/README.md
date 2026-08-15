# backend/

## Purpose

Server-side monorepo area for Cloud Functions host, security rules placeholders, backend config, and Clean Architecture domain modules.

## Responsibilities

- Host `modules/` bounded contexts (structure only in Phase 2.1)
- Reserve `functions/`, `rules/`, and backend-local `config/` for later implementation phases
- Enforce server-side ownership of marketplace invariants when coding begins

## Dependencies

- `docs/` Architecture Review V2 baseline and engine specifications
- `config/` for environment/security constants (repo-level)
- `packages/` for shared libraries (future)

## Ownership

Backend platform team. Finance modules require additional finance review.

## Future Implementation Notes

- Do not implement Firebase, REST handlers, or business logic in Phase 2.1
- Existing `functions/`, `rules/`, and `config/` folders remain reserved placeholders
- Module code will live under `backend/modules/<name>/` following Clean Architecture

## Layout

```text
backend/
├── modules/          # Domain modules (Phase 2.1 skeleton)
├── functions/        # Future Functions entrypoints (reserved)
├── rules/            # Future Firestore/Storage rules (reserved)
├── config/           # Backend-local config templates (reserved)
└── README.md
```

## Phase Constraint

Repository structure only.
