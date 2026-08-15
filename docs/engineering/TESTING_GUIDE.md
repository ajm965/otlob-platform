# Testing Guide

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Engineering Handbook — Testing Philosophy & Standards  
**Phase:** 1.8  
**Status:** Mandatory  

---

## 1. Purpose

Defines testing philosophy and required practices so marketplace invariants remain correct as the team and traffic grow.

---

## 2. Testing Philosophy

1. **Correctness over ceremony** — test behavior that can break users or money  
2. **Pyramid** — many unit tests, fewer integration, few end-to-end acceptance  
3. **Server is source of truth** — prioritize backend invariant tests  
4. **Deterministic** — no flaky time/network dependence without fakes  
5. **Regression-first for bugs** — reproduce with a failing test, then fix  
6. **Docs and tests agree** — contracts tested against documented codes  
7. **Traceable matrices** — lifecycle and edge tests cite stable Product Bible IDs  

---

## 3. Unit Tests

| Scope | Examples |
|-------|----------|
| Domain entities/services | Offer cannot transition illegally |
| Use cases with fakes | AcceptOffer rejects second winner |
| Pricing calculators | Commission/VAT math in halalas |
| Ranking/matching pure functions | Score weights, tie-breaks |
| Validators | Schema edge cases |

Characteristics: fast, no network, no real Firestore.

---

## 4. Integration Tests

| Scope | Examples |
|-------|----------|
| Repository adapters | Emulator reads/writes/queries |
| Use case + emulator DB | Transactional accept offer |
| Rules | Firestore/Storage security rules unit/integration |
| Webhook handlers | Signature validation + state machine |

Use Firebase emulators in CI for backend integration.

---

## 5. Repository Tests

Must cover:

- CRUD happy paths
- Soft delete filtering
- Query indexes assumptions (documented)
- Concurrent update expectations where relevant
- Mapping edge cases (missing optional fields)

---

## 6. API Tests

| Scope | Examples |
|-------|----------|
| Auth missing/invalid | 401 |
| Forbidden actor | 403 |
| Validation | 400 + field codes |
| Happy paths | 200/201 body shape |
| Conflicts | 409 double accept |
| Idempotency | replay semantics |
| Pagination | tokens behave |

Contract tests should track OpenAPI once published.

---

## 7. Acceptance Tests

- Critical user journeys at API level (and later Technician/Admin UI critical paths)
- Examples: request → offer → accept → booking → complete → warranty
- Run on staging smoke suites before production promote
- Each test case records applicable Acceptance Criterion IDs, lifecycle transition IDs, and Edge Case IDs from `docs/product`; “not applicable” requires a short reason
- Every canonical lifecycle transition, forbidden transition, alias boundary, and release-applicable edge ID appears in the module test matrix

Customer UI acceptance owned by Customer team against shared contracts.

### 7.1 MVP localization, RTL, and accessibility gates

MVP promotion is blocked unless all critical Customer, Technician, and Admin paths pass:

| Gate | Required evidence |
|------|-------------------|
| Arabic and English | Every system message resolves by key/parameters; fallback gaps fail the suite rather than silently shipping |
| RTL layout | Mirroring, focus order, navigation direction, mixed-direction phone/date/amount content, and long Arabic labels |
| Money/date/time | SAR halalas, Arabic/English numerals as policy dictates, market timezone boundaries, and warranty expiry |
| Accessibility | Screen-reader names/roles, keyboard/focus path, large text/reflow, contrast, non-color status, and non-gesture alternatives |
| API localization | Stable non-localized codes; localized message does not change contract assertions |

The external Customer team supplies equivalent evidence against shared contracts before release approval.

### 7.2 Required critical scenario matrices

- Offer acceptance: exclusivity lock, asynchronous loser lag, `superseded`, retries, and stale clients
- Payments: duplicate submit, chargeback, delayed/replayed/out-of-order webhooks, reconciliation, and payout holds
- Warranty claims: market-timezone boundary, multiple accepted claims, open claim at expiry, cancellation, and rework
- Privacy: deletion, export, active legal hold, hold release, and retained-record minimization
- Access: every row of the Client-direct vs Functions-only matrix, including field allowlists and public DTO redaction
- Recovery: backup restore validation, worker replay, obsolete events, projection reconciliation, and degraded-mode mutation safety

---

## 8. Regression Tests

Required for every production bugfix:

1. Add test that fails on old behavior  
2. Fix  
3. Keep test forever (unless feature removed)  

---

## 9. Coverage Targets

| Area | Target (Phase 2+ intent) |
|------|---------------------------|
| Domain + critical use cases | ≥ 80% line coverage |
| Payments / accept-offer / refunds | ≥ 90% + explicit scenario matrix |
| Handlers glue | Pragmatic; prefer fewer brittle tests |
| UI widgets (future) | Critical flows; not 100% vanity |

Coverage is a **floor**, not a goal to game. Untested critical paths block merge regardless of %.

---

## 10. Test Data & Fixtures

- Central factories per module
- No production data exports in fixtures
- SAR/halalas explicit
- Time controlled via clock port

---

## 11. CI Requirements

- Unit tests on every PR
- Integration/emulator tests on every PR touching backend
- Rules tests when rules change
- Smoke acceptance on staging deploy pipelines
- AR/EN, RTL, accessibility, lifecycle/edge traceability, and security-rule matrices for every release-applicable change
- Disaster-recovery exercises run before production launch and on the scheduled operational cadence; failures block readiness sign-off

---

## 12. Flaky Tests Policy

- Quarantine with ticket within 24 hours
- No silent retries hiding races without investigation
- Owners fix or delete with justification

---

## 13. Related Documents

- `MODULE_TEMPLATE.md`
- `PULL_REQUEST_GUIDE.md`
- `ERROR_HANDLING_GUIDE.md`
- `API_STANDARDS.md`
