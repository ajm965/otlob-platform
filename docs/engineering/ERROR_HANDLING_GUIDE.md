# Error Handling Guide

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Engineering Handbook — Error Handling  
**Phase:** 1.8  
**Status:** Mandatory  

---

## 1. Purpose

Company-wide rules for representing, mapping, logging, and retrying errors across backend and future clients.

---

## 2. Error Categories

### 2.1 Business Errors

Expected domain failures:

| Example code | Meaning |
|--------------|---------|
| `offer_already_accepted` | Exclusive accept conflict |
| `request_not_open` | Illegal state transition |
| `provider_not_eligible` | Matching/subscription gate |
| `warranty_expired` | Claim outside window |

Properties:

- Predictable
- Safe to show mapped messages to users
- HTTP typically 409 or 400 depending on case (document per code)
- Never indicate system crash

### 2.2 Validation Errors

Malformed or out-of-range input:

| Example code | Meaning |
|--------------|---------|
| `validation_failed` | Envelope |
| Field codes | `required`, `too_low`, `too_high`, `invalid_enum` |

HTTP `400`. Include `details.fields[]`.

### 2.3 Authorization Errors

| Code | HTTP |
|------|------|
| `unauthenticated` | 401 |
| `forbidden` | 403 |

Do not leak whether a hidden resource exists when policy requires 404.

### 2.4 Unexpected Errors

Bugs, unreachable invariants, unknown dependency failures.

| Code | HTTP |
|------|------|
| `internal_error` | 500 |
| `dependency_unavailable` | 503 |

Client message generic; logs contain internal detail + stack where safe.

---

## 3. Error Shape (API)

Align with `API_STANDARDS.md`:

- Stable `code`
- Optional localized `message`
- `requestId`
- Optional `details`

---

## 4. Layer Mapping

```text
Domain error → Application result/error type → HTTP mapper → JSON error
```

Rules:

- Domain throws/returns typed errors—not raw strings
- Handlers do not leak stacks
- Preserve cause chains internally for logs

---

## 5. Logging Rules for Errors

| Category | Log level |
|----------|-----------|
| Validation | info/debug (rate aware) |
| Business conflict | info/warn |
| AuthZ failures | warn (monitor brute patterns) |
| Unexpected | error |
| Payment/data loss risk | critical/error + alert |

Include: `requestId`, `code`, actor id, entity ids—not tokens or document images.

See `LOGGING_GUIDE.md`.

---

## 6. Crash Reporting

| Surface | Tool |
|---------|------|
| Flutter clients (future) | Crashlytics |
| Backend | Error reporting + alerts on 500 rate |

Distinguish handled business errors (no crash) from uncaught exceptions.

---

## 7. Retry Strategy

### 7.1 Safe to Retry

- Idempotent reads
- Writes protected by idempotency keys
- Transient `503` / network blips with backoff

### 7.2 Unsafe Without Guard

- Non-idempotent POSTs creating offers/payments
- Dual accept without transaction

### 7.3 Backoff

- Exponential backoff + jitter
- Max attempts capped
- Respect `Retry-After`

### 7.4 Webhooks / Workers

- At-least-once delivery assumed
- Handlers idempotent
- Dead-letter after N failures with ops alert

---

## 8. Client Guidance (All Apps)

- Branch on `error.code`, not HTTP text
- Show AR/EN messages from code maps
- On `401`, refresh/reauth flow
- On `409` accept conflicts, reload request state

---

## 9. Creating New Error Codes

1. Add to shared constants  
2. Document in API/OpenAPI  
3. Choose HTTP status  
4. Add tests  
5. Prefer extending existing codes over synonyms  

---

## 10. Related Documents

- `API_STANDARDS.md`
- `LOGGING_GUIDE.md`
- `TESTING_GUIDE.md`
- `SECURITY_STANDARDS.md`
