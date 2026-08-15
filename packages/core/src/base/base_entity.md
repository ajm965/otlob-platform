# BaseEntity

## Status

Phase 2.2 placeholder — **not implemented**.

## Purpose

Abstract identity-bearing domain entity shared by all modules.

## Future API Surface (documentation only)

- `BaseEntity`
- `id: UniqueId`
- `equality by identity`
- `optional createdAt/updatedAt hooks (generic only)`

## Constraints

- No feature fields
- No persistence annotations
- No Firebase types

## Implementation Gate

Do not add Dart/TypeScript classes, Firebase, HTTP, UI, or feature/business logic until a later phase explicitly authorizes implementation.
