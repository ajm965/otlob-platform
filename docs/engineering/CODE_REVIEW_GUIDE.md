# Code Review Guide

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Engineering Handbook — Code Review Standards  
**Phase:** 1.8  
**Status:** Mandatory  

---

## 1. Purpose

Defines how reviewers evaluate changes for architecture, performance, security, readability, maintainability, scalability, and testing—so a large team reviews consistently and fairly.

---

## 2. Reviewer Mindset

- Be kind, specific, and actionable
- Prefer questions over commands when intent is unclear
- Distinguish **blocking** vs **nit** comments
- Approve when standards are met—not when the code matches personal taste only
- Remember marketplace invariants and GCC scale ambitions

---

## 3. Architecture Review

Check:

- [ ] Change belongs in the correct module
- [ ] Clean Architecture dependency rule respected
- [ ] No domain dependency on Firebase/Flutter/HTTP frameworks
- [ ] Repository ports used correctly
- [ ] Cross-module calls go through public application APIs/events
- [ ] No Customer UI introduced
- [ ] Matches relevant engine specifications

Blocking if boundaries are violated.

---

## 4. Performance Review

Check:

- [ ] Queries are index-backed and bounded
- [ ] No N+1 reads in request path
- [ ] Pagination present on lists
- [ ] Arrays bounded
- [ ] Hot documents / contention considered
- [ ] Heavy work async where appropriate (notify fan-out)
- [ ] Payloads reasonably sized

Blocking for obvious production foot-guns on hot paths.

---

## 5. Security Review

Check:

- [ ] Auth token verified
- [ ] AuthZ role + ownership enforced
- [ ] No trust of client prices/roles/status transitions
- [ ] Secrets absent from code/logs
- [ ] PII minimized/masked
- [ ] Storage paths constrained
- [ ] Idempotency on money/exclusivity operations
- [ ] Admin actions auditable

Any security gap is blocking.

---

## 6. Readability

Check:

- [ ] Names match domain language (offer, booking, guarantee)
- [ ] Functions/classes sized reasonably
- [ ] Control flow clear for transactions
- [ ] Magic numbers extracted
- [ ] Comments explain why when needed

Nits for style already covered by formatters should not block.

---

## 7. Maintainability

Check:

- [ ] Follows module template
- [ ] Tests will fail if behavior regresses meaningfully
- [ ] Docs/contracts updated
- [ ] Feature flags/config rather than hardcoding policy where required
- [ ] No dead code or speculative abstraction piles

---

## 8. Scalability

Check:

- [ ] Design won’t collapse at city-scale fan-out
- [ ] Matching/notification waves considered
- [ ] Counters strategy appropriate
- [ ] Multi-market (`countryCode`) not painted into a corner
- [ ] Background jobs idempotent and retry-safe

---

## 9. Testing Review

Check:

- [ ] Right test layers present
- [ ] Edge cases: double accept, expired offer, forbidden actor
- [ ] Regression test for bug fixes
- [ ] Fixtures not brittle snapshots of irrelevant fields
- [ ] Emulator/integration tests deterministic

---

## 10. Review Workflow

1. Read PR description and ticket  
2. Skim diff for architecture first, then details  
3. Run locally only if needed for risk  
4. Leave structured comments  
5. Request changes or approve  
6. Re-review promptly after updates  

SLA intent: first review within 1 business day for normal PRs; faster for hotfixes.

---

## 11. Comment Labels (Recommended)

| Prefix | Meaning |
|--------|---------|
| `blocking:` | Must fix before merge |
| `question:` | Need clarification |
| `suggestion:` | Optional improvement |
| `nit:` | Non-blocking polish |
| `praise:` | Call out good patterns |

---

## 12. Related Documents

- `PULL_REQUEST_GUIDE.md`
- `CODING_STANDARDS.md`
- `SECURITY_STANDARDS.md`
- `TESTING_GUIDE.md`
- `ENGINEERING_GUIDE.md`
