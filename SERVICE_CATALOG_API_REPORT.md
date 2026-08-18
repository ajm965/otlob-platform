# Service Catalog API Report

**Sprint:** B3 — Customer Service Catalog API  
**Date:** 2026-08-18  

Read-only catalog APIs for Customer App Sprint C10. No Firestore, no auth, no writes.

---

## Existing contracts discovered

### HTTP (`docs/API.md` §4)

| Method | Path | Query | Customer? |
|--------|------|-------|-----------|
| GET | `/categories` | `activeOnly=true` | Yes |
| GET | `/services` | `categoryId`, `activeOnly` | Yes |
| GET | `/services/{serviceId}` | — | Yes |
| PUT | `/admin/categories/{categoryId}` | — | No (not implemented) |
| PUT | `/admin/services/{serviceId}` | — | No (not implemented) |

No `GET /categories/{id}` is documented.

List envelope (`docs/API.md` §2.7): `{ data: { items, nextPageToken } }`. `pageSize` default 20, max 100; `pageToken` cursor.

KSA v1 partition: `marketId=sa`, `countryCode=SA` (`docs/API.md` §2.9).

### Firestore fields (`docs/FIRESTORE_STRUCTURE.md` §6–§7)

Categories: `code`, `nameEn`, `nameAr`, `iconUrl`, `sortOrder`, `isActive`, `descriptionEn`, `descriptionAr`  
Services: `categoryId`, `code`, `nameEn`, `nameAr`, descriptions, `defaultWarrantyDays`, `isActive`, `sortOrder`, price bounds  

### Domain (unchanged entity shapes)

- `Category`: `name` (`LocalizedLabel`), `status`, `sortOrder`, `marketId`, `countryCode`
- `Service`: `categoryId`, `name`, `status`, `marketId`, `countryCode`
- Ports: `ICategoryRepository`, `IServiceRepository`
- Use-case interfaces: `IListCategorysUseCase`, `IListServicesUseCase`, `IGetServiceUseCase` (implemented). `IGetCategoryUseCase` exists but has **no documented HTTP route** — not implemented.

---

## Endpoints implemented

| Method | Paths |
|--------|--------|
| GET | `/categories`, `/v1/categories` |
| GET | `/services`, `/v1/services` |
| GET | `/services/:serviceId`, `/v1/services/:serviceId` |

`/v1` aliases follow API versioning (`docs/API.md` §24), same pattern as health.

---

## Repository implementation

In-memory only:

- `InMemoryCategoryRepository` + `createSeededCategoryRepository()`
- `InMemoryServiceRepository` + `createSeededServiceRepository()`

Implements the existing `IRepository` port (including unused write methods so the interface compiles). No Firestore.

`ServiceFilter` gained documented `categoryId` only.

---

## Use cases implemented

| Class | Interface |
|-------|-----------|
| `ListCategorysUseCase` | `IListCategorysUseCase` |
| `ListServicesUseCase` | `IListServicesUseCase` |
| `GetServiceUseCase` | `IGetServiceUseCase` |

List inputs use existing search query DTOs, extended with documented `activeOnly` / `categoryId`.  
`ISearch*` and `IGetCategoryUseCase` were not implemented (no matching customer HTTP).

---

## DTO mapping

Response DTOs were previously `id` + market scope only. Extended **only** with fields present on the current domain entities **and** documented in Firestore/product:

| DTO | Added fields | Source |
|-----|--------------|--------|
| `CategoryResponse` | `nameAr`, `nameEn`, `isActive`, `sortOrder` | `LocalizedLabel`, `CategoryStatus`, `sortOrder` |
| `ServiceResponse` | `categoryId`, `nameAr`, `nameEn`, `isActive` | entity + `LocalizedLabel` + `ServiceStatus` |

Not added (on Firestore docs, **not** on domain; entities were not redesigned): `code`, `iconUrl`, descriptions, `defaultWarrantyDays`, `minPriceHalalas`, `maxPriceHalalas`, service `sortOrder`.

`isActive` is `status === active`.

---

## HTTP routes

`backend/functions/src/http/routes/catalog_routes.ts` registered from B1 `createHttpApp`.

- Query: `activeOnly=true` (exact string), `categoryId`, `pageSize`, `pageToken` → use-case `cursor`
- List body: `{ data: { items, nextPageToken } }`
- Get body: `{ data: ServiceResponse }`
- Unknown service: platform envelope `404 not_found`

Use cases are wired in `composition_root.ts` via existing DI tokens.

---

## Mock catalog strategy

Deterministic KSA seed (`marketId=sa`, `countryCode=SA`):

Categories: `plumbing`, `electrical`, `ac` (active), `inactive-demo` (inactive). Names match Firestore examples (Plumbing, Electrical, AC).  
Services: `pipe-repair`, `outlet-repair`, `ac-gas-refill` (active), `inactive-service` (inactive). `ac-gas-refill` matches the Firestore example “AC Gas Refill”.

Inactive rows exist so `activeOnly=true` is testable.

---

## Deferred integrations

- Firestore adapters and indexes
- Firebase Auth on catalog (API allows required or public)
- Admin PUT catalog endpoints
- GET category by id (not documented)
- Remaining Firestore fields after domain alignment
- Search use cases

---

## Assumptions

1. Catalog reads are public for this sprint (auth is out of scope).
2. `activeOnly` filters only when the query equals `true`.
3. Category list uses domain `sortOrder` (documented as UI ordering). Services have no `sortOrder` on the entity, so seed insertion order is used.
4. General pagination defaults from `docs/API.md` §2.7 apply to these list use cases (existing `CursorPageResponseDto` contract).

---

## Known limitations

- In-memory only; data resets on process restart.
- Response DTOs omit Firestore fields not present on current domain entities.
- No `GET /categories/{id}`.
- No language negotiation; both `nameAr` and `nameEn` are returned.

---

## Tests executed

`npm test`

- Backend: 14 passed (auth + categories + services)
- Functions: 6 passed (auth 501 + catalog HTTP)

---

## Build result

`npm run build` — **PASS** (`@otlob/core`, `@otlob/backend`, `@otlob/functions`)

---

## Quality gate

| Check | Result |
|-------|--------|
| No Firestore / Firebase Auth in catalog path | PASS |
| No admin or write catalog routes | PASS |
| No undocumented customer catalog endpoints | PASS |
| Domain entities not redesigned | PASS |
| Customer app unmodified | PASS |
| Marketplace modules outside catalog/auth/functions host unmodified | PASS |

---

**Git:** not committed, not pushed.
