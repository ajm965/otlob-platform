# Authentication Foundation Report

**Sprint:** B2 — Authentication Foundation  
**Date:** 2026-08-18  

This sprint adds authentication **domain, contracts, offline mock adapters, and 501 HTTP placeholders**. It does not implement production authentication.

---

## Existing contracts discovered

### HTTP (`docs/API.md` §3)

Firebase client SDK is documented as the sign-in path. Backend endpoints are profile/session utilities only:

| Method | Path | Auth | Body / notes |
|--------|------|------|----------------|
| POST | `/auth/bootstrap` | Required | `fullName`, `locale` (`ar\|en`), `primaryRole` (`customer\|technician\|company_operator`) |
| GET | `/auth/me` | Required | user + role claims summary (no field list) |
| PATCH | `/auth/me` | Required | subset of profile fields (not roles) |
| POST | `/auth/devices` | — | `fcmToken`, `platform` (`ios\|android\|web`) |
| DELETE | `/auth/devices` | — | `fcmToken` |

No Start-OTP, Verify-OTP, or JWT routes exist in `docs/API.md`.

### Product journeys (`docs/product/USER_JOURNEYS.md` §4–§5)

- Registration: KSA phone → OTP verify → optional profile bootstrap (`fullName`, `locale`) → `users` profile with role `customer`
- Login: phone → OTP / session restore
- Invalid OTP → retry with cooldown (no numeric limits documented)
- Suspended account → blocking screen

### Errors (`docs/product/ERROR_SCENARIOS.md` §2–§3)

- Invalid phone/OTP format (HTTP 400)
- Required field missing
- Invalid enum/status
- Missing/expired token, OTP wrong, OTP rate limited, session revoked (HTTP 401)

No OTP length, resend interval, or lockout numbers are specified.

### Code already present

| Item | Location | Used in B2 |
|------|----------|------------|
| `Phone` (E.164) | `packages/core/src/value_objects/phone.ts` | Yes — not duplicated |
| `UserId`, `User`, `UserRegistered` | `backend/modules/users/domain/**` | Not copied into auth |
| `CreateUserRequest` / `UserResponse` | `backend/modules/users/application/dto/**` | Too empty for bootstrap body; auth DTOs added from API §3.1 |
| Auth module TypeScript | `backend/modules/auth/**` | **NOT FOUND** before this sprint (README folders only) |
| HTTP pipeline | `backend/functions/src/http/app.ts` | Extended with auth route registrar |

---

## New contracts created

### Repository interfaces

`IAuthenticationRepository` — `backend/modules/auth/domain/repositories/i_authentication_repository.ts`

- `save(session)`
- `findByPhone(phoneE164)`
- `findByUserId(userId)`

Not a generic `IRepository` CRUD port: Firestore has no authentication collection; `users/{uid}` is owned by the users module.

### Use cases

| Interface | Implementation | Input | Output |
|-----------|----------------|-------|--------|
| `IStartAuthenticationUseCase` | `StartAuthenticationUseCase` | `{ phone }` | `void` |
| `IVerifyOtpUseCase` | `VerifyOtpUseCase` | `{ phone, otp }` | `{ userId }` (offline id, not a JWT) |
| `ICompleteRegistrationUseCase` | `CompleteRegistrationUseCase` | `{ id, payload: bootstrap body }` | `CurrentUserResponse` |

### Domain objects

- `AuthenticationSession`
- `AuthenticationState` (`unauthenticated` \| `authenticated`)
- `AuthenticationFailure` (`validation_failed` + documented field codes)

Not created:

- `UserId` — already in `backend/modules/users/domain/entities/user_id.ts`
- `PhoneNumber` — `Phone` already in `@otlob/core`
- Domain events — none documented for the auth module (`UserRegistered` stays in users)

### DTOs (API/product only)

- `StartAuthenticationRequest.phone` — registration/login journey
- `VerifyOtpRequest.phone`, `otp` — journey verify step; **no length field**
- `CompleteRegistrationRequest` — exact POST `/auth/bootstrap` body
- `CurrentUserResponse` — bootstrap profile fields plus `id` (`users/{uid}`)
- `VerifyOtpResponse.userId` — mock principal key only

---

## HTTP routes added

Registered in `backend/functions/src/http/routes/auth_routes.ts` via existing B1 `createHttpApp` (before 404).

All handlers return **501** `{ error: { code: "not_implemented", message, details, requestId } }` using the platform envelope.

| Documented (`docs/API.md`) | Also registered (`/v1` per API_STANDARDS) |
|----------------------------|-------------------------------------------|
| POST `/auth/bootstrap` | POST `/v1/auth/bootstrap` |
| GET `/auth/me` | GET `/v1/auth/me` |
| PATCH `/auth/me` | PATCH `/v1/auth/me` |
| POST `/auth/devices` | POST `/v1/auth/devices` |
| DELETE `/auth/devices` | DELETE `/v1/auth/devices` |

Handlers do **not** call use cases, Firebase Auth, SMS, or the mock repository. Device routes are placeholders only (device registration is not implemented).

No OTP HTTP endpoints were added.

---

## Deferred integrations

- Firebase Authentication / ID token verification
- SMS / Twilio / OTP delivery
- OTP verification against a provider
- JWT / refresh tokens / session persistence
- Firestore `users/{uid}` writes
- Wiring HTTP bootstrap/me to `ICompleteRegistrationUseCase`
- Device token registry
- Suspended/revoked session enforcement
- Auth middleware on required routes

---

## Validation rules actually documented (implemented)

| Rule | Source | Implementation |
|------|--------|----------------|
| Required field missing | `ERROR_SCENARIOS.md` §2 | empty `phone`, `otp`, `fullName`, `id` → `validation_failed` / `required` |
| Invalid phone format | Journey “KSA format” + core E.164 | `@otlob/core` `Phone.create` |
| Invalid enum | API `locale`, `primaryRole` | `ar\|en`; `customer\|technician\|company_operator` |
| OTP presence | Required field | non-empty string only |

**Not implemented** (not numerically specified): OTP length, resend interval, retry limits, lockout, rate limiting, OTP correctness.

---

## Assumptions

1. Application use cases `IStartAuthenticationUseCase` / `IVerifyOtpUseCase` model the product OTP journey for a future adapter; they are not HTTP contracts.
2. `ICompleteRegistrationUseCase` is the application shape of POST `/auth/bootstrap` (`id` = uid from a future token, not a body field).
3. E.164 via existing `Phone` is the phone format contract (core already defined it).
4. `/v1` aliases are the API versioning prefix, not new resources.

---

## Known limitations

- Mock `VerifyOtpUseCase` does not compare OTP values.
- Mock `userId` is `offline:<e164>` when none exists.
- HTTP 501 is disconnected from use cases (intentional: not production auth).
- `code: not_implemented` is allowed by this sprint; it is not listed in `docs/engineering/API_STANDARDS.md` status table.
- In-memory repository is process-local and non-durable.
- `AuthenticationFailure` is not yet mapped in the Functions error middleware (HTTP does not invoke use cases).

---

## Tests executed

```text
npm test
```

| Suite | Result |
|-------|--------|
| `@otlob/backend` — mapper, use cases, in-memory repository | **6 passed** |
| `@otlob/functions` — auth route registration / 501 envelope | **2 passed** |

---

## Build result

```text
npm run build
```

**PASS** — `@otlob/core`, `@otlob/backend`, `@otlob/functions`

---

## Quality gate

| Check | Result |
|-------|--------|
| Architecture: auth in `backend/modules/auth` layers; HTTP in B1 functions host | PASS |
| Marketplace modules unmodified | PASS |
| Customer app unmodified | PASS |
| No Firebase Auth / SMS / secrets / JWT / Firestore writes | PASS |
| No undocumented OTP HTTP endpoints | PASS |
| DTOs limited to API/product fields | PASS |

---

**Git:** not committed, not pushed.
