# Customer Request API Report

**Sprint:** B4 — Customer Request API Foundation  
**Date:** 2026-08-18  

Offline customer request create / get / list. No Firestore, no matching, no publish, no Firebase Auth changes.

---

## Existing contracts discovered

### HTTP (`docs/API.md` §6)

| Method | Path | Auth | In this sprint? |
|--------|------|------|-----------------|
| POST | `/requests` | Customer | Yes — Create |
| GET | `/requests` | Customer (“list my requests”) | Yes — List |
| GET | `/requests/{requestId}` | Owner customer or scoped staff | Yes — Get |
| PATCH | `/requests/{requestId}` | — | No (update not in typical scope) |
| POST | `/requests/{requestId}/publish` | — | No (matching / notifications) |
| POST | `/requests/{requestId}/cancel` | — | No |
| GET | `/requests/{requestId}/offers` | — | No (offers out of scope) |
| GET | `/provider/requests/nearby` | Technician/Company | No (provider endpoint) |

Create body example (`docs/API.md` §6.1): `serviceId`, `addressId`, `title`, `description`, `preferredTimeStart`, `preferredTimeEnd`, `budgetMinHalalas`, `budgetMaxHalalas`, `mediaUrls`.  
Create response: `201` request when the body contains only persistable fields.  
Documented-but-unmapped example fields are `[MVP]` and rejected with `validation_failed` (see §6.1 implementation note).  
List query: `status`, pagination (`docs/API.md` §2.7).  
List envelope: `{ data: { items, nextPageToken } }`.

KSA v1 partition: `marketId=sa`, `countryCode=SA` (`docs/API.md` §2.9).

### Product

- Confirm → `draft`, then Publish → `open` (`docs/product/USER_JOURNEYS.md` §7).
- Cannot publish without location + service (publish, not create).
- `RequestStatus`: `draft` / `open` / `matched` / `booked` / `cancelled` / `expired` (existing enum; lifecycle unchanged).
- Create Request hard-depends on Auth, Catalog, Address (`FEATURE_DEPENDENCIES.md`) — Auth and Address are not implemented in this foundation.

### Firestore `requests` (`docs/FIRESTORE_STRUCTURE.md` §9)

Includes `title`, `addressId`, `categoryId`, `budget*`, `mediaUrls`, `geohash`, `city` — **not** on the current `ServiceRequest` entity. Entity was not redesigned.

### Domain (unchanged entity shape)

`ServiceRequest`: `customerId`, `serviceId`, `status`, `description`, `location` (`GeoPoint | null`), `preferredWindow` (`DateRange | null`), `acceptedOfferId`, `bookingId`, `marketId`, `countryCode`.

Ports: `IRequestRepository` / `ServiceRequestFilter`.  
Use-case interfaces already present: `ICreateRequestUseCase`, `IGetRequestUseCase`, `IListRequestsUseCase`.  
Also present, **not implemented**: `IUpdateRequestUseCase`, `IDeleteRequestUseCase`, `ISearchRequestsUseCase`.

Events `RequestCreated` / `RequestCancelled` exist; no event bus in this sprint.

---

## Use cases implemented

| Class | Interface |
|-------|-----------|
| `CreateRequestUseCase` | `ICreateRequestUseCase` |
| `GetRequestUseCase` | `IGetRequestUseCase` |
| `ListRequestsUseCase` | `IListRequestsUseCase` |

Create always sets `status=draft`, `location=null`, `acceptedOfferId=null`, `bookingId=null`.  
`IListRequestsUseCase` input is the existing `FindPendingRequestsQueryDto` (same pattern as catalog list DTOs).

---

## Repository implementation

In-memory only:

- `InMemoryRequestRepository` + `createSeededRequestRepository()`

Implements the existing `IRepository` port (including unused write/search methods so the interface compiles). No Firestore.

`ServiceRequestFilter` gained documented `customerId` only (“list my requests” + Firestore index `customerId`).

---

## DTO mapping

Response/request DTOs were previously `id` + market scope only. Extended **only** with fields present on the current domain entity **and** documented in API/Firestore:

| DTO | Added fields | Source |
|-----|--------------|--------|
| `CreateRequestRequest` | `customerId`, `serviceId`, `description`, `preferredTimeStart`, `preferredTimeEnd` | API body + domain; `customerId` is adapter-set (not a public body field) |
| `RequestResponse` | `customerId`, `serviceId`, `status`, `description`, `location`, `preferredTimeStart`/`End`, `acceptedOfferId`, `bookingId` | entity + `GeoPoint` / `DateRange` |
| `FindPendingRequestsQueryDto` | `customerId`, `status` | “list my requests” + API query `status` |

Not added to `ServiceRequest` (on API create body / Firestore, **not** on domain; entity was not redesigned): `title`, `addressId`, `categoryId`, `budgetMinHalalas`, `budgetMaxHalalas`, `mediaUrls`, `geohash`, `city`.

Those documented-but-unmapped create keys are optional on `CreateRequestRequest` **only** so the use case can reject them. They are not mapped and not persisted.

### Supported create fields (persistable)

- `serviceId`
- `description`
- `preferredTimeStart`
- `preferredTimeEnd`

Adapter-set (not a public body field): `customerId`, `marketId`, `countryCode`.

### Currently deferred / unmapped create fields

- `title`
- `addressId`
- `budgetMinHalalas`
- `budgetMaxHalalas`
- `mediaUrls`

If any of these keys is supplied, `CreateRequestUseCase` throws `RequestFailure` `validation_failed` **before** `repository.create`. The HTTP adapter forwards presence of those keys; it does not drop them. Clients receive HTTP `400` `{ error: { code: "validation_failed", ... } }`.

The API does **not** claim to persist fields it cannot store. Full Customer App C6 request journey (address, photos, budget, then publish) cannot round-trip through this live API.

---

## HTTP routes

`backend/functions/src/http/routes/request_routes.ts` registered from B1 `createHttpApp`.

| Method | Paths |
|--------|--------|
| POST | `/requests`, `/v1/requests` → `201` `{ data: RequestResponse }` |
| GET | `/requests`, `/v1/requests` |
| GET | `/requests/:requestId`, `/v1/requests/:requestId` |

- Query: `status`, `pageSize`, `pageToken` → use-case `cursor`
- List body: `{ data: { items, nextPageToken } }`
- Create with only persistable fields: `201 { data: RequestResponse }`
- Create with deferred example fields: platform envelope `400 validation_failed`
- Unknown request: platform envelope `404 not_found`
- `/v1` aliases follow API versioning (`docs/API.md` §24), same pattern as catalog/health

Use cases are wired in `composition_root.ts` via existing DI (shared in-memory repository instance).

`docs/API.md` §6.1 keeps the full `[MVP]` body example and adds the smallest implementation note required by `docs/engineering/API_STANDARDS.md` §1 (explicit deferral with the existing `[MVP]` release tag). No new documentation format.

---

## Mock request strategy

Deterministic KSA seed (`marketId=sa`, `countryCode=SA`):

| ID | Customer | Status | Notes |
|----|----------|--------|--------|
| `req-001` | `offline-customer` | `draft` | list-mine fixture |
| `req-002` | `offline-customer` | `open` | location + preferred window for mapping |
| `req-003` | `other-customer` | `open` | excluded from “my” list |

Create without an explicit id uses `req-{count+1 padded to 3}` → first create is `req-004`, then `req-005`, …

HTTP actor is always `offline-customer` (no Firebase Auth in this sprint).

---

## Deferred integrations

- Address/location integration (`addressId` → `GeoPoint`; Address HTTP)
- Real customer identity (Firebase token → `customerId`)
- Firestore persistence
- Publish (`draft` → `open`) and matching / nearby notifications
- Cancel, update, offers
- Provider nearby feed
- Admin request monitor
- Cloud Tasks / Pub/Sub / background jobs
- Domain fields for title, budget, media, category denormalization
- `RequestCreated` event dispatch (no event bus)

Full C6 request journey cannot yet be round-tripped through the live API.

---

## Validation rules actually implemented

Documented platform validation only (`docs/engineering/ERROR_HANDLING_GUIDE.md`, `ERROR_SCENARIOS.md`, API types, existing `DateRange` invariant):

| Rule | When |
|------|------|
| `validation_failed` / `required` | Missing `serviceId`, `description`, `customerId`, `marketId`, `countryCode`, `requestId` |
| `validation_failed` / `required` | Only one of `preferredTimeStart` / `preferredTimeEnd` provided (`DateRange` needs both) |
| `validation_failed` | Invalid ISO-8601 datetime (API type `ISO-8601\|null`) |
| `validation_failed` / `too_low` on `preferredTimeEnd` | Existing core `DateRange` (`end >= start`) |
| `validation_failed` / `invalid_enum` | List query `status` not in `RequestStatus` |
| `validation_failed` (unsupported field) | Create body includes `title`, `addressId`, `budgetMinHalalas`, `budgetMaxHalalas`, or `mediaUrls` |

**Not implemented** (not documented as create rules, or belong to publish/upload): title/description length, media count/size, urgency, scheduling engine rules, budget/pricing range checks, publish-without-location (AC-REQ-02). Unsupported documented fields are rejected for presence only — their values are not interpreted.

---

## Assumptions

1. Customer identity for this offline foundation is the deterministic mock `offline-customer`. Production identity comes from the Firebase token (`docs/API.md` §2.2); that header is not interpreted here.
2. Create lands in `draft` (journey confirm → draft). Publish is a later sprint.
3. `addressId` cannot set `location` without an Address module; create leaves `location: null`.
4. Documented-but-unmapped create fields are **rejected**, not ignored (`docs/DATABASE.md` §18; `docs/engineering/API_STANDARDS.md` §1).
5. GET by id does not yet hide other customers’ documents (owner check needs Auth).
6. General pagination defaults from `docs/API.md` §2.7 apply (`pageSize` default 20, max 100).
7. Market scope is adapter-set (`sa` / `SA`); clients cannot select market via query (`docs/API.md` §2.9).

---

## Known limitations

- In-memory only; data resets on process restart.
- Response DTOs omit Firestore/API fields not present on current domain entities.
- No authentication; list is always “offline-customer”.
- GET does not enforce owner vs staff vs provider.
- Create cannot store title, address, budget, or media; supplying those keys fails closed with `400 validation_failed`.
- Full C6 request journey cannot round-trip through this API.
- No publish, matching, offers, booking, payments, notifications, or chat.

---

## Tests executed

`npm test`

- Backend: 29 passed (auth + categories + services + requests: repository, mapper, use cases, validation including unsupported-field reject)
- Functions: 12 passed (auth 501 + catalog HTTP + request HTTP: supported create, unmapped-field reject, list, get, undocumented routes 404)

---

## Build result

`npm run build` — **PASS** (`@otlob/core`, `@otlob/backend`, `@otlob/functions`)

---

## Quality gate

| Check | Result |
|-------|--------|
| No Firestore / Firebase persistence | PASS |
| No Firebase Auth changes | PASS |
| No provider or admin request endpoints | PASS |
| No undocumented customer request endpoints | PASS |
| Domain entity / status lifecycle not redesigned | PASS |
| No invented title/media/pricing business rules | PASS |
| Unsupported documented create fields rejected (not ignored) | PASS |
| Customer app unmodified | PASS |
| Marketplace modules outside requests + HTTP/DI host unmodified | PASS |

---

**Git:** not committed, not pushed.
