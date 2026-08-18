# Platform Skeleton Report

**Sprint:** B1 — Platform Skeleton Foundation  
**Package:** `@otlob/functions` (`backend/functions`)  
**Date:** 2026-08-18  

This sprint adds the executable Cloud Functions host only. Marketplace modules under `backend/modules/` were not implemented or changed.

---

## 1. Files created

### Functions package

| Path |
|------|
| `backend/functions/package.json` |
| `backend/functions/tsconfig.json` |
| `backend/functions/.env.example` |
| `backend/functions/src/index.ts` |
| `backend/functions/src/composition_root.ts` |
| `backend/functions/src/config/environment.ts` |
| `backend/functions/src/config/app_config.ts` |
| `backend/functions/src/di/container.ts` |
| `backend/functions/src/di/tokens.ts` |
| `backend/functions/src/infrastructure/firebase/admin_app.ts` |
| `backend/functions/src/infrastructure/logging/logger.ts` |
| `backend/functions/src/infrastructure/logging/structured_logger.ts` |
| `backend/functions/src/http/app.ts` |
| `backend/functions/src/http/envelopes.ts` |
| `backend/functions/src/http/http_error.ts` |
| `backend/functions/src/http/platform_request.ts` |
| `backend/functions/src/http/middleware/request_id_middleware.ts` |
| `backend/functions/src/http/middleware/logging_middleware.ts` |
| `backend/functions/src/http/middleware/not_found_middleware.ts` |
| `backend/functions/src/http/middleware/error_handler_middleware.ts` |
| `backend/functions/src/http/routes/health_route.ts` |
| `backend/functions/src/http/routes/version_route.ts` |

### Repository wiring

| Path |
|------|
| `firebase.json` |
| `PLATFORM_SKELETON_REPORT.md` |

---

## 2. Files modified

| Path | Change |
|------|--------|
| `package.json` | Added `backend/functions` workspace and `build:functions` / updated root `build` |
| `package-lock.json` | Workspace lockfile for `@otlob/functions` and Firebase/Express dependencies |
| `backend/functions/README.md` | Replaced reserved placeholder with host documentation |
| `backend/README.md` | Functions host is no longer described as reserved-only |

Not modified: `docs/**`, `backend/modules/**`, `packages/core/**`, customer/provider/admin app trees.

---

## 3. Platform components added

| Component | Location |
|-----------|----------|
| Cloud Functions bootstrap | `backend/functions/src/index.ts` — HTTPS function `api` |
| HTTP entrypoint | Express app in `backend/functions/src/http/app.ts` |
| Composition root | `backend/functions/src/composition_root.ts` |
| Dependency injection | `Container` + `tokens` (`config`, `logger`, `firebaseApp`) |
| Firebase Admin initialization | `initializeFirebaseAdmin` — `initializeApp({ projectId })` |
| Environment loader | `config/environment.ts` |
| Configuration layer | `loadAppConfig` → `AppConfig` |
| Base middleware pipeline | request ID → JSON body → request logging → routes → 404 → error mapper |
| Success envelope | `{ data }` |
| Error envelope | `{ error: { code, message, details, requestId } }` |
| Health endpoint | `GET /health`, `GET /v1/health` |
| Version endpoint | `GET /v1/version` |
| Request ID middleware | `x-request-id` header in/out |
| Logging middleware | Structured JSON start/end logs with duration |

---

## 4. Environment strategy

Runtime reads `process.env` only. Secrets are not committed. Template: `backend/functions/.env.example`.

| Variable | Role | Default / source |
|----------|------|------------------|
| `OTLB_ENV` | `development` \| `staging` \| `production` | `NODE_ENV=production` → `production`, else `development` |
| `OTLB_LOG_LEVEL` / `LOG_LEVEL` | `debug` \| `info` \| `warn` \| `error` \| `critical` | `info` |
| `OTLB_SERVICE_NAME` | Service name in logs/version | `otlob-platform-api` |
| `OTLB_SERVICE_VERSION` | Reported version | `0.1.0` |
| `OTLB_FUNCTION_REGION` | Functions region | `europe-west1` |
| `FIREBASE_PROJECT_ID` | Admin SDK project | Required locally |
| `GCLOUD_PROJECT` / `GCP_PROJECT` | Same, Cloud Functions | Used when `FIREBASE_PROJECT_ID` is absent |
| `FIREBASE_CONFIG` | JSON `projectId` from Functions runtime | Used when the above are absent |

Missing project id fails **at process boot**, not at compile time. Firebase CLI `.env` files in `backend/functions/` are the local injection path (`.env` is gitignored).

---

## 5. Bootstrap flow

```text
Module load (index.ts)
  → createCompositionRoot(process.env)
      → loadAppConfig
      → StructuredLogger
      → initializeFirebaseAdmin
      → Container.register(config, logger, firebaseApp)
      → log platform_bootstrapped
  → createHttpApp(container)
      → Express + middleware + health/version
  → export onRequest api (cors public, 256MiB, 60s)
```

Domain modules are not registered. Future feature sprints resolve ports from the same container.

---

## 6. Middleware flow

```text
Client
  → HTTPS function `api`
  → trust proxy, hide X-Powered-By
  → request ID (`x-request-id` or generated `req_<uuid>`)
  → express.json (1mb)
  → logging (start; finish with status + durationMs)
  → GET /health | /v1/health | /v1/version
  → 404 not_found
  → error mapper → JSON error envelope
```

No authentication middleware (out of sprint scope).

---

## 7. Error strategy

Aligned with `docs/engineering/API_STANDARDS.md` and `docs/engineering/ERROR_HANDLING_GUIDE.md`.

| Condition | HTTP | `code` |
|-----------|------|--------|
| `HttpError` | as set | as set |
| Unknown path | 404 | `not_found` |
| Invalid JSON body | 400 | `validation_failed` |
| Unhandled exception | 500 | `internal_error` |

Response shape:

```json
{
  "error": {
    "code": "internal_error",
    "message": "An unexpected error occurred.",
    "details": {},
    "requestId": "req_..."
  }
}
```

500 responses do not include stacks. Stacks are written only to structured error logs.

---

## 8. Logging strategy

Aligned with `docs/engineering/LOGGING_GUIDE.md`.

- JSON lines to stdout (`debug`/`info`/`warn`) and stderr (`error`/`critical`)
- Fields: `timestamp`, `severity`, `message`, `service`, `environment`, `requestId`, `module`, `action`, `durationMs`, `errorCode`, `statusCode`, `httpMethod`, `path`
- Authorization headers and query strings are not logged
- Production default minimum level: `info`
- Request-scoped logger via `Logger.withContext({ requestId })`

---

## 9. Remaining work

Not in this sprint (intentionally):

- Firebase Auth verification middleware
- Feature routes (catalog, requests, offers, payments, …)
- Use-case / repository implementations
- Firestore rules and indexes
- OpenAPI under `shared/contracts/`
- CI lint/test/deploy workflows
- Outbox / event bus
- Secret Manager wiring
- `.firebaserc` project aliases
- Functions emulator smoke test in CI

---

## 10. Validation results

| Check | Result |
|-------|--------|
| `npm run build` (core + backend + functions) | **PASS** |
| `npm run build -w @otlob/functions` | **PASS** |
| Automated tests | **NONE** — no `*.test.ts` files in the repository |
| Flutter commands | Not applicable |

---

## 11. Warnings

1. Runtime boot requires a Firebase project id. Compile succeeds without it; loading `dist/index.js` outside Cloud Functions without `FIREBASE_PROJECT_ID` (or `GCLOUD_PROJECT` / `FIREBASE_CONFIG`) throws.
2. Firebase Admin is initialized with `projectId` only (Application Default Credentials in Functions). No service-account JSON is loaded from the repo.
3. Default Functions region is `europe-west1` via `OTLB_FUNCTION_REGION`. Change per environment; no region is hardcoded in architecture docs.
4. `GET /v1/health` is a versioned alias of documented `GET /health` (`docs/API.md` §21.1). `GET /v1/version` is the sprint version endpoint (not listed in `docs/API.md` §21).
5. Root `README.md` still describes Phase 2.1 as “no TypeScript domain classes”; that file was not updated (not in sprint scope).

---

## 12. Known limitations

- Platform host only: no marketplace behavior.
- Health is process liveness, not Firestore/PSP readiness.
- DI container is instance-only (no factory/lifetime scopes).
- Logger is stdout/stderr JSON, not a Cloud Logging client SDK.
- CORS is enabled on the function (`cors: true`); no origin allowlist.
- No rate limiting, idempotency store, or auth context.
- `backend/rules/` remains a placeholder.
- `shared/contracts/` remains empty.

---

**Git:** not committed, not pushed.
