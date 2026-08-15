# packages/core

## Purpose

Single shared foundation package used by every domain module.

## Phase

- 2.2 — Structure placeholders
- **2.3 — Core domain primitives implemented (TypeScript)**

## Implemented (Domain Foundation)

### Base
`UniqueId`, `BaseValueObject`, `BaseEntity`, `AggregateRoot`, `DomainEvent`

### Value Objects
`Money`, `Email`, `Phone`, `Address`, `Coordinates`, `GeoPoint`, `Percentage`, `DateRange`

## Non-Responsibilities

- Firebase / Firestore types
- HTTP / REST
- Flutter / UI
- Feature entities (`User`, `Booking`, … live in `backend/modules/*/domain`)
- Repository / use-case implementations

## Usage

```ts
import { Money, UniqueId, AggregateRoot } from '@otlob/core';
```

## Build

```bash
npm install
npm run build
```
