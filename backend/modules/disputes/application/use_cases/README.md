# disputes/application/use_cases

## Purpose

Interface-only use-case contracts for the `disputes` application boundary.

## Contents

- `commands/` — create, update, and delete contract declarations
- `queries/` — get, list, and search contract declarations
- `interfaces/` — shared Core use-case contract re-exports

## Dependencies

- DTO contracts in `application/dto/`
- Core contracts in `@otlob/core`
- Repository and domain contracts are permitted future dependencies; no implementations are referenced here

## Prohibited

No implementation, business logic, validation, mappings, persistence/cloud SDKs, HTTP, controllers, services, or framework imports.
