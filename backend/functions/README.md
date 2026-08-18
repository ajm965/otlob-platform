# Backend Functions

Firebase Cloud Functions host for the Otlob HTTPS API.

This package is the **platform skeleton**. It boots configuration, Firebase Admin, dependency injection, and a generic HTTP pipeline. It does not implement marketplace features.

## Layout

```text
backend/functions/
├── src/
│   ├── index.ts                 # Cloud Functions HTTPS export (`api`)
│   ├── composition_root.ts      # Wires config, logger, Firebase Admin, DI
│   ├── config/                  # Environment loader and typed AppConfig
│   ├── di/                      # Container + tokens
│   ├── http/                    # Express app, envelopes, middleware, meta routes
│   └── infrastructure/          # Firebase Admin + structured logger
├── .env.example
├── package.json
└── tsconfig.json
```

## Public meta routes

| Method | Path | Auth |
|--------|------|------|
| GET | `/health` | Public |
| GET | `/v1/health` | Public |
| GET | `/v1/version` | Public |

Success bodies use `{ "data": ... }`. Errors use `{ "error": { code, message, details, requestId } }`.

## Local build

From the repository root:

```bash
npm install
npm run build -w @otlob/functions
```

Requires `FIREBASE_PROJECT_ID` (or Cloud Functions default project env) at **runtime**, not at compile time.

## Deploy

Configure a Firebase project (see `docs/TECH_STACK.md` environment matrix), then use Firebase CLI against `firebase.json` (`functions.source` = `backend/functions`).
