# Business Scenarios

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — Business Scenarios  
**Phase:** 1.9  
**Status:** Baseline  

---

## 1. Purpose

Document happy paths, alternative paths, failure paths, and recovery paths for core marketplace scenarios.

---

## 2. Scenario Template

Each scenario uses:

- **Actors**
- **Preconditions**
- **Flow**
- **Postconditions**
- **Metrics**

---

## 3. Happy Path — Request to Review

**ID:** BS-HP-001  
**Actors:** Customer, Technician, Platform  

**Preconditions:** Customer authenticated; technician verified, available, in range, under caps; service active.

**Flow:**

1. Customer creates and publishes request  
2. Matching notifies technician  
3. Technician submits offer  
4. Customer compares and accepts  
5. Payment succeeds  
6. Technician navigates, starts with before images  
7. Technician completes with after images  
8. Warranty issued  
9. Customer reviews  

**Postconditions:** Booking `completed`; payment captured; warranty `active`; rating updated.

**Metrics:** Full funnel conversion.

---

## 4. Happy Path — Company Dispatch

**ID:** BS-HP-002  

**Flow:** Company offer accepted → dispatcher assigns technician → technician executes → company aggregates rating.

**Postconditions:** Booking linked to company + technician; payout to company account.

---

## 5. Alternative Paths

### BS-ALT-001 — Multiple offers, reject then accept

Customer rejects two offers, accepts a third. Losers notified; booking created from third.

### BS-ALT-002 — Budget exceeded offer still selectable

Offer flagged above budget; customer explicitly accepts after confirmation.

### BS-ALT-003 — Scheduled window (not immediate)

Request has future preferred window; matching prioritizes overlap with working hours; less weight on last-online.

### BS-ALT-004 — Repeat customer affinity

Previous provider receives soft boost; customer still sees full marketplace unless rehire-direct enabled later.

### BS-ALT-005 — Coupon / loyalty redemption

Customer applies coupon/points at payment; server recomputes breakdown; booking commercial snapshot frozen.

### BS-ALT-006 — Warranty rework success

Claim accepted → rework booking completed → claim resolved; original warranty dates per policy.

### BS-ALT-007 — Upgrade subscription mid-day

Technician upgrades Free→Pro; remaining day uses new caps/commission for new offers.

---

## 6. Failure Paths

### BS-FAIL-001 — No supply

Matching returns empty after max radius → customer sparse UI → request may expire.

### BS-FAIL-002 — Payment declined

Payment `failed` → start blocked → customer retries or cancels per policy.

### BS-FAIL-003 — Accept race

Second accept fails conflict → UI shows existing booking winner.

### BS-FAIL-004 — Technician no-show

Customer cancels/disputes → refund path → technician penalties.

### BS-FAIL-005 — Verification rejected

Technician cannot offer until resubmit approved.

### BS-FAIL-006 — Dispute opens after completion

Booking locked for conflicting transitions; admin resolves refund/rework/no-action.

### BS-FAIL-007 — Subscription grace exhausted

Paid entitlements removed; offer submit may fail caps/gates.

---

## 7. Recovery Paths

### BS-REC-001 — Expand matching waves

After low offer count, notify next priority bucket; customer sees “still searching”.

### BS-REC-002 — Payment retry with idempotency

Customer retries; same key or new attempt per UX rules; no double capture.

### BS-REC-003 — Company reassignment

Assigned technician unavailable → dispatcher reassigns before/at start.

### BS-REC-004 — Resume media uploads

Network loss during after images → retry → then complete.

### BS-REC-005 — Appeal dispute

Party appeals with new evidence → senior admin amend/uphold.

### BS-REC-006 — Re-request after expiry

Customer clones previous request details into new open request.

### BS-REC-007 — Account reinstatement

Suspended user appeals → admin reinstates → privileges restored.

---

## 8. Emergency Scenario

**ID:** BS-EMG-001  

Urgency emergency → wider radius, faster waves, surcharge disclosure → prioritize ETA in comparison → accelerated reminders.

---

## 9. Trust Scenario — Fraud Suspicion

**ID:** BS-TRU-001  

Abnormal underpricing + off-platform solicitation reports → offers frozen / account review → customer protected with support messaging.

---

## 10. Related Documents

- `EDGE_CASES.md`
- `STATE_MACHINE.md`
- `ERROR_SCENARIOS.md`
- `USER_JOURNEYS.md`
