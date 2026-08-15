# Git Workflow

**Project:** Otlob Platform  
**Document Type:** Source Control & Release Workflow  
**Phase:** 1 — Foundation  
**Status:** Baseline  

---

## 1. Purpose

This document defines branching, commit conventions, code review, versioning, and release strategy for Otlob Platform on GitHub.

---

## 2. Branching Model

Adapted **GitHub Flow** with long-lived environment branches as needed.

### 2.1 Primary Branches

| Branch | Purpose | Protection |
|--------|---------|------------|
| `main` | Production-ready history | Protected; PR required |
| `develop` (optional) | Integration branch if team prefers | Protected |

**Recommendation:** Start with `main` + feature branches. Add `develop` only if release cadence requires it.

### 2.2 Working Branches

| Pattern | Use |
|---------|-----|
| `feature/<ticket>-<short-desc>` | New capabilities |
| `fix/<ticket>-<short-desc>` | Bug fixes |
| `chore/<short-desc>` | Tooling, cleanup |
| `docs/<short-desc>` | Documentation only |
| `hotfix/<short-desc>` | Urgent production fixes |
| `release/<x.y.z>` | Release preparation (if used) |

Examples:

- `docs/phase-1-foundation`
- `feature/OTL-123-accept-offer-api`
- `fix/OTL-220-double-accept-race`

### 2.3 Branch Rules

1. Branch from up-to-date `main` (or `develop` if adopted)
2. Keep branches short-lived
3. Delete after merge
4. No direct pushes to `main`

---

## 3. Commit Naming

Use **Conventional Commits**:

```text
<type>(optional-scope): <imperative summary>
```

### 3.1 Types

| Type | Meaning |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting only |
| `refactor` | Change without behavior change |
| `perf` | Performance improvement |
| `test` | Tests |
| `build` | Build system |
| `ci` | CI configuration |
| `chore` | Maintenance |
| `revert` | Revert prior commit |

### 3.2 Examples

```text
docs: add firestore structure baseline
feat(offers): accept offer transactional API
fix(payments): prevent double capture on webhook retry
chore(ci): require rules unit tests
```

### 3.3 Commit Body (when needed)

Explain **why**, reference business rule IDs or ticket numbers.

```text
feat(offers): accept offer transactional API

Enforce BR-OFF-009 and BR-OFF-010 with Firestore transaction.
Closes OTL-123
```

---

## 4. Pull Request Workflow

1. Create branch
2. Implement (or docs)
3. Ensure CI passes
4. Open PR against `main`
5. Request review (backend/security for sensitive paths)
6. Address feedback
7. Squash or merge commit per repo setting
8. Delete branch

### 4.1 PR Title

Same style as conventional commits.

### 4.2 PR Description Must Include

- Summary of change
- Linked ticket (if any)
- Risk notes (payments/auth/rules)
- Test plan
- Docs impact

### 4.3 Required Checks (Phase 2+)

- Lint
- Typecheck
- Unit/integration tests
- Rules tests when rules change

### 4.4 Review Rules

| Path | Review emphasis |
|------|-----------------|
| `docs/` | Architecture accuracy |
| `backend/functions` | Domain invariants, AuthZ |
| `backend/rules` | Least privilege |
| `shared/contracts` | Cross-team contract impact |
| `future_flutter_apps/future_customer` | **Reject UI implementations** |

---

## 5. Versioning

Follow **Semantic Versioning**: `MAJOR.MINOR.PATCH`

| Bump | When |
|------|------|
| MAJOR | Breaking API/contract changes |
| MINOR | Backward-compatible features |
| PATCH | Backward-compatible fixes |

### 5.1 Version Surfaces

- Backend API: URL `/v1` + package/release tags
- Shared contracts: version field in OpenAPI
- Mobile apps (future): separate app version codes

Git tags:

```text
v1.0.0
v1.1.0
v2.0.0
```

---

## 6. Release Strategy

### 6.1 Environments

```text
feature branch → PR → main
                 ↓
               deploy to staging
                 ↓
               validate
                 ↓
               promote to production
```

### 6.2 Release Steps

1. Ensure `main` is green
2. Generate changelog from conventional commits
3. Tag release `vX.Y.Z`
4. Deploy Functions/rules to staging
5. Smoke test critical flows (request → offer → accept → booking)
6. Deploy to production
7. Monitor errors/crash-free metrics

### 6.3 Hotfix

1. Branch `hotfix/...` from production tag/`main`
2. Fix + tests
3. Expedited review
4. Tag patch version
5. Deploy
6. Back-merge to `main` if needed

### 6.4 Rollback

- Prefer forward fix when safe
- Keep previous Functions revision for rapid rollback
- Rules rollbacks must be tested (deny/allow regressions)

---

## 7. Documentation-Only Phase Rules (Phase 1)

- `docs/*` changes use `docs:` commits
- No requirement for runtime CI yet
- Still use PRs for review discipline once collaborators join

---

## 8. Forbidden Git Practices

- Force-push to `main`
- Committing secrets (`.env`, key files, PSP credentials)
- `--no-verify` to bypass hooks without explicit approval
- Rewriting shared history on released tags
- Mixing unrelated large refactors with feature PRs

---

## 9. CODEOWNERS (Recommended)

Create in Phase 2:

```text
/docs/ @platform-architects
/backend/ @backend-leads
/backend/rules/ @backend-leads @security
/shared/contracts/ @platform-architects @backend-leads
```

---

## 10. Related Documents

- `CODING_STANDARDS.md`
- `DEVELOPMENT_GUIDE.md`
- `SECURITY.md`
- `ROADMAP.md`
