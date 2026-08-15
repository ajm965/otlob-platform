# Git Workflow

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Engineering Handbook — Git Workflow  
**Phase:** 1.8  
**Status:** Mandatory  

---

## 1. Purpose

Professional GitHub workflow for a 20+ engineer team: branching, commits, merges, releases, hotfixes, and version tags.

This handbook document is the engineering standard for Phase 2+. (Phase 1 also has a high-level `docs/GIT_WORKFLOW.md`; follow **this** handbook for day-to-day engineering practice.)

---

## 2. Branching Model

Primary model: **GitHub Flow** with optional release/hotfix lanes.

| Branch | Purpose | Protection |
|--------|---------|------------|
| `main` | Production-ready history | Protected; PR required; no direct push |
| `develop` | Optional integration branch | Use only if release train needs it |

Default recommendation: `main` + short-lived working branches.

---

## 3. Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<ticket>-<short-desc>` | `feature/OTL-123-accept-offer` |
| Bugfix | `fix/<ticket>-<short-desc>` | `fix/OTL-220-double-accept` |
| Hotfix | `hotfix/<short-desc>` | `hotfix/payment-webhook-500` |
| Release | `release/<x.y.z>` | `release/1.4.0` |
| Chore | `chore/<short-desc>` | `chore/eslint-baseline` |
| Docs | `docs/<short-desc>` | `docs/engineering-handbook` |

Rules:

- Lowercase kebab-case descriptions
- No personal forever branches
- Delete after merge

---

## 4. Feature Branches

- Branch from updated `main`
- Scope to one feature/ticket
- Keep green with frequent rebase/merge from `main` (prefer merge commit or rebase per team policy—**one policy enforced**)
- Open PR early as draft if useful for visibility

---

## 5. Bugfix Branches

- Same as feature branches but `fix/` prefix
- Include regression test in the same PR whenever feasible
- Link failing ticket / incident ID

---

## 6. Release Branches

Use when stabilizing a version while `main` continues:

1. Cut `release/x.y.z` from `main`
2. Only bugfixes and docs/version bumps
3. Tag on release
4. Merge back to `main` (and `develop` if used)

---

## 7. Hotfix Branches

For production emergencies:

1. Branch `hotfix/...` from production tag or `main`
2. Minimal fix + tests
3. Expedited review (still required)
4. Tag patch version and deploy
5. Merge back to `main` immediately

---

## 8. Commit Naming

Conventional Commits:

```text
<type>(optional-scope): <imperative summary>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

Examples:

```text
feat(offers): accept offer with idempotency key
fix(payments): handle duplicate webhook delivery
docs(engineering): add testing guide
```

Body explains **why**; reference tickets and business rule IDs when relevant.

---

## 9. Merge Strategy

| Policy | Standard |
|--------|----------|
| Default merge | Squash & merge to keep `main` readable **or** merge commit—**choose one org-wide** (recommended: squash for features) |
| Hotfix | Merge commit acceptable for traceability |
| Rebase of `main` locally | Allowed for feature authors; never rewrite `main` |
| Force-push | Forbidden on `main` / release branches; allowed on personal feature branches only |

PR must be up to date with base branch per protection rules.

---

## 10. Version Tags

Semantic Versioning: `MAJOR.MINOR.PATCH`

```text
v1.0.0
v1.1.0
v1.1.1
```

| Bump | When |
|------|------|
| MAJOR | Breaking API/contracts |
| MINOR | Backward-compatible features |
| PATCH | Backward-compatible fixes |

Tags created by release process, not ad-hoc developer machines for production.

---

## 11. CODEOWNERS & Protections

Recommended:

- Protect `main`
- Require CI
- Require review count ≥ 1 (≥ 2 for payments/security)
- CODEOWNERS for `backend/`, `docs/engineering/`, `shared/contracts/`, rules

---

## 12. Forbidden Practices

- Committing secrets
- `--no-verify` without lead approval
- Force-push to shared branches
- Giant unrelated commits
- Mixing massive formatting churn with logic changes

---

## 13. Related Documents

- `PULL_REQUEST_GUIDE.md`
- `CODE_REVIEW_GUIDE.md`
- `ENGINEERING_GUIDE.md`
- `docs/GIT_WORKFLOW.md` (foundation overview)
