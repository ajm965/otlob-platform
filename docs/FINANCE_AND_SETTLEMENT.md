# Finance and Settlement Architecture

**Project:** Otlob Platform  
**Document Type:** Phase 1 Finance Architecture Decision  
**Phase:** 1 — Foundation  
**Status:** Canonical baseline

---

## 1. Purpose and Decision

This document closes the missing architecture for customer payments, provider earnings, settlement, payouts, withdrawals, refunds, chargebacks, and reconciliation.

**Decision:** Otlob uses an immutable double-entry ledger as the financial system of record. PSP payment objects describe external payment state; they do not establish provider earnings or balances. Every monetary state change is represented by balanced journal entries in one currency and market.

This clarification is additive. Existing `payments` and booking amount fields remain valid operational records and snapshots, but balances must never be derived by summing those mutable fields.

---

## 2. KSA v1 Commercial Policy

| Topic | Canonical decision |
|-------|--------------------|
| Market and currency | `countryCode=SA`, `marketId=sa`, `currency=SAR`; a journal never mixes currencies or markets |
| Customer display | Tax-inclusive total is displayed before acceptance; all components remain available in the booking price snapshot |
| Calculation order | Base service amount → surcharges → discounts → VAT by taxable line |
| Provider commission | Deducted from the provider-attributed service amount after provider-funded discounts and before provider payable |
| Platform fee payer | KSA v1 locks Pricing Model A: no separate customer platform fee; commission is taken from provider proceeds. Models B/C remain post-v1 options and must not be selected by configuration |
| VAT and rounding | VAT is calculated per legally taxable line; each line rounds to nearest halala and the total is the sum of rounded lines |
| Coupons/loyalty | Funding owner is explicit per discount line (`platform`, `provider`, or campaign sponsor); funding never silently reduces another party’s payable |
| Authorization | Customer payment authorization is required before accept completes |
| Capture | Capture occurs on eligible job completion; cancellation policy may void or capture an approved fee |
| Refunds | Full or partial, never exceeding captured funds; reverse the original economic lines proportionally or by explicit policy |
| Chargebacks | Recorded as a separate financial event, place affected provider payable under hold when allowed, and enter finance reconciliation |

The commercial policy version and tax policy version are frozen into every accepted booking. Later policy changes are prospective.

---

## 3. Accept and Payment Ordering

KSA v1 uses **authorize first, then commit acceptance**, under one platform idempotency key:

1. The customer initiates acceptance for one submitted offer.
2. The platform creates or reuses a PSP authorization attempt for the frozen offer total.
3. Only after confirmed authorization does the platform transaction acquire the request acceptance lock, accept the winner, create the confirmed booking and payment record, and mark the request booked.
4. If the request was already booked or the offer became invalid, the authorization is voided. A failed void enters reconciliation and does not create a second booking.
5. If the authorization fails or remains indeterminate, no booking is committed. The operation returns a retry-safe pending or failed outcome.

The acceptance lock is the request’s `acceptedOfferId` and `bookingId` transition. Competing offer closure may complete asynchronously, but any later accept observes the lock and returns conflict. `accepting` is an internal operation state, not a public request or offer lifecycle status.

The former standalone “create payment intent for an already confirmed booking” contract remains as a deprecated compatibility route for legacy or approved retry/recovery cases. It is not the normal KSA v1 acceptance sequence.

Job start requires a valid authorization unless a finance-authorized exception is recorded. Capture confirmation can arrive by synchronous PSP response or authenticated webhook; duplicate and out-of-order webhook events are idempotently ignored or reconciled.

---

## 4. Booking Price Snapshot

Every accepted booking freezes:

- `commercialPolicyVersion`, `taxPolicyVersion`, `countryCode`, `marketId`, and `currency`
- base service amount and surcharge lines
- discount lines and each funding owner
- customer platform-fee line
- taxable basis, VAT rate, and VAT amount for each applicable line
- customer total, provider gross, commission, provider net payable, platform revenue, and tax payable
- provider commercial owner (`technician` or `company`) and payout beneficiary owner

The snapshot is immutable. Corrections are compensating financial events, never in-place edits.

---

## 5. Canonical Financial Aggregates

| Aggregate | Responsibility and authority |
|-----------|------------------------------|
| `payments` | PSP intent/authorization/capture status and customer-facing attempts; Finance module writes |
| `paymentEvents` | Immutable normalized PSP webhook/event receipt, signature result, external sequence/time, dedupe identity; Finance module writes |
| `refunds` | Requested/approved/processing/succeeded/failed refund lifecycle; Finance module writes |
| `chargebacks` | External dispute lifecycle and financial exposure; Finance module writes |
| `ledgerAccounts` | Chart-of-accounts identity by market, currency, owner and purpose |
| `ledgerJournals` | Immutable balanced business transaction header with source event and idempotency identity |
| `ledgerEntries` | Immutable debit/credit lines belonging to one journal |
| `providerBalances` | Rebuildable projection of pending, available, held, and paid balances; never authoritative |
| `payoutAccounts` | Tokenized beneficiary/KYC state; no raw bank credentials in Firestore |
| `withdrawals` | Provider-requested movement of available balance to an approved payout account |
| `payouts` | Provider-initiated or scheduled disbursement and PSP/bank lifecycle |
| `settlements` | PSP settlement batch/report and matched platform totals |
| `reconciliationCases` | Owned discrepancy case with severity, status, evidence and resolution |
| `invoices` | Immutable customer/provider tax invoice identity, line snapshot and compliance status |

Physical fields, IDs, retention, and access classes are specified in `FIRESTORE_STRUCTURE.md`.

---

## 6. Ledger Model

Each journal:

- belongs to exactly one `marketId` and `currency`
- has a unique source event and idempotency identity
- contains at least two entries whose debits equal credits
- is append-only after posting
- records booking, payment, refund, chargeback, withdrawal, payout, settlement, policy versions, and actor where applicable

Minimum account purposes are customer funds/PSP receivable, PSP clearing, provider payable, platform revenue, tax payable, refund liability, provider reserve/hold, payout clearing, and financial adjustment suspense.

Corrections use reversal and replacement journals. Finance staff cannot edit posted entries or directly set a balance projection.

---

## 7. Earnings, Holds, Withdrawals, and Payout Ownership

Provider earnings become:

- `pending` after capture while completion, dispute, refund, and settlement conditions remain open
- `available` after the configured release window and successful controls
- `held` when a dispute, chargeback, KYC issue, reserve, or compliance action applies
- `paid` only after confirmed payout

For a company-attributed booking, the company is the commercial owner and payout beneficiary. An assigned technician may receive a reporting attribution, but no platform withdrawal balance unless a future company compensation product is explicitly introduced. For an independent booking, the technician is the commercial owner.

KSA v1 active company membership disables independent offers. This prevents duplicate bidding and ambiguous payout ownership. Existing historical independent bookings remain attributed to the technician.

Withdrawals require available balance, an active verified payout account, satisfied KYC, market limits, no blocking hold, and a unique idempotency key. Payout failure returns reserved funds to available or held according to the failure reason; it never creates money.

---

## 8. Cancellation and Refund Policy Matrix

| Point in lifecycle | Customer cancellation | Provider/platform cancellation |
|--------------------|-----------------------|--------------------------------|
| Before authorization/accept | No charge | No charge |
| Authorized, before scheduled lock window | Void authorization; no provider earning | Void authorization; no provider earning |
| Inside lock window, before start | Versioned disclosed cancellation fee may be captured; remainder voided | Full void unless an approved exceptional policy applies |
| In progress | Admin/dispute decision determines capture/refund and provider payable hold | Admin/dispute decision; provider payable held |
| Completed, undisputed | Capture full frozen total | Not a cancellation path |
| Completed, disputed/warranty remedy | Refund or adjustment only through dispute/warranty policy; affected payable held | Same |
| Chargeback | External chargeback workflow; no duplicate refund | Same |

Exact fee amounts and windows are versioned market policy, disclosed before acceptance, and frozen on the booking. No environment may silently choose different ordering or economics.

---

## 9. Reconciliation and Controls

Finance owns daily reconciliation across payment events, PSP balances, captures, refunds, chargebacks, ledger journals, settlements, withdrawals, and payouts. Automatic matching produces immutable results; mismatches create `reconciliationCases`.

Required controls:

- segregate refund approval, ledger adjustment, payout release, and reconciliation closure
- dual approval for market-configured high-value refunds, payouts, and manual adjustments
- immutable audit events for every privileged financial action
- no payout while source capture is unresolved or affected funds are held
- periodic rebuild comparison of `providerBalances` against ledger entries
- retry-safe processing and dead-letter escalation under `ASYNC_WORKFLOWS.md`

No real-money beta begins until PSP settlement reports, refund/chargeback handling, ledger balancing, payout hold controls, and reconciliation ownership have been exercised and signed off.

---

## 10. Compliance and Privacy

Payment card data remains at the PSP. Payout account details are tokenized and separated from ordinary provider profiles. Access to financial records follows least privilege and segregation of duties in `AUTHORIZATION_AND_DATA_ACCESS.md`.

Invoice and financial-record retention, legal holds, subject-right limits, KYC handling, and country launch controls follow `COMPLIANCE_AND_RETENTION.md`.

---

## 11. Finding Resolution

This decision resolves `C-01`, `C-04`, `H-02`, `M-11`, and `M-13`, and supplies the finance portions of `H-01`, `H-06`, and `H-07`.

---

## 12. Related Documents

- `ARCHITECTURE.md`
- `DATABASE.md`
- `FIRESTORE_STRUCTURE.md`
- `API.md`
- `BUSINESS_RULES.md`
- `SECURITY.md`
- `AUTHORIZATION_AND_DATA_ACCESS.md`
- `ASYNC_WORKFLOWS.md`
- `COMPLIANCE_AND_RETENTION.md`
