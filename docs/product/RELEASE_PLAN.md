# Release Plan

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — Release Plan  
**Phase:** 1.9  
**Status:** Baseline  

---

## 1. Purpose

Plan staged releases from internal alpha through production and major versions. Aligns with engineering phases without replacing `docs/ROADMAP.md`.

---

## 2. Release Stages Overview

```text
Alpha → Closed Beta → Open Beta → Production (v1.0) → v1.5 → v2.0
```

---

## 3. Alpha

| Item | Detail |
|------|--------|
| Goal | Prove core API loop end-to-end in `dev`/`staging` |
| Audience | Internal engineering + product only |
| Scope | Auth, catalog, request, offer, accept, booking stubs; payments in test mode |
| Exit | Happy path works; no Customer store release |
| Gates | Security basics; CI green; state machine tests for accept |

---

## 4. Closed Beta

| Item | Detail |
|------|--------|
| Goal | Real users under NDA/invite in 1–2 KSA cities |
| Audience | Invited customers + verified technicians |
| Scope | MVP feature set with real (limited) payments |
| Ops | Manual verification SLAs; white-glove support |
| Exit | Stable funnel; known edge cases documented; dispute path usable |
| Gates | Real-money readiness approved: authorization/capture/refund/chargeback reconciliation, immutable finance records, payout/settlement controls, webhook replay/out-of-order tests, KSA privacy and invoice sign-off, crash-free threshold, and no critical P0 open |

---

## 5. Open Beta

| Item | Detail |
|------|--------|
| Goal | Broader public beta with feature flags |
| Audience | Open registration with city gates |
| Scope | MVP + improved matching/notifications; limited subscriptions maybe flag-gated |
| Exit | Capacity proven; ops queues staffed; playbooks exist |
| Gates | Load tests; abuse controls; App Store / Play compliance |

---

## 6. Production v1.0

| Item | Detail |
|------|--------|
| Goal | General availability in launch KSA cities |
| Scope | Locked MVP (`MVP_SCOPE.md`) |
| Branding | اطلب ولا تتعنى live |
| Exit | Ongoing ops; not a project end |
| Gates | Legal/privacy review; VAT readiness as required; on-call; backups; SLO baselines |

---

## 7. Version 1.5

| Themes | Examples |
|--------|----------|
| Provider monetization | Pro/Premium maturity |
| Company | Multi-technician, branches, assignment |
| Trust | Stronger dispute tooling, withdrawals polish |
| Consumer | Home Passport v1, loyalty v1 |
| Quality | Ranking v1.5 weights tuning |

Gates: company verification ops ready; loyalty ledger correctness; passport privacy review.

---

## 8. Version 2.0

| Themes | Examples |
|--------|----------|
| GCC expansion | Multi-country packs |
| Intelligence | AI matching/pricing assist (shadow→prod) |
| Platform depth | Advanced analytics, partner integrations |
| Scale | Performance hardening, multi-region considerations as needed |

Gates: country compliance per launch; AI safety constraints; localization QA.

---

## 9. Release Train Practices

| Practice | Rule |
|----------|------|
| Feature flags | Risky features flagged |
| Versioning | SemVer for APIs/apps |
| Changelogs | Customer-facing + internal |
| Hotfixes | Patch versions anytime for P0 |
| Rollback | Always possible for Functions/config |
| Coordination | Customer app team synced on contract freezes |

---

## 10. Mapping to Engineering Roadmap

`docs/ROADMAP.md` is the only owner of engineering phase numbers and release-to-phase mapping. This plan owns product release scope and release gates only. Product may reference the current Roadmap mapping but must not duplicate it here; any phase remap is made in Roadmap first and linked from the release decision.

---

## 11. Related Documents

- `MVP_SCOPE.md`
- `FEATURE_DEPENDENCIES.md`
- `ACCEPTANCE_CRITERIA.md`
- `docs/ROADMAP.md`
- `docs/engineering/GIT_WORKFLOW.md`
