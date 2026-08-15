# requests/domain

## Purpose

Pure domain model for **Request (ServiceRequest)**.

## Contents

- Entity + EntityId
- Enums
- Domain-specific value objects (if any)
- Domain event placeholders
- README

## Rules

- No Firebase, HTTP, Flutter, repositories, use cases, controllers, or DTO mapping
- Reuse `@otlob/core` for Money, Email, Phone, Address, Coordinates, GeoPoint, Percentage, DateRange, LocalizedLabel
- No business workflows — structural domain model only
