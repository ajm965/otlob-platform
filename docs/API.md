# API

**Project:** Otlob Platform  
**Document Type:** REST API Design Specification  
**Phase:** 1 — Foundation  
**Status:** Baseline (design only — no implementation)  

---

## 1. Purpose

This document defines the REST API surface for Otlob Platform. Clients (Customer app external, Technician app future, Admin panel future) integrate against these contracts.

**No GraphQL. REST only.**

**Remediation decision:** This contract now applies the mandatory response envelope/request ID, market scope, authorization taxonomy, privacy-safe provider feed, finance and company membership contracts, missing engine actions, warranty claims, dispute appeals, and realtime boundary. Existing route names remain compatible or explicitly deprecated (`C-02`–`C-05`, `H-04`, `H-09`, `H-10`, `H-13`, `M-09`).

---

## 2. General Conventions

### 2.1 Base URL

| Environment | Base URL (illustrative) |
|-------------|-------------------------|
| Development | `https://api-dev.otlob.sa/v1` |
| Staging | `https://api-staging.otlob.sa/v1` |
| Production | `https://api.otlob.sa/v1` |

Actual hosting may be Cloud Functions HTTPS endpoints behind a domain/API gateway.

### 2.2 Authentication

- Header: `Authorization: Bearer <Firebase ID Token>`
- Unauthenticated endpoints are explicitly marked (`public`)
- Staff endpoints require coarse `platform_staff` claim plus authoritative permission/membership checks

### 2.3 Content Type

- Request/Response: `application/json; charset=utf-8`
- Multipart only for direct upload handshake endpoints if used; prefer signed upload URLs

### 2.4 Localization

- Header: `Accept-Language: ar` or `en` (default `ar`)
- Error messages may be localized; error `code` remains stable English snake_case

### 2.5 Money

- All amounts in **halalas** (integer)
- Currency field included where relevant (`SAR`)

### 2.6 Idempotency

Required header for unsafe financial / acceptance operations:

```http
Idempotency-Key: <uuid>
```

### 2.7 Pagination

Query params:

| Param | Description |
|-------|-------------|
| `pageSize` | Default 20, max 100 |
| `pageToken` | Opaque cursor |

Response envelope:

```json
{
  "data": {
    "items": [],
    "nextPageToken": "string|null"
  }
}
```

All successful JSON responses use `{ "data": ... }`, including single resources, actions, health, and upload handshakes. `204` has no body. Examples later in this document that show only a domain object are shorthand for the value inside `data`, not exceptions.

### 2.8 Standard Error Shape

```json
{
  "error": {
    "code": "offer_already_accepted",
    "message": "Human readable message",
    "details": {},
    "requestId": "string"
  }
}
```

### 2.9 Market partition

Authenticated APIs derive the permitted `marketId` from the user context; public catalog routes require an approved market selector. Every list/feed query is constrained by `marketId`. KSA v1 uses `countryCode=SA`, `marketId=sa`, `currency=SAR`. A client cannot gain cross-market access by supplying a query parameter.

### 2.10 Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Validation error |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Not found |
| 409 | Conflict (state/idempotency) |
| 429 | Rate limited |
| 500 | Internal error |

---

## 3. Authentication APIs

> Firebase client SDK typically handles sign-in. These endpoints cover profile bootstrap and session utilities.

### 3.1 Bootstrap current user

```http
POST /auth/bootstrap
```

**Auth:** Required  
**Purpose:** Create/update `users/{uid}` on first login  
**Body:**

```json
{
  "fullName": "string",
  "locale": "ar|en",
  "primaryRole": "customer|technician|company_operator"
}
```

**Response:** `200` user profile

### 3.2 Get current user

```http
GET /auth/me
```

**Auth:** Required  
**Response:** user + role claims summary

### 3.3 Update current user profile

```http
PATCH /auth/me
```

**Auth:** Required  
**Body:** subset of profile fields (not roles)

### 3.4 Register device token

```http
POST /auth/devices
```

**Body:** `{ "fcmToken": "string", "platform": "ios|android|web" }`

### 3.5 Logout device token

```http
DELETE /auth/devices
```

**Body:** `{ "fcmToken": "string" }`

---

## 4. Catalog APIs

### 4.1 List categories

```http
GET /categories
```

**Auth:** Required (or public if product decides)  
**Query:** `activeOnly=true`

### 4.2 List services

```http
GET /services
```

**Query:** `categoryId`, `activeOnly`

### 4.3 Get service

```http
GET /services/{serviceId}
```

### 4.4 Admin upsert category

```http
PUT /admin/categories/{categoryId}
```

**Auth:** Admin

### 4.5 Admin upsert service

```http
PUT /admin/services/{serviceId}
```

**Auth:** Admin

---

## 5. Addresses APIs

### 5.1 List my addresses

```http
GET /addresses
```

### 5.2 Create address

```http
POST /addresses
```

### 5.3 Update address

```http
PATCH /addresses/{addressId}
```

### 5.4 Delete address (soft)

```http
DELETE /addresses/{addressId}
```

### 5.5 Set default address

```http
POST /addresses/{addressId}/default
```

---

## 6. Requests APIs

### 6.1 Create request

```http
POST /requests
```

**Auth:** Customer  
**Body (example):**

```json
{
  "serviceId": "string",
  "addressId": "string",
  "title": "string",
  "description": "string",
  "preferredTimeStart": "ISO-8601|null",
  "preferredTimeEnd": "ISO-8601|null",
  "budgetMinHalalas": 0,
  "budgetMaxHalalas": 0,
  "mediaUrls": []
}
```

Persistable write fields today: `serviceId`, `description`, `preferredTimeStart`, `preferredTimeEnd`.  
`title`, `addressId`, `budgetMinHalalas`, `budgetMaxHalalas`, and `mediaUrls` remain `[MVP]` (`docs/product/ACCEPTANCE_CRITERIA.md` AC-REQ-01/03). Until the `ServiceRequest` aggregate and Address module persist them, `POST /requests` rejects those keys with `validation_failed` (`docs/DATABASE.md` §18; `docs/engineering/API_STANDARDS.md` §1).

**Response:** `201` request

### 6.2 List my requests

```http
GET /requests
```

**Query:** `status`, pagination

### 6.3 Get request

```http
GET /requests/{requestId}
```

**Auth:** Owner customer or permission-scoped staff. Providers never receive raw request documents.

### 6.4 Update request (pre-open or limited fields)

```http
PATCH /requests/{requestId}
```

### 6.5 Publish / open request

```http
POST /requests/{requestId}/publish
```

**Purpose:** Transition draft → open; triggers nearby notification workflow

### 6.6 Cancel request

```http
POST /requests/{requestId}/cancel
```

**Body:** `{ "reasonCode": "string", "note": "string|null" }`

### 6.7 List offers for request

```http
GET /requests/{requestId}/offers
```

**Auth:** Request owner (customer), admin

### 6.8 Nearby open requests for providers

```http
GET /provider/requests/nearby
```

**Auth:** Technician/Company  
**Query:** `serviceId`, `radiusKm`, pagination  
**Purpose:** Feed of unexpired `requestVisibilityGrants`. Response contains only privacy-minimized request projections; exact location/customer identity/contact and raw media metadata are excluded.

---

## 7. Offers APIs

### 7.1 Submit offer

```http
POST /offers
```

**Auth:** Technician/Company (verified + entitlement)  
**Body:**

```json
{
  "requestId": "string",
  "amountHalalas": 15000,
  "etaMinutes": 60,
  "message": "string|null"
}
```

**Response:** `201` offer

### 7.2 List my offers (provider)

```http
GET /offers
```

**Query:** `status`

### 7.3 Get offer

```http
GET /offers/{offerId}
```

### 7.4 Withdraw offer

```http
POST /offers/{offerId}/withdraw
```

### 7.5 Edit draft/submitted offer

```http
PATCH /offers/{offerId}
```

**Auth:** Offer provider  
**Purpose:** Apply engine-permitted edits while the offer remains editable. Price-affecting edits produce a new pricing validation version and never mutate an accepted offer.

### 7.6 Validate/finalize offer price

```http
POST /offers/{offerId}/pricing/validate
POST /offers/{offerId}/finalize
```

**Auth:** Offer provider  
**Purpose:** Validate the versioned commercial breakdown, then freeze the submitted offer. Suggestion-only pricing remains available at `POST /pricing/suggestions` and does not authorize acceptance.

### 7.7 Accept offer

```http
POST /offers/{offerId}/accept
```

**Auth:** Customer (request owner)  
**Headers:** `Idempotency-Key` required  
**Body:** PSP confirmation/tokenization input defined by the selected adapter; raw card data is never accepted  
**Effects:** Authorizes funds first, then locks the request, accepts the winner, and creates booking/payment under the same idempotency key. Competing offers close asynchronously; their accept attempts immediately conflict on the request lock.  
**Response:** `200` `{ "data": { "booking": {...}, "offer": {...}, "payment": {...} } }`; indeterminate PSP outcomes return a retry-safe pending contract.

### 7.8 Reject offer

```http
POST /offers/{offerId}/reject
```

**Auth:** Customer

---

## 8. Bookings APIs

### 8.1 List my bookings

```http
GET /bookings
```

**Auth:** Customer or provider (role-scoped)  
**Query:** `status`, pagination

### 8.2 Get booking

```http
GET /bookings/{bookingId}
```

### 8.3 Start job

```http
POST /bookings/{bookingId}/start
```

**Auth:** Assigned technician / company dispatcher policy  
**Body:** `{ "beforeImageUrls": ["..."] }` (min count enforced)

### 8.4 Complete job

```http
POST /bookings/{bookingId}/complete
```

**Body:** `{ "afterImageUrls": ["..."] }`  
**Effects:** May capture payment; create guarantee; notify review

### 8.5 Cancel booking

```http
POST /bookings/{bookingId}/cancel
```

**Body:** `{ "reasonCode": "string", "note": "string|null" }`  
**Effects:** Payment void/refund per policy

### 8.6 Assign technician (company)

```http
POST /bookings/{bookingId}/assign-technician
```

**Auth:** Company admin  
**Body:** `{ "technicianUserId": "string" }`

---

## 9. Payments APIs

### 9.1 Create payment intent for booking (deprecated compatibility)

```http
POST /payments/intents
```

**Auth:** Customer  
**Headers:** `Idempotency-Key`  
**Body:** `{ "bookingId": "string" }`  
**Response:** client secrets / redirect params (PSP-specific, abstracted)  
**Deprecation:** Not used for normal KSA v1 acceptance. Retained only for approved retry/recovery and legacy migration; new clients authorize through offer acceptance.

### 9.2 Get payment

```http
GET /payments/{paymentId}
```

### 9.3 List payments for booking

```http
GET /bookings/{bookingId}/payments
```

### 9.4 Refund payment (admin or policy-driven)

```http
POST /payments/{paymentId}/refund
```

**Auth:** Admin (or system rules)  
**Body:** `{ "amountHalalas": 0, "reasonCode": "string" }`

### 9.5 PSP webhook

```http
POST /webhooks/payments/{provider}
```

**Auth:** Signature verification (not user bearer)  
**Purpose:** Drive payment state machine

### 9.6 Provider earnings and payouts

```http
GET  /provider/earnings
GET  /provider/ledger
GET  /provider/payout-accounts
POST /provider/payout-accounts
POST /provider/withdrawals
GET  /provider/withdrawals
GET  /provider/payouts
```

**Auth:** Independent technician or authorized company finance member  
**Decision:** Responses are ledger-derived, payout-safe DTOs. Company-attributed earnings are visible/withdrawable by the company beneficiary, not the assigned technician. No raw ledger/account documents are client-readable.

### 9.7 Finance operations

```http
GET  /staff/finance/reconciliation-cases
POST /staff/finance/reconciliation-cases/{caseId}/resolve
POST /staff/finance/payouts/{payoutId}/actions
```

**Auth:** `platform_staff` plus explicit finance permission and required second approval. All access is audited.

---

## 10. Subscriptions APIs

### 10.1 List available plans

```http
GET /subscriptions/plans
```

### 10.2 Get my subscription

```http
GET /subscriptions/me
```

**Auth:** Technician/Company

### 10.3 Start subscription

```http
POST /subscriptions
```

**Body:** `{ "planCode": "pro" }`  
**Headers:** `Idempotency-Key`

### 10.4 Cancel subscription

```http
POST /subscriptions/{subscriptionId}/cancel
```

### 10.5 Admin grant/revoke entitlements

```http
POST /admin/subscriptions/{subscriptionId}/actions
```

**Auth:** Admin

---

## 11. Companies APIs

### 11.1 Register company

```http
POST /companies
```

**Auth:** Authenticated user becoming company owner

### 11.2 Get company

```http
GET /companies/{companyId}
```

### 11.3 Update company

```http
PATCH /companies/{companyId}
```

**Auth:** Company owner/admin

### 11.4 List company technicians

```http
GET /companies/{companyId}/technicians
```

### 11.5 Add technician to company

```http
POST /companies/{companyId}/technicians
```

**Body:** `{ "technicianUserId": "string" }`

### 11.6 Remove technician

```http
DELETE /companies/{companyId}/technicians/{technicianUserId}
```

### 11.7 Admin verify company

```http
POST /admin/companies/{companyId}/verification
```

**Body:** `{ "status": "approved|rejected", "reason": "string|null" }`

### 11.8 Company memberships

```http
GET    /companies/{companyId}/members
POST   /companies/{companyId}/members/invitations
PATCH  /companies/{companyId}/members/{membershipId}
DELETE /companies/{companyId}/members/{membershipId}
```

Membership resources carry company roles and optional branch scope. The former technician add/remove routes remain compatibility aliases to technician-membership operations.

### 11.9 Company branches

```http
GET   /companies/{companyId}/branches
POST  /companies/{companyId}/branches
PATCH /companies/{companyId}/branches/{branchId}
```

**Auth:** Active company owner/admin; branch managers have only explicitly scoped actions.

---

## 12. Technicians APIs

### 12.1 Upsert technician profile

```http
PUT /technicians/me
```

### 12.2 Get technician public profile

```http
GET /technicians/{technicianId}
```

### 12.3 Update services / radius

```http
PATCH /technicians/me/services
```

### 12.4 Update location

```http
PUT /technicians/me/location
```

**Body:** `{ "lat": 0, "lng": 0 }`

### 12.5 Submit documents metadata after upload

```http
POST /technicians/me/documents
```

### 12.6 List my documents

```http
GET /technicians/me/documents
```

### 12.7 Admin verify technician

```http
POST /admin/technicians/{technicianId}/verification
```

### 12.8 Admin list technicians

```http
GET /admin/technicians
```

**Query:** `verificationStatus`, `status`

---

## 13. Notifications APIs

### 13.1 List my notifications

```http
GET /notifications
```

### 13.2 Mark notification read

```http
POST /notifications/{notificationId}/read
```

### 13.3 Mark all read

```http
POST /notifications/read-all
```

### 13.4 Admin/system send (internal)

```http
POST /internal/notifications
```

**Auth:** Service account / admin only

---

## 14. Reviews & Ratings APIs

### 14.1 Create review + rating

```http
POST /reviews
```

**Auth:** Customer  
**Body:**

```json
{
  "bookingId": "string",
  "overall": 5,
  "punctuality": 5,
  "quality": 5,
  "professionalism": 5,
  "title": "string|null",
  "body": "string",
  "isAnonymous": false
}
```

### 14.2 List reviews for provider

```http
GET /providers/{providerType}/{providerId}/reviews
```

### 14.3 Get review

```http
GET /reviews/{reviewId}
```

### 14.4 Admin moderate review

```http
POST /admin/reviews/{reviewId}/moderation
```

**Body:** `{ "status": "published|hidden|flagged" }`

---

## 15. Disputes APIs

### 15.1 Open dispute

```http
POST /disputes
```

**Auth:** Customer or provider party on booking  
**Body:** `{ "bookingId": "string", "reasonCode": "string", "description": "string", "evidenceUrls": [] }`

### 15.2 List my disputes

```http
GET /disputes
```

### 15.3 Get dispute

```http
GET /disputes/{disputeId}
```

### 15.4 Add evidence

```http
POST /disputes/{disputeId}/evidence
```

### 15.5 Admin resolve dispute

```http
POST /admin/disputes/{disputeId}/resolve
```

**Body:** `{ "resolutionCode": "string", "resolutionNotes": "string", "refundAmountHalalas": 0 }`

### 15.6 Appeal dispute decision

```http
POST /disputes/{disputeId}/appeals
```

**Auth:** Eligible booking party  
**Purpose:** Create an auditable appeal linked to the original decision, subject to deadline and one-active-appeal policy.

---

## 16. Guarantees APIs

### 16.1 List my guarantees

```http
GET /guarantees
```

**Auth:** Customer (and provider scoped views)

### 16.2 Get guarantee

```http
GET /guarantees/{guaranteeId}
```

### 16.3 Claim guarantee

```http
POST /guarantees/{guaranteeId}/claim
```

**Body:** `{ "description": "string", "mediaUrls": [] }`  
**Effects:** Creates a separate `warrantyClaims` record. The guarantee remains `active` until expiry/void.

### 16.4 Get/list warranty claims

```http
GET /guarantees/{guaranteeId}/claims
GET /warranty-claims/{claimId}
```

### 16.5 Claim actions

```http
POST /warranty-claims/{claimId}/cancel
POST /staff/warranty-claims/{claimId}/decision
POST /staff/warranty-claims/{claimId}/escalate
```

Every transition preserves claim evidence/SLA history; accepted claims may create linked rework bookings.

### 16.6 Admin void guarantee

```http
POST /admin/guarantees/{guaranteeId}/void
```

---

## 17. Home Profiles & Assets APIs

### 17.1 CRUD home profiles

```http
GET    /home-profiles
POST   /home-profiles
PATCH  /home-profiles/{homeProfileId}
DELETE /home-profiles/{homeProfileId}
```

### 17.2 CRUD home assets

```http
GET    /home-profiles/{homeProfileId}/assets
POST   /home-profiles/{homeProfileId}/assets
PATCH  /home-assets/{homeAssetId}
DELETE /home-assets/{homeAssetId}
```

### 17.3 Maintenance history

```http
GET  /home-profiles/{homeProfileId}/maintenance-history
POST /home-profiles/{homeProfileId}/maintenance-history
```

Manual entries allowed; booking completion also appends automatically.

---

## 18. Chat APIs

### 18.1 List my chats

```http
GET /chats
```

### 18.2 Get chat

```http
GET /chats/{chatId}
```

### 18.3 List messages

```http
GET /chats/{chatId}/messages
```

### 18.4 Send message

```http
POST /chats/{chatId}/messages
```

**Body:** `{ "type": "text|image", "text": "string|null", "mediaUrl": "string|null" }`

---

## 19. Media Upload APIs

### 19.1 Create signed upload URL

```http
POST /media/upload-urls
```

**Body:**

```json
{
  "purpose": "request_media|before_image|after_image|technician_document|dispute_evidence|chat_image",
  "contentType": "image/jpeg",
  "byteSize": 12345,
  "relatedEntityType": "booking",
  "relatedEntityId": "string|null"
}
```

**Response:** `{ "uploadUrl": "...", "storagePath": "...", "expiresAt": "..." }`

Clients upload directly to Storage, then reference returned path/URL in domain APIs.

---

## 20. Admin APIs (Summary)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/admin/users` | Search users |
| POST | `/admin/users/{uid}/suspend` | Suspend user |
| GET | `/admin/requests` | Monitor requests |
| GET | `/admin/bookings` | Monitor bookings |
| GET | `/admin/metrics/overview` | Ops dashboard metrics |

All staff routes require `platform_staff`, an active `staffMemberships` record, route-specific permission, and audit logging. `/admin/*` remains a compatibility namespace; new privileged routes may use `/staff/*`.

---

## 21. Health & Meta

### 21.1 Health check

```http
GET /health
```

**Auth:** Public  
**Response:** `{ "data": { "status": "ok", "version": "string" } }`

### 21.2 OpenAPI

Future Phase 2 artifact: `shared/contracts/openapi.yaml` mirroring this document.

---

## 22. Authorization Matrix (Endpoint Classes)

| Class | Roles |
|-------|-------|
| Customer domain | `customer` |
| Provider domain | `technician`, `company_operator` plus eligibility/membership |
| Shared party reads | participants of entity |
| Staff domain | `platform_staff` plus active scoped staff membership |
| Webhooks | signature auth |
| Internal | service accounts |

Resource ownership is always re-checked server-side.

Provider matching eligibility is represented by a valid request visibility grant; it is not a role or claim. Company/branch permissions come from membership records. Deprecated `company` and `admin` claim aliases require authoritative membership lookup and grant no standalone permission.

---

## 23. Realtime and Direct-Access Contract

Commands and sensitive reads use this API. Optional realtime listeners are limited to documented party-owned projections for offers, bookings, chat, notifications, and provider visibility grants. Raw requests, finance, staff queues, memberships, addresses, and Home Passport records are never exposed merely because Firestore supports listeners.

The canonical collection-by-operation matrix and projection privacy rules are in `AUTHORIZATION_AND_DATA_ACCESS.md`.

---

## 24. Versioning Policy

- URL version prefix `/v1`
- Additive changes preferred
- Breaking changes require `/v2` and migration window
- Deprecations announced in release notes

---

## 25. Related Documents

- `BUSINESS_RULES.md`
- `FIRESTORE_STRUCTURE.md`
- `SECURITY.md`
- `ARCHITECTURE.md`
- `CODING_STANDARDS.md`
- `AUTHORIZATION_AND_DATA_ACCESS.md`
- `FINANCE_AND_SETTLEMENT.md`
- `ASYNC_WORKFLOWS.md`
- `COMPLIANCE_AND_RETENTION.md`
