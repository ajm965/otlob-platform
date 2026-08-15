# Contributing

## Governing Baseline

Architecture Review V2 (`docs/ARCHITECTURE_REVIEW_V2.md`) is the governing baseline. Do not contradict approved documentation.

## Phase 2.1 Rules

Phase 2.1 is **repository skeleton only**:

- Do not implement business logic
- Do not implement Firebase
- Do not implement APIs
- Do not implement Flutter/UI
- Do not add Dart/TypeScript domain classes beyond placeholders explicitly authorized later

## How to Contribute

1. Read `README.md` and `docs/DEVELOPMENT_GUIDE.md`
2. Follow `docs/GIT_WORKFLOW.md` and `docs/engineering/PULL_REQUEST_GUIDE.md`
3. Keep PRs small and scoped
4. Never commit secrets or service account keys
5. Customer Flutter UI remains out of scope unless ownership is explicitly transferred

## Structure Expectations

- Backend work belongs under `backend/modules/<module>/` using Clean Architecture folders
- Shared libraries belong under `packages/`
- Apps belong under `apps/`
- Approved docs live under `docs/` and must not be casually rewritten

## Questions

Escalate architecture conflicts to the Chief Architect / platform leads before coding around them.
