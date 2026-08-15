# analytics/application/dto

## Purpose

Interface-only DTO contracts for the `analytics` application boundary.

## Contents

- `requests/` — input-shape contracts only
- `responses/` — output-shape contracts only
- `commands/` — command intent DTO contracts only
- `queries/` — query-shape DTO contracts only
- `shared/` — re-exports shared Core DTO types

## Dependencies

- `@otlob/core` DTO types only

## Prohibited

No validation, mapping, serialization, database/cloud SDKs, HTTP/REST, controllers, use cases, or business logic.
