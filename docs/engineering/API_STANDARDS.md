# API Standards

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Engineering Handbook — REST API Standards  
**Phase:** 1.8  
**Status:** Mandatory  

---

## 1. Purpose

Standards for all public and internal REST APIs so Customer (external), Technician, Admin, and partners integrate consistently at GCC scale.

Contract designs live in `docs/API.md`; this document defines **how** APIs must be built and evolved.

`docs/API.md` is not implementation-ready when it conflicts with a mandatory rule here. Before OpenAPI generation or endpoint implementation, every documented operation must use the success/error envelopes in this standard, include `error.requestId`, and be reconciled with the owning engine. Missing engine capabilities must be added to the contract or explicitly deferred with a release tag.

---

## 2. Protocol & Style

- REST over HTTPS only
- JSON UTF-8
- Stateless request authentication via Firebase ID tokens (except webhooks)
- No GraphQL for platform public API (ADR-008)

---

## 3. Endpoint Naming

| Rule | Example |
|------|---------|
| Plural nouns for resources | `/v1/offers` |
| kebab-case path segments | `/v1/home-profiles` |
| Nest only for clear ownership | `/v1/requests/{id}/offers` |
| Actions as sub-resources POST | `/v1/offers/{id}/accept` |
| Avoid verbs in collection paths | Not `/getOffers` |
| Admin prefix | `/v1/admin/...` |
| Internal prefix | `/v1/internal/...` |
| Webhooks | `/v1/webhooks/...` |

---

## 4. Versioning

| Rule | Detail |
|------|--------|
| URL version | `/v1` required |
| Additive changes | Preferred within version |
| Breaking changes | New `/v2` + migration window |
| Deprecation | Announce in changelog; minimum notice period before removal |
| `policyVersion` / `schemaVersion` | Included where business calculations freeze |

Header versioning is not the primary strategy.

---

## 5. Response Format

### 5.1 Single Resource

```json
{
  "data": { }
}
```

### 5.2 Lists

```json
{
  "data": {
    "items": [],
    "nextPageToken": "string|null"
  },
  "meta": {
    "pageSize": 20
  }
}
```

List responses nest items and pagination inside `data`. Optional `meta` remains a sibling of `data` for non-item metadata only.

### 5.3 Empty Success

- Prefer `204 No Content` for deletes without body
- Or `200` with `{ "data": { "success": true } }` when clients need body consistency—choose one per surface and keep consistent

### 5.4 Field Rules

- `camelCase` fields
- Money as integer halalas + `currency`
- Timestamps as ISO-8601 UTC strings in JSON
- Do not return internal-only fields (PSP secrets, admin notes) to unauthorized roles
- `docs/API.md` success examples that show only a domain object are shorthand for the value inside `{ "data": ... }`; list examples that omit the nested `items` wrapper are likewise shorthand for the canonical list envelope above

---

## 6. Error Format

```json
{
  "error": {
    "code": "offer_already_accepted",
    "message": "Human-readable message",
    "details": {
      "fields": [
        { "field": "amountHalalas", "code": "too_low" }
      ]
    },
    "requestId": "req_..."
  }
}
```

| Rule | Detail |
|------|--------|
| `code` | Stable `snake_case`; not localized |
| `message` | May be localized via `Accept-Language` |
| `details` | Optional structured hints |
| `requestId` | Always present for support |

See `ERROR_HANDLING_GUIDE.md`.

---

## 7. HTTP Status Codes

| Code | When |
|------|------|
| 200 | OK with body |
| 201 | Created |
| 204 | No content |
| 400 | Validation / malformed request |
| 401 | Missing/invalid auth |
| 403 | Authenticated but forbidden |
| 404 | Resource not found (or hidden) |
| 409 | Conflict / state / idempotency replay mismatch |
| 422 | Optional semantic validation if distinguished from 400 (team standard: prefer 400 with codes) |
| 429 | Rate limited |
| 500 | Unexpected server error |
| 503 | Dependency unavailable |

Do not use `200` for business failures.

---

## 8. Pagination

| Param | Rules |
|-------|-------|
| `pageSize` | Default 20; max 100 |
| `pageToken` | Opaque cursor; not raw offsets for hot collections |

Response includes `nextPageToken` or null.

Offset pagination discouraged for large marketplace lists.

---

## 9. Filtering

- Use query parameters: `status`, `serviceId`, `city`, date ranges
- Document allowed filters per endpoint
- Reject unknown filter params in strict mode (or ignore consistently—prefer reject on write APIs, document for reads)
- Combine only with index-backed queries (see Database Standards)

---

## 10. Sorting

- `sortBy` + `sortOrder=asc|desc`
- Allowlist sortable fields only
- Default sort documented per list endpoint
- Unindexed sort fields forbidden in production queries

---

## 11. Authentication

| Rule | Detail |
|------|--------|
| Header | `Authorization: Bearer <Firebase ID Token>` |
| Public endpoints | Explicitly marked (`/health`, limited catalog if approved) |
| Webhooks | Signature verification, not user bearer |
| Service internal | Service account / signed internal auth |

Bootstrap/session helpers documented in `docs/API.md`.

---

## 12. Authorization

- Role check + resource ownership/party check
- Admin routes require global `admin` role plus the route-specific staff permission set
- Company routes require global company/technician eligibility plus an active, scoped membership role; membership details are not inferred from a broad global claim
- Never trust client-sent role fields
- Return 403 (not 404) only when appropriate; use 404 to avoid leaking existence when policy requires

Details: `SECURITY_STANDARDS.md`.

---

## 13. Validation

| Layer | Duty |
|-------|------|
| HTTP edge | Schema validation (types, ranges, required) |
| Application | Business preconditions |
| Domain | Invariants |

Validation failures → `400` + field codes.  
Never persist invalid enums or negative money (except documented signed adjustments).

---

## 14. Idempotency

Required for:

- Offer accept
- Payment intents / captures / refunds
- Subscription purchase
- Other financially or exclusivity-sensitive POSTs

| Rule | Detail |
|------|--------|
| Header | `Idempotency-Key: <uuid>` |
| Scope | Per user + route + key |
| Replay | Same key + same payload → same result |
| Conflict | Same key + different payload → `409` |

---

## 15. Localization Headers

- `Accept-Language: ar` (default) or `en`
- Error `code` remains English snake_case
- User-facing `message` may follow language

---

## 16. Rate Limiting

- Per-user and per-IP limits on abusive endpoints (offers, requests, auth-adjacent)
- Return `429` with `Retry-After` when possible
- Matching fan-out protected separately from public API limits

---

## 17. OpenAPI Requirements (Phase 2+)

- Every public endpoint represented in `shared/contracts`
- Examples for success and primary errors
- Breaking changes gated by review with Customer team
- Contract inventory includes engine-required offer create/edit/withdraw/accept operations, Pricing suggest/validate/finalize operations, and Dispute appeal; any omitted operation carries an explicit release/defer decision
- CI contract checks fail when examples omit required envelopes, errors omit `requestId`, enums are outside the lifecycle SSOT, or an implemented route is absent from OpenAPI
- System-generated notifications expose localization keys plus typed parameters; stored AR/EN blobs are limited to managed content or immutable legal/commercial snapshots

---

## 18. Related Documents

- `docs/API.md`
- `SECURITY_STANDARDS.md`
- `ERROR_HANDLING_GUIDE.md`
- `DATABASE_STANDARDS.md`
- `ARCHITECTURE_DECISIONS.md` (ADR-008)
