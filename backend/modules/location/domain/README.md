# location/domain

## Purpose

Pure domain model for **Address (SavedAddress)**.

## Contents

- Entity + EntityId
- Enums
- Domain-specific value objects (if any)
- Domain event placeholders
- README

## Rules

- No Firebase, HTTP, Flutter, repositories, use cases, controllers, or DTO mapping
- Reuse `@otlob/core` shared value objects
- No business workflows — structural domain model only

Entity name `SavedAddress` to distinguish from core `Address` value object.
