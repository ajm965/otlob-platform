# Pull Request Guide

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Engineering Handbook — Pull Request Rules  
**Phase:** 1.8  
**Status:** Mandatory  

---

## 1. Purpose

Defines how engineers open, review-ready, and merge pull requests on Otlob Platform.

---

## 2. When to Open a PR

- Feature/fix/docs work is ready for review (or Draft for early feedback)
- CI can run on the branch
- Scope is reviewable (prefer < ~400 meaningful LOC unless justified)

---

## 3. PR Title

Use Conventional Commit style:

```text
feat(offers): accept offer transactional API
fix(matching): correct geohash radius expansion
docs(engineering): add PR guide
```

---

## 4. PR Description Requirements

Must include:

1. **Summary** — what and why  
2. **Ticket link**  
3. **Type** — feature / fix / chore / docs / security  
4. **Risk** — low/med/high; call out payments/auth/rules  
5. **Test plan** — steps + automated tests added  
6. **Docs/contracts** — updated?  
7. **Screenshots** — only for UI apps (Technician/Admin); never Customer UI here  
8. **Rollback notes** — if deploy-sensitive  

---

## 5. Mandatory Checklist (Author)

Copy into each PR:

```markdown
## Checklist
- [ ] Scope is single and clear
- [ ] Coding standards followed
- [ ] Architecture/module boundaries respected
- [ ] No Customer UI changes in this repo
- [ ] No secrets committed
- [ ] Business rules enforced server-side (if applicable)
- [ ] Tests added/updated
- [ ] Docs/OpenAPI/engines updated if behavior changed
- [ ] New error codes documented
- [ ] Logging avoids PII/secrets
- [ ] Idempotency considered for money/exclusivity APIs
- [ ] CI green
```

---

## 6. Required Reviewers

| Change type | Required reviewers |
|-------------|--------------------|
| Normal module change | ≥1 peer + module owner if defined |
| `shared/contracts` | Platform architect + affected client liaison |
| Auth / roles / rules | Security-aware reviewer |
| Payments / refunds | Payments owner + security |
| Matching / pricing / ranking algorithms | Domain owner + backend lead |
| Engineering handbook | Engineering lead / architect |
| Hotfix | Expedited: on-call + owner |

CODEOWNERS automates requests when configured.

---

## 7. Merge Requirements

Merge is allowed only if:

1. Required approvals received  
2. All required CI checks pass  
3. No unresolved blocking comments  
4. Branch up to date with base per protection rules  
5. Checklist complete  
6. No “fix later” on security findings  

---

## 8. Code Quality Requirements

- Lint/format/typecheck clean
- No unexplained `any` / suppressed lints without justification
- Complexity reviewed on transactional flows
- Feature flags for risky partial rollouts when needed

---

## 9. Testing Requirements

Per `TESTING_GUIDE.md`:

| Change | Minimum tests |
|--------|----------------|
| Pure domain/use case | Unit tests |
| Repository query/write | Integration/emulator tests |
| HTTP API | API/integration tests |
| Bug fix | Regression test |
| Rules change | Rules unit tests |

PRs without appropriate tests are rejected for non-trivial logic.

---

## 10. Documentation Requirements

Update when needed:

- `docs/API.md` / OpenAPI
- Engine docs for behavior contract changes
- Handbook standards only via dedicated docs PRs when changing process
- Module README for new modules

---

## 11. Draft vs Ready

| State | Meaning |
|-------|---------|
| Draft | Feedback welcome; not for merge |
| Ready | Author asserts checklist done |

Do not mark Ready with failing CI.

---

## 12. Related Documents

- `GIT_WORKFLOW.md`
- `CODE_REVIEW_GUIDE.md`
- `TESTING_GUIDE.md`
- `ENGINEERING_GUIDE.md`
