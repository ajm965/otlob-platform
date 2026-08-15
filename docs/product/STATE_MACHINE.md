# State Machines

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — Lifecycle State Machines  
**Phase:** 1.9  
**Status:** Baseline  

---

## 1. Purpose

Product-facing lifecycle projections for core entities. For every state: entry conditions, exit conditions, allowed actions, forbidden actions.

Engineering must enforce these server-side.

### 1.1 Lifecycle source of truth

Business Engine specifications are the lifecycle SSOT for persisted domain enum values, transitions, and internal operation states. This document owns the UX projection: labels, allowed user actions, and aliases shown to clients. A value must not be persisted or exposed as a new public status unless it is first present in the owning engine and reconciled here.

| Domain value or condition | Canonical treatment | Product/client projection |
|---------------------------|---------------------|---------------------------|
| Request `matching_sparse` | Matching outcome/reason, not a request lifecycle replacement | Show “search expanding” while request remains `open` |
| Request `accepting` | Server-only transient acceptance lock when the scale path uses it | Show request as `open` with accept controls disabled; never permit a second accept |
| Offer `superseded` | Canonical terminal offer state when revision-as-new-offer is used | Show “updated/replaced”; it is not selectable |
| Competitor closure | Offer status is `rejected` or `expired` per engine policy | Canonical reason is `accepted_competitor`; accept legacy `rejected_by_acceptance` as an input/analytics alias only |
| Warranty `claimed` | Legacy warranty projection only; not a canonical terminal warranty state | Derive “has claim” from claim records; warranty remains `active` until `expired` or `void` |
| Subscription `grace` | Alias/policy window associated with canonical `past_due` unless a later engine version promotes it | Display “payment grace”; APIs persist `past_due` and expose grace timing separately |
| Subscription `paused` | Canonical rare admin/billing state | Show paused reason and apply only Free entitlements unless policy explicitly preserves paid access |

Aliases are additive compatibility aids; writers use the canonical value.

### 1.2 Stable test trace IDs

Tests identify a transition as `SM-<DOMAIN>-<FROM>-<TO>` and a forbidden transition as `SM-<DOMAIN>-<FROM>-X-<ATTEMPT>`. Domain codes are `REQ`, `OFF`, `BKG`, `PAY`, `WAR`, `WCL`, `SUB`, `DIS`, and `NOT`. Examples in test reports may include `SM-OFF-submitted-accepted` and `SM-WAR-expired-X-submit_claim`. These IDs bind test matrices to this document without creating additional persisted states.

---

## 2. Request States

States: `draft` → `open` → `booked` | `cancelled` | `expired`  
(Optional informational: `matched` when first offer arrives—does not replace `open`.)

### 2.1 `draft`

| | |
|--|--|
| **Entry** | Customer creates request not yet published |
| **Exit** | Publish → `open`; delete/cancel draft → `cancelled` (or hard discard) |
| **Allowed** | Edit all fields; add media; save; publish; discard |
| **Forbidden** | Receive offers; accept offers; payment |

### 2.2 `open`

| | |
|--|--|
| **Entry** | Successful publish; matching eligible |
| **Exit** | Accept offer → `booked`; customer cancel → `cancelled`; TTL → `expired` |
| **Allowed** | Limited edits per policy; receive offers; reject offers; cancel; compare |
| **Forbidden** | Start job; create booking without accept; duplicate accept |

### 2.3 `booked`

| | |
|--|--|
| **Entry** | Offer accepted; booking created |
| **Exit** | Terminal for request machine (booking owns onward flow) |
| **Allowed** | View; link to booking |
| **Forbidden** | New offers; re-publish; accept another offer |

### 2.4 `cancelled`

| | |
|--|--|
| **Entry** | Customer/system cancel before book |
| **Exit** | Terminal (new request required) |
| **Allowed** | View history; clone to new request |
| **Forbidden** | Offers; reopen without new entity (policy) |

### 2.5 `expired`

| | |
|--|--|
| **Entry** | `expiresAt` passed while `open` |
| **Exit** | Terminal |
| **Allowed** | View; re-request CTA |
| **Forbidden** | Accept late offers |

---

## 3. Offer States

States: `submitted` → `withdrawn` | `rejected` | `accepted` | `expired` | `superseded`

### 3.1 `submitted`

| | |
|--|--|
| **Entry** | Provider submits valid offer on `open` request |
| **Exit** | Withdraw / reject / accept / expire / closed by competitor accept |
| **Allowed** | Edit within policy; withdraw; customer reject/accept |
| **Forbidden** | Accept if expired; duplicate active offer from same provider |

### 3.2 `withdrawn`

| | |
|--|--|
| **Entry** | Provider withdraws |
| **Exit** | Terminal for this offer id |
| **Allowed** | View history |
| **Forbidden** | Accept; revive (submit new instead) |

### 3.3 `rejected`

| | |
|--|--|
| **Entry** | Customer rejects or system closes after other accept |
| **Exit** | Terminal |
| **Allowed** | View |
| **Forbidden** | Accept |

### 3.4 `accepted`

| | |
|--|--|
| **Entry** | Customer accept transaction succeeds |
| **Exit** | Terminal for offers engine |
| **Allowed** | View; booking link |
| **Forbidden** | Withdraw; edit price |

### 3.5 `expired`

| | |
|--|--|
| **Entry** | Offer TTL or request closed without accept |
| **Exit** | Terminal |
| **Allowed** | View |
| **Forbidden** | Accept |

### 3.6 `superseded`

| | |
|--|--|
| **Entry** | A newer offer entity replaces this version under the engine versioning policy |
| **Exit** | Terminal |
| **Allowed** | View revision history and replacement link |
| **Forbidden** | Accept; edit; withdraw |

---

## 4. Booking States

Booking states: `confirmed` → `in_progress` → `completed` | `cancelled`

Dispute state is orthogonal and never replaces `bookingStatus`. While a dispute is open, `disputeStatus` and policy locks govern payment, warranty, review, payout, rework, and otherwise valid booking transitions.

### 4.1 `confirmed`

| | |
|--|--|
| **Entry** | Created from accepted offer; payment gates per policy |
| **Exit** | Start → `in_progress`; cancel → `cancelled` |
| **Allowed** | Chat; assign technician (company); cancel per policy; navigate |
| **Forbidden** | Complete; upload-only-after without start; warranty claim |

### 4.2 `in_progress`

| | |
|--|--|
| **Entry** | Start with required before images |
| **Exit** | Complete → `completed`; cancel rare/policy |
| **Allowed** | After images; complete; chat |
| **Forbidden** | Accept other offers; start again |

### 4.3 `completed`

| | |
|--|--|
| **Entry** | Complete with after images; payment capture as configured |
| **Exit** | Terminal (dispute/warranty are side machines) |
| **Allowed** | Review; view media; warranty; invoice |
| **Forbidden** | Re-complete; alter price |

### 4.4 `cancelled`

| | |
|--|--|
| **Entry** | Party/admin cancel with reason |
| **Exit** | Terminal; refunds via payment machine |
| **Allowed** | View; refund status |
| **Forbidden** | Start/complete |

### 4.5 Dispute overlay

| | |
|--|--|
| **Entry** | A dispute record opens for an eligible booking; `bookingStatus` is unchanged |
| **Exit** | Dispute closes; booking remains in its independently valid state |
| **Allowed** | Evidence upload; admin resolve; booking actions explicitly permitted by the dispute lock matrix |
| **Forbidden** | Treating `disputed` as a booking status; capture, payout, review, warranty, completion, or rework actions blocked by policy |

#### Open-dispute lock matrix

| Capability | Rule while dispute is open |
|------------|----------------------------|
| Booking start/complete | Block by default; an audited case resolution may permit a specific transition |
| Payment authorization/capture | No new capture unless the frozen payment policy and assigned Finance reviewer explicitly allow it |
| Refund/chargeback handling | Finance actions may proceed through the dispute resolution path; total reversals remain bounded by financial records |
| Provider payout/withdrawal | Hold the disputed payable amount; unrelated balances remain policy-controlled |
| Warranty issuance/new claim | Preserve existing warranty history; block overlapping claim outcomes that could duplicate compensation |
| Review publication | Accept draft if desired but withhold publication/score effects until resolution |
| Rework | Create only as an explicit warranty/dispute resolution outcome with one owning case |

Closing the dispute releases or replaces each lock through recorded resolution effects; it does not “return” the booking to a prior state.

---

## 5. Payment States

States: `pending` → `authorized` → `captured` | `failed` | `refunded` | `partially_refunded`

### 5.1 `pending`

| | |
|--|--|
| **Entry** | Payment intent created |
| **Exit** | Auth/capture success paths; fail; abandon TTL |
| **Allowed** | Client confirm with PSP; webhook updates |
| **Forbidden** | Manual status by customer |

### 5.2 `authorized`

| | |
|--|--|
| **Entry** | Auth succeeded (if auth-then-capture model) |
| **Exit** | Capture; void/cancel; expire auth |
| **Allowed** | Capture on complete / policy |
| **Forbidden** | Double capture |

### 5.3 `captured`

| | |
|--|--|
| **Entry** | Funds captured |
| **Exit** | Refund paths |
| **Allowed** | Full/partial refund |
| **Forbidden** | Capture again |

### 5.4 `failed`

| | |
|--|--|
| **Entry** | PSP decline/error |
| **Exit** | New attempt = new payment record preferred |
| **Allowed** | Retry new intent |
| **Forbidden** | Treat as paid |

### 5.5 `refunded` / `partially_refunded`

| | |
|--|--|
| **Entry** | Refund executed ≤ captured |
| **Exit** | Terminal or further partials until full |
| **Allowed** | View; loyalty clawback hooks |
| **Forbidden** | Refund above captured |

---

## 6. Warranty States

Warranty states: `active` → `expired` | `void`

Warranty claims are first-class records with their own lifecycle. An accepted or resolved claim does not terminalize the warranty; multiple accepted claims remain possible within policy limits while the warranty is `active`.

### 6.1 `active`

| | |
|--|--|
| **Entry** | Auto-issue on eligible completion |
| **Exit** | Coverage time expires; admin void |
| **Allowed** | Customer claim; view terms |
| **Forbidden** | Claim after end; provider delete |

### 6.2 Warranty claim states

`submitted` → `under_review` → `accepted` | `rejected` | `cancelled` | `escalated`; accepted claims may proceed `accepted` → `rework_scheduled` → `rework_in_progress` → `resolved`.

Each claim retains evidence, SLA timestamps, resolution, and any linked rework booking. A claim submitted before `endsAt` may continue after warranty expiry; no new claim may be submitted after expiry. See Warranty Engine for claim detail.

### 6.3 `expired`

| | |
|--|--|
| **Entry** | Past `endsAt` without blocking open claim rules |
| **Exit** | Terminal |
| **Allowed** | History view |
| **Forbidden** | New claims |

### 6.4 `void`

| | |
|--|--|
| **Entry** | Admin void with reason |
| **Exit** | Terminal |
| **Allowed** | Audit view |
| **Forbidden** | Claims |

---

## 7. Subscription States

States: `trialing` → `active` → `past_due` → `cancelled` → `expired`, plus rare `paused`. “Grace” is the product label for the policy window on `past_due`, not an additional persisted state.

### 7.1 `trialing`

| | |
|--|--|
| **Entry** | Trial start |
| **Exit** | Convert `active`; end → `expired`/Free |
| **Allowed** | Use trial entitlements |
| **Forbidden** | Infinite trial reset abuse |

### 7.2 `active`

| | |
|--|--|
| **Entry** | Paid success |
| **Exit** | Renew; cancel at period end; payment fail → `past_due` |
| **Allowed** | Full entitlements |
| **Forbidden** | Client-forged plan |

### 7.3 `past_due` (grace)

| | |
|--|--|
| **Entry** | Renewal failure |
| **Exit** | Pay → `active`; grace end → `expired` |
| **Allowed** | Limited/warned entitlements per policy |
| **Forbidden** | Ignoring grace expiry |

### 7.4 `cancelled`

| | |
|--|--|
| **Entry** | User cancel (often still entitled until period end) |
| **Exit** | Period end → `expired` |
| **Allowed** | Access until end if policy |
| **Forbidden** | Auto-renew |

### 7.5 `expired`

| | |
|--|--|
| **Entry** | No valid paid period |
| **Exit** | Resubscribe → `active` |
| **Allowed** | Free entitlements only |
| **Forbidden** | Paid caps/benefits |

### 7.6 `paused`

| | |
|--|--|
| **Entry** | Audited admin or billing pause |
| **Exit** | Resume to the policy-determined state or expire |
| **Allowed** | Complete existing jobs; use Free entitlements unless the pause policy preserves paid access |
| **Forbidden** | Silent paid-entitlement continuation without an explicit policy decision |

---

## 8. Dispute States

States: `open` → `under_review` → `awaiting_party` → `resolved` → `closed` | `appealed` | `cancelled`

### 8.1 `open`

| | |
|--|--|
| **Entry** | Party opens eligible dispute |
| **Exit** | Triage → `under_review`; withdraw → `cancelled` |
| **Allowed** | Add initial evidence |
| **Forbidden** | Self-resolve refunds |

### 8.2 `under_review`

| | |
|--|--|
| **Entry** | Admin assigned/triaged |
| **Exit** | Need info → `awaiting_party`; decide → `resolved` |
| **Allowed** | Admin notes; evidence lock eventually |
| **Forbidden** | Party altering resolution codes |

### 8.3 `awaiting_party`

| | |
|--|--|
| **Entry** | Waiting on customer/provider evidence |
| **Exit** | Resume review; timeout policy |
| **Allowed** | Party upload evidence |
| **Forbidden** | Silent close without notice |

### 8.4 `resolved` / `closed`

| | |
|--|--|
| **Entry** | Decision recorded; settlements applied → `closed` |
| **Exit** | Appeal → `appealed` within window |
| **Allowed** | View decision |
| **Forbidden** | Reopen except appeal/exception |

### 8.5 `appealed`

| | |
|--|--|
| **Entry** | Valid appeal |
| **Exit** | Final uphold/amend → `closed` |
| **Allowed** | Senior review |
| **Forbidden** | Infinite appeals |

---

## 9. Notification States

States: `pending` → `sent` | `failed` → `read` (in-app) | `partial`

### 9.1 `pending`

| | |
|--|--|
| **Entry** | Enqueued notification |
| **Exit** | Dispatch attempt |
| **Allowed** | Cancel if obsolete (collapse) |
| **Forbidden** | Mark read before create |

### 9.2 `sent` / `partial` / `failed`

| | |
|--|--|
| **Entry** | Channel results |
| **Exit** | Retry fail path; user read |
| **Allowed** | Retries per channel policy |
| **Forbidden** | Infinite SMS retry without cap |

### 9.3 `read`

| | |
|--|--|
| **Entry** | User marks read / opens |
| **Exit** | Terminal for inbox item |
| **Allowed** | Mark all read |
| **Forbidden** | Forge read for others |

---

## 10. Global Transition Rules

1. Unknown transitions → reject with conflict/validation error  
2. All privileged transitions audited with actor + timestamp  
3. Idempotent retries must not create duplicate side effects  
4. Terminal states are immutable except admin legal exceptions  

---

## 11. Related Documents

- `EDGE_CASES.md`
- `BUSINESS_SCENARIOS.md`
- `docs/BUSINESS_RULES.md`
- `docs/engines/*`
