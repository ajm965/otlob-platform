# Engineering Principles

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Engineering Handbook — Core Principles  
**Phase:** 1.8  
**Status:** Mandatory  

---

## 1. Purpose

Non-negotiable engineering principles for building Otlob into one of the largest home services marketplaces in the GCC. When principles conflict on a decision, use the conflict guidance in §10.

---

## 2. Scalability First

Design for city-scale concurrency and multi-country growth from day one of implementation—not premature microservices, but **avoidance of known dead-ends**.

Implications:

- Index-backed queries; bounded fan-out
- Idempotent workers; sharded counters when needed
- Market/`countryCode` partition readiness
- Matching waves and notification caps
- No hot global sequence generators

---

## 3. Security First

Security is a product requirement. Marketplace money, KYC, and home data demand least privilege and server-side enforcement.

Implications:

- Deny by default
- Verify authz on every privileged path
- Secrets only in Secret Manager
- Audit admin and financial actions
- Never trust the client for prices, roles, or exclusivity

---

## 4. Performance First

User trust depends on fast offer loops and reliable job updates.

Implications:

- p95 budgets on match and critical APIs
- Avoid N+1 and unbounded payloads
- Cache hot geo cells carefully
- Measure before micro-optimizing unrelated code

---

## 5. Maintainability

A 20+ engineer team must ship without fear.

Implications:

- Feature modules + Clean Architecture
- Module owners and templates
- Small PRs; strong reviews
- Delete dead code; avoid cleverness

---

## 6. Backward Compatibility

Mobile clients and an external Customer team cannot all upgrade simultaneously.

Implications:

- Additive API changes preferred
- Version breaks explicitly (`/v2`)
- Freeze commercial snapshots on bookings
- Deprecation windows communicated

---

## 7. Developer Experience

Slow feedback loops kill marketplace velocity.

Implications:

- Emulators and clear setup guides
- Fast CI signal
- Stable error codes and handbook discoverability
- Good module READMEs
- Automation over tribal knowledge

---

## 8. Documentation First

Undocumented marketplace behavior becomes production lore—and outages.

Implications:

- Contracts and engine changes documented in the same PR as code
- ADRs for lasting decisions
- Handbook is mandatory reading
- English engineering docs; Arabic-first product UX

---

## 9. Automation First

Humans do not manually gatekeep what machines can enforce.

Implications:

- Lint, tests, typecheck in CI
- Rules tests
- Deploy pipelines per environment
- Codegen/contract checks where valuable
- Alerts on error budgets

---

## 10. Conflict Resolution Order

When principles compete on a specific decision, apply this default precedence unless an ADR says otherwise:

1. **Security First**  
2. **Scalability First** (for data/control-plane choices that lock the future)  
3. **Backward Compatibility** (for public contracts)  
4. **Performance First**  
5. **Maintainability**  
6. **Developer Experience**  
7. **Documentation First** / **Automation First** (usually complementary)

Example: a faster client-only accept path loses to Security + Scalability (server transaction).

---

## 11. Operational Corollaries

| Corollary | Statement |
|-----------|-----------|
| Server is source of truth | Invariants live in backend engines/modules |
| Explicit over implicit | Clear statuses, codes, ownership |
| Measure marketplace health | Funnel metrics are engineering concerns too |
| Privacy by design | Home Passport and KYC are privileged data |
| No Customer UI here | Boundary is an engineering principle, not preference |

---

## 12. Related Documents

- `ARCHITECTURE_DECISIONS.md`
- `ENGINEERING_GUIDE.md`
- `SECURITY_STANDARDS.md`
- `API_STANDARDS.md`
- `DATABASE_STANDARDS.md`
- `docs/ARCHITECTURE.md`
