# disputes/application contracts

## Purpose

Interface-only repository, query, command, filter, sorting, and pagination contracts for `disputes`.

## Contract Placement

- The canonical repository port is in `domain/repositories/`, per the Engineering Handbook.
- `application/repositories/` re-exports that port; it never defines a duplicate.
- Queries and commands are shape-only application contracts. They do not execute workflows.

## Dependencies

- `disputes/domain`
- `@otlob/core` contract and pagination types

## Prohibited

No persistence, cloud SDK, HTTP, REST, use-case, DTO mapping, controller, framework, or business logic implementation.
