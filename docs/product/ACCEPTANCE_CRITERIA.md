# Acceptance Criteria

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — Acceptance Criteria  
**Phase:** 1.9  
**Status:** Baseline  

---

## 1. Purpose

Measurable completion rules for major features. A feature is not done unless criteria pass in staging (and automated tests where applicable).

Format: **Given / When / Then** plus explicit checks.

Every criterion carries a release tag: `[MVP]`, `[v1.5]`, or `[v2.0]`. Untagged criteria are invalid for planning.

---

## 2. Create Request

### AC-REQ-01 [MVP]
Given an authenticated customer with a valid address, When they submit a complete request and publish, Then the request status is `open` and Matching is triggered.

### AC-REQ-02 [MVP]
Given missing location or service, When publish is attempted, Then the action fails with validation errors and no open request is created.

### AC-REQ-03 [MVP]
Given media over count/size limits, When uploading, Then excess is rejected with clear errors.

### AC-REQ-04 [MVP]
Given a `draft` request, When the customer edits fields, Then changes persist until publish.

### AC-REQ-05 [MVP]
Given an `open` request, When the customer cancels, Then status is `cancelled` and active offers close.

---

## 3. Receive Offers

### AC-OFF-R01 [MVP]
Given an `open` request and eligible providers, When matching completes, Then providers can see the request per policy and customer can receive offer notifications.

### AC-OFF-R02 [MVP]
Given a new offer, When it is submitted, Then the customer receives push/in-app notification within the notification SLA and offer appears in list.

### AC-OFF-R03 [MVP]
Given no offers until expiry, When TTL passes, Then request expires and customer sees re-request guidance.

---

## 4. Compare Offers

### AC-CMP-01 [MVP]
Given multiple `submitted` offers, When the customer opens comparison, Then price, ETA, and provider quality signals are visible.

### AC-CMP-02 [MVP]
Given sort options, When sorting by price/ETA/rating, Then order changes deterministically.

### AC-CMP-03 [MVP]
Given an offer above budget max, When listed, Then it is flagged `above_budget` without being hidden by default.

### AC-CMP-04 [MVP]
Given a customer rejects an offer, When confirmed, Then that offer becomes `rejected` and others remain.

---

## 5. Accept Offer

### AC-ACC-01 [MVP]
Given an `open` request and `submitted` offer, When the owner accepts with Idempotency-Key, Then exactly one booking is created and request becomes `booked`.

### AC-ACC-02 [MVP]
Given a concurrent second accept, When processed, Then only one succeeds and the other receives conflict.

### AC-ACC-03 [MVP]
Given an expired offer, When accept is attempted, Then accept fails and UI refreshes.

### AC-ACC-04 [MVP]
Given successful accept, When losers exist, Then the request has already reserved exclusivity, every loser accept returns conflict even before asynchronous closure completes, and loser offers are eventually closed with canonical reason `accepted_competitor`.

---

## 6. Chat

### AC-CHAT-01 [MVP]
Given a confirmed booking, When chat is opened, Then only participants can read/send.

### AC-CHAT-02 [MVP]
Given a text message, When sent, Then it appears for both parties in order.

### AC-CHAT-03 [MVP]
Given a non-participant, When access is attempted, Then access is denied.

### AC-CHAT-04 [MVP]
Given rate limit exceeded, When sending, Then the send fails gracefully.

---

## 7. Payment

### AC-PAY-01 [MVP]
Given a booking requiring payment, When the customer pays successfully, Then payment reaches `authorized` or `captured` per policy and booking can proceed.

### AC-PAY-02 [MVP]
Given payment failure, When PSP declines, Then status is `failed`, user sees retry, and job start remains blocked if prepaid required.

### AC-PAY-03 [MVP]
Given duplicate submit with same Idempotency-Key, When retried, Then no double charge occurs.

### AC-PAY-04 [MVP]
Given a breakdown view, When shown, Then amounts equal server-calculated components (gross, fees, VAT, discounts).

---

## 8. Job Start / Complete

### AC-JOB-01 [MVP]
Given `confirmed` booking and required before images, When technician starts, Then status is `in_progress` and customer is notified.

### AC-JOB-02 [MVP]
Given missing before images, When start is attempted, Then start fails.

### AC-JOB-03 [MVP]
Given `in_progress` and after images, When complete, Then status is `completed` and after media is stored.

### AC-JOB-04 [MVP]
Given missing after images, When complete is attempted, Then complete fails.

---

## 9. Warranty

### AC-WAR-01 [MVP]
Given eligible completed booking, When completion succeeds, Then a warranty is issued `active` with correct end date.

### AC-WAR-02 [MVP]
Given an `active` warranty within window and valid evidence, When customer claims, Then a first-class claim enters `submitted` without changing the warranty from `active`.

### AC-WAR-03 [MVP]
Given expired warranty, When claim attempted, Then claim is rejected with `warranty_expired`.

### AC-WAR-04 [MVP]
Given accepted claim, When rework is required, Then a linked rework booking path exists.

### AC-WAR-05 [MVP]
Given a resolved prior claim, an `active` warranty, and remaining accepted-claim allowance, When a new in-scope claim is submitted before the market-timezone expiry boundary, Then a distinct claim is accepted for review without reviving or replacing the prior claim.

---

## 10. Dispute

### AC-DIS-01 [MVP]
Given an eligible booking and party user, When dispute is opened with reason, Then dispute is `open` and counterparty notified.

### AC-DIS-02 [MVP]
Given an existing open dispute, When another open is attempted, Then it is rejected.

### AC-DIS-03 [MVP]
Given admin resolution with refund, When applied, Then payment refund ≤ captured and parties notified.

### AC-DIS-04 [MVP]
Given resolution within appeal window with new evidence, When appeal submitted, Then dispute enters `appealed`.

---

## 11. Review

### AC-REV-01 [MVP]
Given completed booking and customer, When review submitted with 1–5 rating, Then review is stored and aggregates update.

### AC-REV-02 [MVP]
Given an existing review for booking, When second submit attempted, Then it is rejected.

### AC-REV-03 [MVP]
Given admin hides review, When public list fetched, Then hidden review is not shown publicly.

---

## 12. Subscription (Provider)

### AC-SUB-01 [MVP]
Given Free plan at daily offer cap, When another offer is submitted, Then it fails with upgrade guidance.

### AC-SUB-02 [v1.5]
Given successful Pro subscribe, When entitlements refresh, Then higher caps/commission schedule apply to new offers.

### AC-SUB-03 [v1.5]
Given past_due beyond grace, When offering, Then paid entitlements no longer apply.

---

## 13. Company Assignment

### AC-COM-01 [v1.5 / post-MVP]
Given company booking without assignee, When dispatcher assigns an active member, Then technician can start job.

### AC-COM-02 [v1.5 / post-MVP]
Given non-member technician id, When assign attempted, Then assign fails.

---

## 14. Admin Verification

### AC-ADM-01 [MVP]
Given pending technician documents, When admin approves, Then technician can participate in matching per rules.

### AC-ADM-02 [MVP]
Given rejection with reason, When technician views status, Then reason is visible and resubmit allowed.

---

## 15. Notifications

### AC-NOT-01 [MVP]
Given offer received event, When notification engine runs, Then in-app record exists and push attempted if enabled.

### AC-NOT-02 [MVP]
Given invalid FCM token, When push fails permanently, Then token is pruned.

---

## 16. Definition of Feature Done

Feature acceptance requires:

- All AC IDs for the feature passing
- Edge cases in `EDGE_CASES.md` for that feature addressed or explicitly deferred in MVP_SCOPE
- Analytics events for funnel steps emitting in staging
- Automated test cases cite the applicable AC ID, lifecycle transition ID, and Edge Case ID; exceptions state why no state/edge ID applies
- Release scope is evaluated from each AC tag; passing a later-release AC never blocks an earlier release unless promoted through scope control

---

## 17. Related Documents

- `USER_STORIES.md`
- `STATE_MACHINE.md`
- `MVP_SCOPE.md`
- `ERROR_SCENARIOS.md`
