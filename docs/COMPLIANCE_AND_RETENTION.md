# Compliance, Privacy, and Retention Architecture

**Project:** Otlob Platform  
**Document Type:** Phase 1 KSA Compliance and Privacy Decision  
**Phase:** 1 — Foundation  
**Status:** Canonical design baseline; legal sign-off required before production

---

## 1. Purpose and Decision

This document defines the operational privacy, data lifecycle, media, financial-compliance, and GCC country-onboarding controls required before processing production data.

**Decision:** KSA is the first isolated market (`countryCode=SA`, `marketId=sa`). Every data class has a named purpose, lawful-basis record, owner, access class, residency/transfer assessment, retention schedule, subject-right behavior, and deletion mechanism before production use. GCC launch is a governed country onboarding program, not a schema flag.

Legal and tax counsel must approve final periods, lawful bases, disclosures, and ZATCA obligations. Until approval, production processing and real-money beta remain blocked.

---

## 2. Data Classification

| Class | Examples | Default handling |
|-------|----------|------------------|
| Public | Published provider profile, published review, active catalog | Explicit publication only; integrity and moderation controls |
| Internal | Policy versions, operational metrics, non-sensitive configuration | Workforce need-to-know |
| Confidential personal | Name, phone, email, precise address, chat, home data, device tokens | Purpose limitation, encryption, scoped access, redacted support views |
| Restricted identity | National ID, licenses, KYC decisions, payout beneficiary data | Separate storage/metadata, strongest access, view audit, short operational access |
| Restricted financial | Payments, ledger, invoices, refunds, payouts, chargebacks | Finance segregation, immutable records, legal retention |
| Restricted evidence | Request/job media, dispute/warranty evidence | Signed access, scanning, EXIF policy, legal hold support |
| Security data | Tokens, signatures, fraud signals, audit records | Never exposed to ordinary clients; controlled retention |

Raw credentials, PAN, and CVV are never stored by Otlob.

---

## 3. Data Inventory and Lawful Basis

Before a collection or vendor enters production, its owner records:

- data elements and subjects
- purpose and prohibited secondary uses
- PDPL lawful basis and, where used, consent evidence/version
- source, recipients, processor/subprocessor, and country of processing
- access roles and support redaction
- retention trigger and deletion/anonymization action
- export/correction/delete behavior
- legal-hold eligibility
- security and incident owner

Consent is not used when another lawful basis is required or more appropriate. Marketing and optional SMS consent are separate from service communications and can be withdrawn without blocking necessary transactional notices.

Push and in-app are the default notification channels. SMS is limited to OTP and explicitly classified critical service escalations, requires country/provider approval and applicable consent, and is protected by per-user, per-workflow, and market-wide cost/volume caps.

---

## 4. Subject Rights

The platform provides authenticated workflows for access/export, correction, deletion, consent withdrawal, and objection where applicable. Requests are identity-verified, tracked, time-bounded, and audited.

Deletion means:

1. stop ordinary processing and revoke active sessions/access
2. delete or irreversibly anonymize data without an ongoing legal/business obligation
3. restrict retained financial, fraud, dispute, safety, and legal-hold records
4. propagate deletion to projections, search/export systems, media, and processors
5. verify completion through reconciliation

Exports exclude other parties’ private data, internal fraud logic, secrets, and legally restricted content. Corrections preserve immutable financial/audit history through compensating annotations rather than rewriting records.

---

## 5. Retention Schedule Baseline

| Data class | Baseline trigger and treatment |
|------------|--------------------------------|
| Active account/profile | While active; delete/anonymize after verified closure and applicable hold window |
| Saved addresses/home data | Until owner deletes or account closure; remove from ordinary access promptly |
| Unaccepted request exact location/media | Delete or anonymize after request closure plus short support/fraud window |
| Match visibility projections | Delete after grant expiry plus short security-audit window; do not retain customer media copies |
| Booking/job records | Retain for contract, safety, warranty, dispute, and statutory needs; minimize address access after operational need |
| Chat | Retain through booking support/dispute window, then delete/anonymize unless held |
| KYC/identity documents | Retain only for onboarding/regulatory need; restrict immediately when no longer operationally needed |
| Dispute/warranty evidence | Through case, appeal, warranty, and legal limitation periods; then delete unless held |
| Financial ledger, settlements, payouts, invoices | Immutable for legally approved financial/tax period |
| Notifications/device tokens | Short operational retention; invalid tokens deleted promptly |
| Audit/security logs | Risk-based period; financial/privileged audit follows legal/control requirements |
| Analytics | Prefer pseudonymous events and aggregated cohorts; raw identifiers expire on a documented schedule |

Counsel-approved durations replace these trigger-based baselines in the production retention register. “Keep forever” is prohibited unless law explicitly requires it.

---

## 6. Legal Holds

An authorized Legal/Compliance action may place a scoped hold on relevant records and media. A hold:

- records reason, scope, approver, start, review date, and release
- blocks deletion only for covered data
- restricts access rather than restoring ordinary visibility
- is periodically reviewed
- resumes normal deletion after release

Users may still receive an appropriate response to a deletion request when some data is legally retained.

---

## 7. Media and Storage Pipeline

All request, chat, job, KYC, dispute, and warranty media use server-authorized upload intents. Media is private by default.

Required controls:

- purpose, owner, entity, content type, size, checksum, and expiry bound to upload authorization
- malware/content scan and quarantine before general availability
- image derivative generation where only reduced media is needed
- EXIF and precise-location metadata removal from user-visible derivatives
- short-lived signed read URLs scoped to authorized purpose
- immutable evidence generation/reference when legal integrity is required
- lifecycle deletion tied to source record, retention class, and legal hold
- orphan-upload cleanup and scan-status reconciliation

KYC and payout documents use separate restricted paths and are never shared through marketplace DTOs.

---

## 8. KSA Financial and Vendor Compliance

Before real-money beta:

- Finance and counsel approve VAT treatment, invoice parties/lines, credit notes, refund/chargeback treatment, and ZATCA e-invoicing phase obligations.
- PSP and payout providers are approved for KSA services, settlement reports, data handling, webhook security, and dispute evidence.
- Identity/KYC, SMS, maps, analytics, storage, and support processors have contracts, purpose limits, security review, residency/transfer assessment, and incident obligations.
- Invoice identifiers and immutable invoice records satisfy the approved policy.
- Financial record retention and staff segregation are active.

Vendor selection remains adapter-based, but “provider TBD” does not permit production processing without this gate.

---

## 9. Residency and Cross-Border Transfers

The production data inventory identifies storage and processing countries for Firebase/Google services and every subprocessor. Cross-border transfer is allowed only after documented legal mechanism, necessity, security assessment, and approval. Data localization requirements override convenience.

Production, staging, and development are isolated. Production personal data is not copied into development. Support and analytics exports use minimization and approved destinations.

---

## 10. GCC Country Onboarding Gate

Each new country requires an approved pack covering:

- `countryCode`, `marketId`, currency, timezone, locale, and Arabic/regional formatting
- entity residency and cross-border-transfer assessment
- privacy impact assessment and subject-right process
- commercial, VAT/tax, invoice, refund, chargeback, warranty, and consumer terms
- PSP, payout, KYC/identity, SMS, maps, and emergency/support vendors
- catalog/service availability and policy versions
- financial chart of accounts and settlement currency
- operational owners, incident contacts, retention schedule, and launch sign-off

Cross-market queries are denied by default. A staff permission must explicitly authorize multi-market access, and financial journals never cross market/currency boundaries.

---

## 11. Finding Resolution

This decision resolves `H-06`, `M-06`, `M-07`, and the privacy/retention portions of `C-02`, `H-01`, `L-04`, and `L-07`.

---

## 12. Related Documents

- `SECURITY.md`
- `DATABASE.md`
- `FIRESTORE_STRUCTURE.md`
- `AUTHORIZATION_AND_DATA_ACCESS.md`
- `FINANCE_AND_SETTLEMENT.md`
- `ASYNC_WORKFLOWS.md`
