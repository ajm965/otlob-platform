# Database Standards

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Engineering Handbook — Firestore Standards  
**Phase:** 1.8  
**Status:** Mandatory  

---

## 1. Purpose

Standards for Cloud Firestore modeling and access so Otlob can scale toward millions of users across GCC markets with predictable performance, integrity, and operability.

Logical/physical designs: `docs/DATABASE.md`, `docs/FIRESTORE_STRUCTURE.md`.

---

## 2. Collection Naming

| Rule | Example |
|------|---------|
| Plural `camelCase` | `bookings`, `technicianDocuments` |
| Stable names | Do not rename casually; version with migrations |
| Avoid opaque abbreviations | Prefer `notifications` over `ntfs` |
| Top-level for cross-parent queries | Offers, bookings, payments |
| Subcollections for high-volume children | `chats/{id}/messages` |

---

## 3. Document Naming / IDs

| Case | Strategy |
|------|----------|
| Auth-linked user | Document ID = Firebase `uid` |
| Most entities | Auto-generated IDs |
| Natural keys | Only when truly unique and stable (e.g., idempotency lookup docs) |
| Human codes | Separate field (`REQ-2026-000123`), not necessarily doc ID |

Never invent sequential global IDs that create write hotspots.

---

## 4. Field Naming

| Rule | Example |
|------|---------|
| `camelCase` | `customerId`, `amountHalalas` |
| Foreign keys | `<entity>Id` | `requestId` |
| Booleans | `is`/`has` prefixes | `isActive` |
| Enums | `snake_case` strings | `in_progress` |
| Money | Integer halalas + `currency` | `15000`, `SAR` |
| Geo | `location` + `geohash` | |
| Locale labels | `nameAr`, `nameEn` on catalog only | |

Unknown client fields must not be blindly merged (allowlist writes).

Persisted lifecycle enums come from the owning Business Engine. Product-facing aliases are read/display compatibility only and are not written as new values. Every schema enum must link to the engine lifecycle and the product reconciliation entry before implementation.

---

## 5. Timestamp Strategy

| Field | Rule |
|-------|------|
| `createdAt` | Set once on create (server timestamp) |
| `updatedAt` | Set on every mutation |
| `deletedAt` | Null or timestamp for soft delete |
| Business times | Explicit names: `startsAt`, `completedAt`, `expiresAt` |
| Client clocks | Never trusted for invariants; use server time |

Store Firestore `Timestamp` in DB; expose ISO-8601 in REST JSON.

---

## 6. Soft Delete

| Rule | Detail |
|------|--------|
| Default for domain entities | Soft delete via `deletedAt` |
| Queries | Exclude deleted unless admin/history mode |
| Unique constraints | Account for soft-deleted docs in uniqueness logic |
| Hard delete | Rare; legal/retention jobs only with audit |
| Cascades | Define per aggregate (e.g., deleting chat soft-deletes messages via job) |

---

## 7. Indexes

| Rule | Detail |
|------|--------|
| Design from query plans | No speculative composite explosion |
| Declare in `firestore.indexes.json` | Reviewed in PR |
| Every list API | Must map to an indexable query |
| Inequality limits | Respect Firestore constraints |
| Monitor slow queries | Fix with indexes or model changes |

Missing index is a production defect, not a client workaround.

---

## 8. Transactions

Use transactions / batched writes for:

- Accept offer / booking exclusivity
- Payment state transitions
- Warranty issuance idempotency
- Point ledger balance updates
- Seat/entitlement critical checks when race-prone

Rules:

- Keep transactions small and contention-aware
- Avoid hot single documents for high-write counters without sharding
- Idempotency keys for retries

---

## 9. Counters

| Approach | When |
|----------|------|
| Atomic increment on parent | Low contention (`offerCount` on request) |
| Sharded counters | High contention aggregates |
| Materialized snapshots | Dashboards / ranking inputs via workers |
| Never | Client-side unchecked increments on trust metrics |

---

## 10. Denormalization

Allowed when it serves read models (offer provider snapshot, request service names).

Rules:

- Document source of truth
- Update via Functions on source change (best effort + reconcile)
- Freeze commercial snapshots on booking/warranty
- Do not denormalize secrets

---

## 11. Scalability Rules

1. Partition by `countryCode` / market early for GCC expansion  
2. Bound arrays (FCM tokens, media URLs, evidence)  
3. Paginate all large collections  
4. Prefer append-only histories over growing monolith docs  
5. Fan-out writes asynchronously when acceptance exclusivity already reserved  
6. Avoid writing mega-documents (> hundreds of KB)  
7. Hot geohash cells: cache online provider sets with short TTL  
8. Archive cold notifications/messages per retention policy  

---

## 12. Schema Evolution

| Rule | Detail |
|------|--------|
| `schemaVersion` | On mutable domain docs |
| Additive first | Prefer new fields with defaults |
| Backfills | Versioned jobs; never rely on clients |
| Breaking reads | Dual-read period + feature flags |

---

## 13. Security Alignment

- Least privilege rules
- Sensitive mutations via backend even if rules could allow narrow writes
- Functions/API-only is the default for writes; direct reads/writes are permitted only by the matrix in `SECURITY_STANDARDS.md`
- Public/realtime projections have separate schemas from raw documents and cannot expose exact request location, private media, KYC, internal score factors, or staff notes
- See `SECURITY_STANDARDS.md` and `docs/SECURITY.md`

---

## 14. Related Documents

- `docs/DATABASE.md`
- `docs/FIRESTORE_STRUCTURE.md`
- `API_STANDARDS.md`
- `SECURITY_STANDARDS.md`
- `ARCHITECTURE_DECISIONS.md` (ADR-003)
