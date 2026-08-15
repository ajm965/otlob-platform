# Firestore Structure

**Project:** Otlob Platform  
**Document Type:** Physical Data Model (Cloud Firestore)  
**Phase:** 1 — Foundation  
**Status:** Baseline  

---

## 1. Purpose

This document defines every primary Firestore collection for Otlob Platform: purpose, fields, relationships, indexes, security rule intent, and scalability notes.

**Phase 1 is design only** — no rules files or seed data are implemented here.

Money amounts are stored in **halalas** (integer). Timestamps are Firestore `Timestamp` unless noted.

This document is the canonical physical collection registry. Engine and product documents define domain behavior and UX projections; when an older field or status conflicts with this registry, the compatibility notes here apply. New collections below are architectural contracts, not implementation artifacts.

**Remediation decision:** Missing aggregates, IDs, market fields, authority/access classes, lifecycle separations, and projection/ledger boundaries are now explicit to prevent teams inventing incompatible storage. Existing ambiguous fields remain only as documented aliases or caches (`C-01`–`C-06`, `H-01`, `H-03`, `H-04`, `H-09`, `H-11`, `L-01`–`L-03`).

---

## 2. Global Conventions

### 2.1 Document Metadata (apply to all domain docs unless noted)

| Field | Type | Notes |
|-------|------|-------|
| `createdAt` | timestamp | Required |
| `updatedAt` | timestamp | Required |
| `createdBy` | string | uid or `system` |
| `updatedBy` | string | uid or `system` |
| `schemaVersion` | number | Start at `1` |
| `deletedAt` | timestamp \| null | Soft delete |
| `countryCode` | string | Required ISO 3166-1 alpha-2 market country; `SA` for KSA v1 |
| `marketId` | string | Required policy/data partition; `sa` for KSA v1 |

### 2.2 Naming

- Collections: `camelCase` plural (`serviceRequests` is aliased as `requests` below per product language)
- Fields: `camelCase`
- Enums: `snake_case` string codes

### 2.3 Collection List

| Collection | Doc ID strategy |
|------------|-----------------|
| `users` | Firebase Auth `uid` |
| `technicians` | Firebase Auth `uid`; canonical 1:1 technician profile identity |
| `companies` | Auto-ID |
| `companyMembers` | Auto-ID; unique active identity by company + user |
| `companyBranches` | Auto-ID |
| `staffMemberships` | Auto-ID |
| `services` | Auto-ID |
| `categories` | Auto-ID |
| `requests` | Auto-ID |
| `requestVisibilityGrants` | Deterministic hash/ID of request + provider + wave/policy |
| `offers` | Auto-ID |
| `bookings` | Auto-ID |
| `payments` | Auto-ID |
| `acceptanceOperations` | Deterministic hash/ID of market + idempotencyKey (or Auto-ID with unique idempotency) |
| `paymentEvents` | PSP event ID or stable provider fingerprint |
| `refunds` | Auto-ID |
| `chargebacks` | PSP case ID when stable; otherwise Auto-ID |
| `ledgerAccounts` | Stable market/currency/owner/purpose key |
| `ledgerJournals` | Auto-ID; unique source/idempotency fields |
| `ledgerEntries` | Auto-ID under `ledgerJournals/{journalId}/entries` |
| `providerBalances` | Stable market/currency/owner key; projection only |
| `payoutAccounts` | Auto-ID |
| `withdrawals` | Auto-ID |
| `payouts` | Auto-ID |
| `settlements` | PSP settlement ID |
| `reconciliationCases` | Auto-ID |
| `invoices` | Stable legal invoice identity |
| `subscriptionPlans` | Stable market + plan code + version |
| `subscriptions` | Auto-ID |
| `subscriptionInvoices` | Auto-ID |
| `reviews` | Auto-ID |
| `ratings` | No KSA v1 writes; deprecated compatibility collection |
| `notifications` | Auto-ID |
| `chats` | Auto-ID |
| `messages` | Subcollection under `chats/{chatId}/messages` |
| `disputes` | Auto-ID |
| `guarantees` | Auto-ID |
| `warrantyClaims` | Auto-ID |
| `auditLogs` | Auto-ID |
| `outboxEvents` | Auto-ID |
| `processedEvents` | Stable consumer + event identity |
| `operationsCases` | Auto-ID |
| `couponCampaigns` | Auto-ID |
| `couponRedemptions` | Auto-ID; unique campaign + booking/customer scope |
| `loyaltyAccounts` | Stable market + owner identity |
| `loyaltyLedgerEntries` | Auto-ID |
| `addresses` | Auto-ID |
| `technicianDocuments` | Auto-ID |
| `homeProfiles` | Auto-ID |
| `homeRooms` | Auto-ID |
| `homeAssets` | Auto-ID |
| `homeParts` | Auto-ID |
| `homeInvoices` | Auto-ID |
| `maintenanceSchedules` | Auto-ID |
| `homeSharingConsents` | Auto-ID |
| `maintenanceHistory` | Auto-ID |

**Decision:** Prefer top-level collections for entities that are queried across parents. Use subcollections for high-volume child streams (`messages`, `ledgerEntries`) and optional private history. All list/feed queries include `marketId`; records whose parent already provides the partition still retain `countryCode` and `marketId` for safe collection-group queries.

### 2.4 Canonical Authority and ID Decisions

- `users/{uid}` and `technicians/{uid}` share the Firebase Auth UID. A future multi-profile requirement must introduce a versioned migration rather than creating mixed identities.
- `requests` is the canonical collection name; `serviceRequests` is a documentation alias only.
- One `reviews` document stores the booking's numeric rating dimensions and optional text. The separate `ratings` collection is deprecated for KSA v1 and may be read only during migration.
- Auto-IDs are opaque internal identifiers. Human-facing codes are separate immutable fields and never authorization keys.
- Immutable ledgers, event receipts, audit logs, and posted invoices are not soft-deleted; retention and access restriction follow `COMPLIANCE_AND_RETENTION.md`.
- Authoritative aggregates and rebuildable projections are explicitly distinguished. A cached counter, public profile, provider balance, or realtime party view never becomes a source of truth.

---

## 3. `users`

### Purpose

Canonical person profile linked to Firebase Authentication. Holds role, locale, and contact facets shared across apps.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `uid` | string | Auth UID (equals doc id) |
| `roles` | array\<string\> | Canonical: `customer`, `technician`, `company_operator`, `platform_staff`. Deprecated aliases `company`/`admin` may appear only as compatibility reads |
| `primaryRole` | string | Default app context |
| `fullName` | string | Display name |
| `fullNameAr` | string \| null | Optional Arabic name |
| `phoneE164` | string \| null | E.164 phone |
| `email` | string \| null | Email |
| `photoUrl` | string \| null | Avatar |
| `locale` | string | UI language preference `ar` \| `en` |
| `preferredLocale` | string \| null | Alias/future expansion of `locale`; clients treat missing as `locale` |
| `regionalFormat` | string \| null | Optional number/date format preference distinct from UI language; default market format when null |
| `status` | string | `active`, `suspended`, `deleted` |
| `authorizationVersion` | number | Incremented when roles/memberships change |
| `companyId` | string \| null | Deprecated read cache; never authorizes access |
| `fcmTokens` | array\<string\> | Device tokens (cap size) |
| `lastLoginAt` | timestamp \| null | Last auth |

### Relationships

- 1:1 optional `technicians/{uid}`
- 1:N `addresses`, `requests`, `notifications`
- N:M companies through `companyMembers`

### Indexes

- `status` ASC + `createdAt` DESC (admin lists)
- `marketId` ASC + `status` ASC + `createdAt` DESC

### Security Rules (Intent)

- Read: owner or admin; limited public fields for counterparties via server DTOs preferred
- Create: only via trusted Auth signup Function / first login bootstrap
- Update: owner for profile fields; roles only by admin/Functions
- Delete: soft delete via admin/Function

### Scalability Notes

- Cap `fcmTokens` (e.g., max 10); prune stale tokens asynchronously
- Do not store large nested histories on user docs

---

## 4. `technicians`

### Purpose

Provider profile for individual technicians: skills, geo, verification, performance aggregates.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `userId` | string | FK → `users` |
| `displayName` | string | Public name |
| `bio` | string \| null | Short bio |
| `bioAr` | string \| null | Arabic bio |
| `serviceIds` | array\<string\> | Services offered |
| `categoryIds` | array\<string\> | Denormalized categories |
| `status` | string | `pending`, `active`, `inactive`, `rejected` |
| `verificationStatus` | string | KYC state |
| `companyId` | string \| null | Deprecated active-membership cache |
| `isIndependent` | boolean | Derived eligibility cache, not membership authority |
| `location` | geopoint \| map | Last / primary service location |
| `geohash` | string | Nearby query support |
| `serviceRadiusKm` | number | Coverage radius |
| `city` | string \| null | City code/name |
| `ratingAvg` | number | Aggregate |
| `ratingCount` | number | Aggregate |
| `completedJobsCount` | number | Aggregate |
| `subscriptionId` | string \| null | Active subscription |
| `offersEnabled` | boolean | Gate flag |

### Relationships

- 1:1 `users`
- N:M historical companies; at most one active employment membership in KSA v1
- 1:N `offers`, `technicianDocuments`, `subscriptions`

### Indexes

- `status` + `geohash`
- `serviceIds` (array-contains) + `status` + `ratingAvg`
- `companyId` + `status`
- `verificationStatus` + `updatedAt`

### Security Rules (Intent)

- Public read of non-sensitive fields for discovery (or via API only)
- Writes: owner limited fields; verification/status via admin/Functions
- Hide document numbers and internal notes

### Scalability Notes

- Geohash precision must balance query fan-out vs accuracy
- Keep aggregates updated via Functions, not client increments

---

## 5. `companies`

### Purpose

Organizations that manage multiple technicians and submit offers as a company brand.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Legal/trade name |
| `nameAr` | string \| null | Arabic name |
| `crNumber` | string \| null | Commercial registration |
| `vatNumber` | string \| null | VAT number |
| `ownerUserId` | string | Primary owner uid |
| `adminUserIds` | array\<string\> | Deprecated read cache; `companyMembers` is authoritative |
| `status` | string | `pending`, `active`, `suspended` |
| `verificationStatus` | string | Org KYC |
| `serviceIds` | array\<string\> | Offered services |
| `city` | string \| null | HQ / primary city |
| `location` | geopoint \| map \| null | HQ location |
| `geohash` | string \| null | Geo index |
| `ratingAvg` | number | Aggregate |
| `ratingCount` | number | Aggregate |
| `subscriptionId` | string \| null | Plan |

### Relationships

- 1:N technicians, offers, bookings (as provider)
- N:1 owner user

### Indexes

- `status` + `createdAt`
- `verificationStatus` + `updatedAt`
- `serviceIds` array-contains + `status`

### Security Rules (Intent)

- Read: public non-sensitive; full read for company admins/owner/platform admin
- Write: owner/admins for profile; verification via platform admin/Functions

### Scalability Notes

- Membership and branch authorization always use first-class `companyMembers` and `companyBranches`; profile arrays are compatibility caches only.

### Canonical company aggregates

| Collection | Required business fields | Authority, access, retention |
|------------|--------------------------|------------------------------|
| `companyMembers` | `companyId`, `userId`, `roleCodes[]`, `branchIds[]`, `status`, `effectiveFrom`, `effectiveTo`, `membershipVersion`, `invitedBy` | Companies module is write authority; active membership is authorization source; company/member/staff scoped; history retained with bookings |
| `companyBranches` | `companyId`, `name`, `status`, `serviceIds[]`, `location`, `geohash`, `managerMembershipIds[]` | Companies module writes; member-safe projection only; branch geo is private outside matching |
| `staffMemberships` | `userId`, `roleCodes[]`, `permissionOverrides[]`, `status`, `effectiveFrom`, `effectiveTo`, `authorizationVersion` | Identity/Security write authority; no client-direct access; privileged audit retention |

Index every company member query by `marketId + companyId + status + userId`, and branch query by `marketId + companyId + status`. A unique active technician employment membership is enforced by the Companies module.

---

## 6. `categories`

### Purpose

Top-level service taxonomy (e.g., Plumbing, Electrical, AC).

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | Stable code |
| `nameEn` | string | English label |
| `nameAr` | string | Arabic label |
| `iconUrl` | string \| null | Icon |
| `sortOrder` | number | UI ordering |
| `isActive` | boolean | Visibility |
| `descriptionEn` | string \| null | |
| `descriptionAr` | string \| null | |

### Relationships

- 1:N `services`

### Indexes

- `isActive` + `sortOrder`

### Security Rules (Intent)

- Read: authenticated (or public read if marketing needs it)
- Write: admin only

### Scalability Notes

- Small, cacheable collection; clients may cache with TTL

---

## 7. `services`

### Purpose

Bookable service types under categories (e.g., AC Gas Refill).

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `categoryId` | string | FK → categories |
| `code` | string | Stable code |
| `nameEn` | string | |
| `nameAr` | string | |
| `descriptionEn` | string \| null | |
| `descriptionAr` | string \| null | |
| `defaultWarrantyDays` | number | Used when generating guarantees |
| `isActive` | boolean | |
| `sortOrder` | number | |
| `minPriceHalalas` | number \| null | Optional advisory |
| `maxPriceHalalas` | number \| null | Optional advisory |

### Relationships

- N:1 category
- Referenced by requests, technicians, companies

### Indexes

- `categoryId` + `isActive` + `sortOrder`
- `code` ASC (unique enforced in Functions)

### Security Rules (Intent)

- Read: authenticated
- Write: admin only

### Scalability Notes

- Keep catalog modest; version codes rather than renaming meaning

---

## 8. `addresses`

### Purpose

Customer saved service locations.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `userId` | string | Owner customer |
| `label` | string | Home, Villa, etc. |
| `line1` | string | Street/building |
| `line2` | string \| null | Extra |
| `district` | string \| null | |
| `city` | string | |
| `countryCode` | string | `SA` for KSA v1 |
| `marketId` | string | `sa` for KSA v1 |
| `region` | string \| null | |
| `postalCode` | string \| null | |
| `location` | geopoint | |
| `geohash` | string | |
| `nationalAddress` | string \| null | Short national address if used |
| `isDefault` | boolean | |

### Relationships

- N:1 user
- Referenced by requests / homeProfiles

### Indexes

- `userId` + `isDefault`
- `userId` + `updatedAt`

### Security Rules (Intent)

- CRUD: owner only; admin read for support

### Scalability Notes

- Bound addresses per user (e.g., max 20)

---

## 9. `requests`

### Purpose

Customer service requests — the demand side of the marketplace.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `customerId` | string | FK → users |
| `serviceId` | string | FK → services |
| `categoryId` | string | Denormalized |
| `addressId` | string \| null | FK → addresses |
| `location` | geopoint | Service location |
| `geohash` | string | Matching |
| `city` | string | |
| `title` | string | Short title |
| `description` | string | Details |
| `preferredTimeStart` | timestamp \| null | |
| `preferredTimeEnd` | timestamp \| null | |
| `status` | string | See DATABASE.md enums |
| `offerCount` | number | Denormalized |
| `acceptedOfferId` | string \| null | |
| `bookingId` | string \| null | |
| `currency` | string | `SAR` |
| `budgetMinHalalas` | number \| null | Optional |
| `budgetMaxHalalas` | number \| null | Optional |
| `mediaUrls` | array\<string\> | Customer problem photos |
| `expiresAt` | timestamp \| null | Auto-expire |
| `serviceNameAr` | string \| null | Denormalized label |
| `serviceNameEn` | string \| null | Denormalized label |

### Relationships

- N:1 customer, service
- 1:N offers
- 1:1 optional booking

### Indexes

- `marketId` + `customerId` + `status` + `createdAt` DESC
- `marketId` + `status` + `geohash`
- `marketId` + `status` + `serviceId` + `createdAt` DESC
- `marketId` + `status` + `expiresAt`

### Security Rules (Intent)

- Create/update: owner customer through Functions
- Read: owner through API or owner-safe projection; providers never read raw request documents
- Status transitions: Functions only for open→booked/cancelled/expired

### Scalability Notes

- Nearby matching should query technicians by geo/service, not scan all requests globally
- Cap `mediaUrls` and description length

### Provider visibility aggregate

`requestVisibilityGrants` is the only pre-accept provider entitlement. Required fields are `requestId`, `providerType`, `providerId`, optional authorized `recipientUserIds`, `waveId`, `eligibilityPolicyVersion`, `status`, `expiresAt`, `revokedAt`, `revokeReason`, and a minimized `requestProjection` containing no precise address, coordinates, customer contact/identity, raw media metadata, or Home Passport data.

Matching is the write authority. Providers read only their own projection through Functions or an explicitly provider-owned realtime projection. Index by `marketId + providerId + status + expiresAt`; also index `marketId + requestId + status` for revocation. Expired projections follow the short retention policy in `COMPLIANCE_AND_RETENTION.md`.

---

## 10. `offers`

### Purpose

Technician or company quotes against an open request.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `requestId` | string | FK → requests |
| `providerType` | string | `technician` \| `company` |
| `providerId` | string | technicianId or companyId |
| `technicianUserId` | string \| null | Executing technician if known |
| `customerId` | string | Denormalized |
| `amountHalalas` | number | Quoted price |
| `currency` | string | `SAR` |
| `etaMinutes` | number \| null | Estimated arrival/start |
| `message` | string \| null | Pitch / notes |
| `status` | string | submitted/withdrawn/rejected/accepted/expired/superseded |
| `closeReason` | string \| null | Canonical competitor reason `accepted_competitor` |
| `expiresAt` | timestamp \| null | |
| `providerDisplayName` | string | Denormalized |
| `providerRatingAvg` | number \| null | Denormalized snapshot |

### Relationships

- N:1 request
- N:1 provider
- 1:1 booking when accepted

### Indexes

- `marketId` + `requestId` + `status` + `createdAt`
- `marketId` + `providerId` + `status` + `createdAt` DESC
- `marketId` + `customerId` + `status` + `createdAt` DESC
- `requestId` + `amountHalalas` ASC (comparison)

### Security Rules (Intent)

- Create: verified provider via Function (entitlement checks)
- Read: customer (request owner), offer provider, admin
- Accept/reject: customer via Function; never direct multi-client race

### Scalability Notes

- Cap max offers per request
- The request acceptance lock is synchronous. Competing offers converge asynchronously to `rejected` with `closeReason=accepted_competitor`; legacy `rejected_by_acceptance` is a read alias.

---

## 11. `bookings`

### Purpose

Confirmed work orders created when a customer accepts an offer.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `requestId` | string | |
| `offerId` | string | |
| `customerId` | string | |
| `providerType` | string | |
| `providerId` | string | |
| `technicianUserId` | string \| null | Assigned worker |
| `serviceId` | string | |
| `categoryId` | string | |
| `status` | string | confirmed/in_progress/completed/cancelled |
| `disputeStatus` | string | none/open/under_review/resolved/closed |
| `scheduledStartAt` | timestamp \| null | |
| `startedAt` | timestamp \| null | |
| `completedAt` | timestamp \| null | |
| `amountHalalas` | number | Deprecated total alias retained for compatibility |
| `priceSnapshot` | map | Immutable commercial/tax breakdown and policy versions |
| `currency` | string | `SAR` |
| `paymentId` | string \| null | |
| `guaranteeId` | string \| null | |
| `addressSnapshot` | map | Frozen address fields |
| `beforeImageUrls` | array\<string\> | |
| `afterImageUrls` | array\<string\> | |
| `chatId` | string \| null | |

### Relationships

- 1:1 request/offer (practically)
- 1:N payments (attempts), disputes
- 1:1 guarantee (after completion)
- 1:1 review opportunity

### Indexes

- `marketId` + `customerId` + `status` + `createdAt` DESC
- `marketId` + `providerId` + `status` + `createdAt` DESC
- `technicianUserId` + `status` + `scheduledStartAt`
- `status` + `updatedAt`

### Security Rules (Intent)

- Read: parties + admin
- Writes: Functions only for status/money/media finalization

### Scalability Notes

- Media arrays capped; large galleries → subcollection `bookingMedia`
- `disputed` is a deprecated booking-status read alias. New writes keep booking lifecycle and `disputeStatus` orthogonal. Open disputes hold payout and policy-defined completion/capture transitions without erasing the booking's lifecycle state.

---

## 12. `payments`

### Purpose

Customer-side PSP payment attempts for bookings. Provider settlement, earnings, and balances are represented by the canonical finance aggregates below.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `bookingId` | string | |
| `customerId` | string | |
| `providerId` | string | |
| `amountHalalas` | number | |
| `vatAmountHalalas` | number | |
| `currency` | string | `SAR` |
| `status` | string | `pending`, `authorized`, `captured`, `voided`, `authorization_expired`, `failed`, `refunded`, `partially_refunded` |
| `provider` | string | PSP name |
| `providerPaymentId` | string \| null | External id |
| `idempotencyKey` | string | Required |
| `capturedAt` | timestamp \| null | |
| `refundedAmountHalalas` | number | default 0 |
| `failureCode` | string \| null | |
| `metadata` | map \| null | Non-sensitive PSP meta |
| `commercialPolicyVersion` | string | Frozen booking policy |
| `taxPolicyVersion` | string | Frozen booking tax policy |

### Relationships

- N:1 booking
- Referenced by disputes

### Indexes

- `bookingId` + `createdAt` DESC
- `customerId` + `status` + `createdAt` DESC
- `idempotencyKey` ASC (unique via Function)
- `providerPaymentId` ASC

### Security Rules (Intent)

- No client writes
- Read: owner customer limited; provider may see payout-safe subset via API; admin full
- All mutations via Functions

### Scalability Notes

- Never store PAN/CVV
- Keep payment docs append-friendly; refunds as status + amount fields or refund subdocs

### Canonical finance aggregates

All finance collections are Functions-only, partitioned by market/currency, and governed by `FINANCE_AND_SETTLEMENT.md`.

| Collection | Required business fields | Authority and retention |
|------------|--------------------------|-------------------------|
| `paymentEvents` | `paymentId`, `provider`, `providerEventId`, `eventType`, `providerOccurredAt`, `receivedAt`, `signatureStatus`, `processingStatus` | Immutable normalized webhook receipt; Finance writes; legal/security retention |
| `refunds` | `paymentId`, `bookingId`, `amountHalalas`, `reasonCode`, `status`, `approvedBy`, `providerRefundId`, `idempotencyKey` | Finance lifecycle; party-safe DTO only |
| `chargebacks` | `paymentId`, `bookingId`, `providerCaseId`, `amountHalalas`, `reasonCode`, `status`, `respondBy`, `holdJournalId` | Finance/dispute authority; restricted |
| `ledgerAccounts` | `ownerType`, `ownerId`, `purpose`, `currency`, `status` | Stable chart of accounts; Finance writes |
| `ledgerJournals` | `sourceType`, `sourceId`, `idempotencyKey`, `status`, `postedAt`, `reversalOfJournalId` | Immutable after posting; unique source/idempotency |
| `ledgerJournals/{journalId}/entries` | `accountId`, `side`, `amountHalalas`, `lineCode` | Immutable; journal debits equal credits |
| `providerBalances` | `ownerType`, `ownerId`, `pendingHalalas`, `availableHalalas`, `heldHalalas`, `paidHalalas`, `asOfJournalId` | Rebuildable projection, never authoritative |
| `payoutAccounts` | `ownerType`, `ownerId`, `providerToken`, `verificationStatus`, `beneficiaryDisplay`, `last4`, `status` | Tokenized restricted data; no raw bank credentials |
| `withdrawals` | `ownerType`, `ownerId`, `payoutAccountId`, `amountHalalas`, `status`, `idempotencyKey`, `holdReason` | Finance writes; provider-safe DTO |
| `payouts` | `withdrawalId`, `ownerType`, `ownerId`, `amountHalalas`, `status`, `providerPayoutId`, `failureCode` | Finance writes; immutable attempts/history |
| `settlements` | `provider`, `providerSettlementId`, `periodStart`, `periodEnd`, `grossHalalas`, `feesHalalas`, `netHalalas`, `status` | Finance writes from PSP reports |
| `reconciliationCases` | `caseType`, `sourceRefs[]`, `expectedHalalas`, `actualHalalas`, `status`, `owner`, `severity`, `resolution` | Finance/operations; privileged audit retention |
| `invoices` | `invoiceNumber`, `bookingId`, `invoiceType`, `sellerIdentity`, `buyerIdentity`, `lineSnapshot`, `issuedAt`, `complianceStatus` | Immutable legal record |

Primary indexes include `marketId + ownerId + status + createdAt`, `marketId + bookingId + createdAt`, and external provider identifiers. Uniqueness is enforced by Finance for idempotency, invoice numbers, provider events, settlements, and source journals.

### Acceptance operations

`acceptanceOperations` is the durable compensation record for authorize-then-book. Required fields are `idempotencyKey`, `requestId`, `offerId`, `customerId`, `marketId`, `amountHalalas`, `currency`, `phase`, `paymentId`, `bookingId`, `authorizationStatus`, `failureCode`, `compensationStatus`, and timestamps. Phases cover at least `started`, `authorization_pending`, `authorized`, `booking_committed`, `failed`, `voiding`, and `voided`/`authorization_expired`. Finance and Offers share ownership: Offers advances marketplace phases; Finance owns PSP authorization/void convergence and reconciliation. No client-direct access.

---

## 13. `subscriptions`

### Purpose

Technician/company subscription plans controlling marketplace participation entitlements.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `ownerType` | string | `technician` \| `company` |
| `ownerId` | string | |
| `planCode` | string | e.g., `basic`, `pro` |
| `status` | string | `trialing`, `active`, `past_due`, `cancelled`, `expired` |
| `startsAt` | timestamp | |
| `endsAt` | timestamp \| null | |
| `autoRenew` | boolean | |
| `priceHalalas` | number | |
| `currency` | string | `SAR` |
| `entitlements` | map | Feature flags/limits |
| `externalSubscriptionId` | string \| null | PSP |

### Relationships

- N:1 technician or company

### Indexes

- `ownerType` + `ownerId` + `status`
- `status` + `endsAt`

### Security Rules (Intent)

- Read: owner + admin
- Write: Functions only

### Scalability Notes

- Entitlement checks cached on technician/company docs for fast gating

`subscriptionPlans` is the authoritative versioned plan/policy catalog; `subscriptionInvoices` records billing periods and financial references. A subscription freezes `planVersion`. Free entitlement policy v1 is available before paid subscriptions and is evaluated by Matching/Offers; absence of a paid subscription does not mean absence of an entitlement contract.

---

## 14. `reviews`

### Purpose

Canonical customer feedback aggregate after completed bookings, containing required numeric rating and optional text.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `bookingId` | string | |
| `requestId` | string | |
| `customerId` | string | Author |
| `providerType` | string | |
| `providerId` | string | Target |
| `technicianUserId` | string \| null | |
| `ratingValue` | number | 1–5 (denormalized convenience) |
| `title` | string \| null | |
| `body` | string \| null | Optional text; numeric rating may stand alone |
| `status` | string | `published`, `hidden`, `flagged` |
| `isAnonymous` | boolean | |

### Relationships

- 1:1 booking (unique authoring rule)
- N:1 provider

### Indexes

- `providerId` + `status` + `createdAt` DESC
- `bookingId` ASC (uniqueness in Function)
- `customerId` + `createdAt` DESC

### Security Rules (Intent)

- Create: customer via Function after completion eligibility
- Update/hide: admin moderation
- Read: public published subset; parties always

### Scalability Notes

- Moderation queue via `status=flagged`

---

## 15. `ratings` (deprecated compatibility)

### Purpose

Legacy numeric rating records. KSA v1 writes all rating dimensions into `reviews`; this collection is read-only during any migration and must not receive new records.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `bookingId` | string | |
| `customerId` | string | |
| `providerId` | string | |
| `providerType` | string | |
| `overall` | number | 1–5 |
| `punctuality` | number \| null | Optional dimension |
| `quality` | number \| null | |
| `professionalism` | number \| null | |
| `reviewId` | string \| null | Linked review |

### Relationships

- Usually 1:1 with review/booking
- Aggregates roll up to technician/company

### Indexes

- `providerId` + `createdAt` DESC
- `bookingId` ASC

### Security Rules (Intent)

- Same as reviews; Functions enforce one rating per booking

### Scalability Notes

- Do not create new records. Future extraction requires an approved versioned migration and must preserve one-feedback-per-booking identity.

---

## 16. `notifications`

### Purpose

Per-user notification inbox and delivery tracking.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `userId` | string | Recipient |
| `type` | string | e.g., `offer_received`, `booking_update` |
| `titleAr` | string | |
| `titleEn` | string | |
| `bodyAr` | string | |
| `bodyEn` | string | |
| `data` | map | Deep link payload |
| `channel` | string | `push`, `in_app`, `both` |
| `status` | string | `pending`, `sent`, `read`, `failed` |
| `readAt` | timestamp \| null | |
| `relatedEntityType` | string \| null | |
| `relatedEntityId` | string \| null | |

### Relationships

- N:1 user
- Optional links to request/offer/booking

### Indexes

- `userId` + `createdAt` DESC
- `userId` + `status` + `createdAt` DESC

### Security Rules (Intent)

- Read/update(`read`): owner
- Create: Functions/system only

### Scalability Notes

- TTL / archive old notifications
- Consider subcollection `users/{uid}/notifications` if volume high — top-level chosen for admin query flexibility; revisit under load

---

## 17. `chats`

### Purpose

Conversation threads between customer and provider, typically bound to a booking.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `participantIds` | array\<string\> | uids |
| `customerId` | string | |
| `providerId` | string | |
| `bookingId` | string \| null | Preferred binding |
| `requestId` | string \| null | |
| `lastMessageAt` | timestamp \| null | |
| `lastMessagePreview` | string \| null | |
| `status` | string | `active`, `closed` |

### Relationships

- 1:N messages (subcollection)
- N:1 booking/request

### Indexes

- `participantIds` array-contains + `lastMessageAt` DESC
- `bookingId` ASC

### Security Rules (Intent)

- Read: participants + admin
- Create: Functions when booking confirmed (or controlled request chat policy)

### Scalability Notes

- Do not store full message history on chat doc

---

## 18. `messages` (subcollection)

**Path:** `chats/{chatId}/messages/{messageId}`

### Purpose

Individual chat messages.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `senderId` | string | |
| `type` | string | `text`, `image`, `system` |
| `text` | string \| null | |
| `mediaUrl` | string \| null | |
| `createdAt` | timestamp | |
| `deletedAt` | timestamp \| null | |

### Relationships

- N:1 chat

### Indexes

- `createdAt` ASC (per chat pagination)

### Security Rules (Intent)

- Read: chat participants
- Create: participants with rate limits (prefer Function for moderation hooks)
- Delete: soft delete by sender/admin

### Scalability Notes

- Paginate; archive cold chats later if needed

---

## 19. `disputes`

### Purpose

Formal conflicts on bookings/payments requiring resolution.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `bookingId` | string | |
| `openedBy` | string | uid |
| `customerId` | string | |
| `providerId` | string | |
| `reasonCode` | string | |
| `description` | string | |
| `status` | string | open/under_review/resolved/closed/appealed |
| `evidenceUrls` | array\<string\> | |
| `resolutionCode` | string \| null | |
| `resolutionNotes` | string \| null | |
| `resolvedBy` | string \| null | admin uid |
| `resolvedAt` | timestamp \| null | |
| `paymentId` | string \| null | |
| `appealOfDisputeId` | string \| null | Appeal lineage |

### Relationships

- N:1 booking
- Optional payment linkage

### Indexes

- `status` + `createdAt`
- `bookingId` ASC
- `customerId` + `status`
- `providerId` + `status`

### Security Rules (Intent)

- Open: party via Function
- Resolve: admin only
- Read: parties + admin

### Scalability Notes

- Evidence capped; large files in Storage

---

## 20. `guarantees`

### Purpose

Warranties generated after eligible job completion.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `bookingId` | string | |
| `customerId` | string | |
| `providerId` | string | |
| `serviceId` | string | |
| `status` | string | active/expired/void |
| `startsAt` | timestamp | |
| `endsAt` | timestamp | |
| `coverageDays` | number | |
| `termsCode` | string | Template version |
| `acceptedClaimCount` | number | Rebuildable claim projection |

### Relationships

- 1:1 booking (typically)
- N:1 customer/provider

### Indexes

- `customerId` + `status` + `endsAt`
- `bookingId` ASC
- `status` + `endsAt`

### Security Rules (Intent)

- Create: system Functions on completion
- Read: parties + admin
- Claim/void: Functions/admin

### Scalability Notes

- Expiry job periodically transitions `active` → `expired`
- `claimed` is a deprecated read alias from the former single-claim model and is never written. A guarantee stays `active` across accepted claims until expiry or void.

### Canonical warranty claim aggregate

`warrantyClaims` required fields are `guaranteeId`, `bookingId`, `customerId`, `providerId`, `status`, `description`, `evidenceRefs[]`, `eligibilityDecision`, `decisionReasonCodes[]`, `reworkBookingId`, `disputeId`, `slaDueAt`, `resolvedAt`, and claim-policy version.

Claim statuses are `submitted`, `under_review`, `accepted`, `rework_scheduled`, `rework_in_progress`, `resolved`, `rejected`, `cancelled`, and `escalated`. Warranty is write authority; evidence follows restricted-media retention. Index by `marketId + guaranteeId + createdAt`, `marketId + customerId + status + createdAt`, and `marketId + status + slaDueAt`.

---

## 21. `technicianDocuments`

### Purpose

Metadata for KYC and professional documents stored in Firebase Storage.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `technicianId` | string | |
| `userId` | string | |
| `docType` | string | `national_id`, `license`, `certificate`, … |
| `storagePath` | string | Storage object path |
| `fileName` | string | |
| `contentType` | string | |
| `status` | string | unsubmitted/pending/approved/rejected |
| `reviewedBy` | string \| null | |
| `reviewedAt` | timestamp \| null | |
| `rejectionReason` | string \| null | |
| `expiresAt` | timestamp \| null | Doc expiry |

### Relationships

- N:1 technician

### Indexes

- `technicianId` + `docType`
- `status` + `updatedAt`

### Security Rules (Intent)

- Read: owner + admin
- Write metadata: Functions after successful upload validation
- Raw files: Storage rules (see SECURITY.md)

### Scalability Notes

- Never store document images inline in Firestore

---

## 22. `homeProfiles`

### Purpose

Customer home/property profiles for richer service context.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `customerId` | string | |
| `addressId` | string \| null | |
| `name` | string | e.g., My Villa |
| `propertyType` | string | apartment/villa/office/... |
| `sizeSqm` | number \| null | |
| `floors` | number \| null | |
| `notes` | string \| null | |
| `location` | geopoint \| null | |

### Relationships

- N:1 customer
- 1:N homeAssets, maintenanceHistory

### Indexes

- `customerId` + `updatedAt`

### Security Rules (Intent)

- CRUD: owner; admin read for support

### Scalability Notes

- Bound homes per customer

---

## 23. `homeAssets`

### Purpose

Appliances/systems inside a home (AC units, heaters, etc.).

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `homeProfileId` | string | |
| `customerId` | string | |
| `assetType` | string | |
| `brand` | string \| null | |
| `model` | string \| null | |
| `serialNumber` | string \| null | |
| `installedAt` | timestamp \| null | |
| `notes` | string \| null | |
| `serviceIdHints` | array\<string\> | Related services |

### Relationships

- N:1 homeProfile
- 1:N maintenanceHistory

### Indexes

- `homeProfileId` + `assetType`
- `customerId` + `updatedAt`

### Security Rules (Intent)

- CRUD: owner; admin read

### Scalability Notes

- Keep serial numbers access-restricted in APIs

---

## 24. `maintenanceHistory`

### Purpose

Historical maintenance events for homes/assets, including marketplace bookings and manual entries.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `customerId` | string | |
| `homeProfileId` | string | |
| `homeAssetId` | string \| null | |
| `bookingId` | string \| null | If from platform job |
| `serviceId` | string \| null | |
| `title` | string | |
| `description` | string \| null | |
| `performedAt` | timestamp | |
| `providerName` | string \| null | Snapshot |
| `costHalalas` | number \| null | |
| `source` | string | `booking`, `manual` |

### Relationships

- N:1 homeProfile / optional asset / optional booking

### Indexes

- `homeProfileId` + `performedAt` DESC
- `homeAssetId` + `performedAt` DESC
- `customerId` + `performedAt` DESC

### Security Rules (Intent)

- Read/write: owner; system may append on booking completion
- Admin read for support

### Scalability Notes

- Append-only preferred; edits audited

---

## 25. Cross-Collection Transaction Recipes (Design)

### Accept Offer

The canonical acceptance decision is in `FINANCE_AND_SETTLEMENT.md`: authorize customer funds first, then transactionally lock the request, accept the winner, create the confirmed booking/payment record, and append outbox events under the same platform idempotency key. Competing offers close asynchronously to `rejected` with reason `accepted_competitor`; the request lock makes every non-winner accept a conflict during that lag.

### Complete Job

1. Verify booking `in_progress` and media requirements
2. Set booking `completed`
3. Capture payment if needed
4. Create guarantee
5. Append maintenanceHistory
6. Notify customer to review

### Canonical supporting aggregates

| Collection group | Source of truth, write authority, access, retention |
|------------------|-----------------------------------------------------|
| `auditLogs` | Immutable privileged/security/financial action record; Security-owned; no client access; legal/control retention |
| `outboxEvents` / `processedEvents` | Durable event delivery and deduplication records; producer/consumer owned under `ASYNC_WORKFLOWS.md`; minimized payload and operational retention |
| `operationsCases` | Moderation/support queue with case type, subject refs, assignee, SLA, status, decision, and audit refs; Operations/Trust authority; permission-scoped |
| `couponCampaigns` / `couponRedemptions` | Pricing owns campaign policy; redemption is immutable per booking/customer constraint and links funding liability to finance |
| `loyaltyAccounts` / `loyaltyLedgerEntries` | Loyalty account is a projection; immutable point entries are authoritative and keyed to source/reversal events |
| Home Passport extensions | `homeRooms`, `homeParts`, `homeInvoices`, `maintenanceSchedules`, and `homeSharingConsents` are Home-owned, owner-private, market-partitioned aggregates; consent is required for third-party sharing |

Each aggregate includes metadata, market partition, stable references, lifecycle status where applicable, policy version, and PII/retention class. Query indexes always begin with `marketId` and then owner/status/time fields for the documented list path.

---

## 26. Composite Index Registry (Initial)

> Exact `firestore.indexes.json` is produced in Phase 2. Below is the planning registry.

| Collection | Fields | Use case |
|------------|--------|----------|
| requests | marketId ASC, customerId ASC, status ASC, createdAt DESC | Customer list |
| requestVisibilityGrants | marketId ASC, providerId ASC, status ASC, expiresAt ASC | Privacy-safe provider feed |
| offers | marketId ASC, requestId ASC, status ASC, createdAt ASC | Compare offers |
| offers | marketId ASC, providerId ASC, status ASC, createdAt DESC | Provider history |
| bookings | marketId ASC, customerId ASC, status ASC, createdAt DESC | Customer bookings |
| bookings | marketId ASC, providerId ASC, status ASC, createdAt DESC | Provider bookings |
| payments | marketId ASC, customerId ASC, status ASC, createdAt DESC | Payment history |
| notifications | userId ASC, createdAt DESC | Inbox |
| reviews | marketId ASC, providerId ASC, status ASC, createdAt DESC | Public reviews |
| disputes | marketId ASC, status ASC, createdAt ASC | Admin queue |
| technicians | marketId ASC, status ASC, geohash ASC | Nearby providers |
| subscriptions | marketId ASC, ownerId ASC, status ASC | Entitlement lookup |
| companyMembers | marketId ASC, companyId ASC, status ASC, userId ASC | Membership authorization |
| warrantyClaims | marketId ASC, guaranteeId ASC, createdAt DESC | Claim history |
| payouts | marketId ASC, ownerId ASC, status ASC, createdAt DESC | Payout history |

---

## 27. Security Rules Summary Matrix

| Collection | Client read | Client write | Notes |
|------------|-------------|--------------|-------|
| users | owner projection | allowlisted profile fields only | roles/status/verification via Functions |
| technicians | public projection | none | mutations via Functions |
| companies | public projection | none | mutations via Functions |
| categories/services | auth projection | none | catalog admin via Functions |
| addresses | none direct | none | all CRUD via Functions |
| requests | owner projection only | none | Providers never read raw requests |
| requestVisibilityGrants | provider-owned projection | none | Matching/Functions create and revoke |
| offers | parties/projection | none | Functions only |
| bookings | parties/projection | none | Functions only |
| payments | none direct | none | Functions only; DTO via API |
| acceptanceOperations | none direct | none | Functions/Finance/Offers compensation |
| subscriptions | owner DTO via API | none | Functions only |
| reviews | published/parties | none | Functions only |
| ratings | compatibility read only | none | Deprecated |
| notifications | owner | mark-read only if published contract retains it | create system |
| chats/messages | participants/projection | none in v1 | Functions canonical |
| disputes | parties projection | none | open/resolve via Function |
| guarantees/warrantyClaims | parties projection | none | system/Functions |
| technicianDocuments | owner/admin DTO | none | Functions |
| companyMembers/branches | member projection | none | Functions only |
| finance/ledger/payout | none direct | none | Role-specific API DTOs only |
| audit/outbox/operations | none direct | none | Internal/permission-scoped APIs |
| home* / maintenance | owner projection | none | Functions |

Full narrative: `SECURITY.md`.

---

## 28. Scalability Guardrails

1. Bound arrays (tokens, media, evidence)
2. Prefer summary counters with transactional increments
3. No unbounded subcollections without pagination strategy
4. Archive terminal notifications and closed chats by policy
5. Separate hot geo indexes from cold historical data if growth requires

---

## 29. Related Documents

- `DATABASE.md`
- `API.md`
- `BUSINESS_RULES.md`
- `SECURITY.md`
- `ARCHITECTURE.md`
- `FINANCE_AND_SETTLEMENT.md`
- `AUTHORIZATION_AND_DATA_ACCESS.md`
- `ASYNC_WORKFLOWS.md`
- `COMPLIANCE_AND_RETENTION.md`
