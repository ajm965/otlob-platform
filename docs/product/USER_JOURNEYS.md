# User Journeys — Customer

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — Customer Journeys  
**Phase:** 1.9  
**Market:** Saudi Arabia (GCC-ready)  
**Status:** Baseline  

---

## 1. Purpose

Complete customer journeys for the Customer application (owned by a separate team). This document is the product contract for flows, screens intent, and handoffs to platform APIs—not UI implementation.

Primary language: Arabic (RTL). English secondary.

---

## 2. Persona Snapshot

| Attribute | Typical customer |
|-----------|------------------|
| Need | Reliable home service with clear price options |
| Concern | Trust, timing, warranty, fair price |
| Context | Busy; prefers phone OTP; expects nearby help fast |

---

## 3. Guest Journey

### Goal
Explore value before committing identity.

### Steps

1. Open app / store listing → splash branding **اطلب ولا تتعنى**
2. Optional language toggle (AR default / EN)
3. View marketing value props (trust, offers, warranty)—no fake demo data required
4. Browse public catalog categories (if policy allows public read) **or** see locked preview
5. Attempt create request → soft gate → Registration/Login
6. Favorites are not offered in MVP; any favorite action is a `v1.5` deferred-feature message, not an authentication gate

### Outcomes

| Path | Result |
|------|--------|
| Continue as guest browse | Limited catalog/marketing only |
| CTA “Request a service” | Auth required |
| Exit | No account created |

### Rules

- Guests cannot create requests, chat, pay, or see personal offers
- Deep links to requests require auth then resume intent
- Guest and authenticated technician favorites are deferred to `v1.5`; repeat-provider affinity may be derived from completed bookings without exposing a favorites journey

---

## 4. Registration Journey

### Goal
Create a customer identity quickly (phone-first).

### Steps

1. Enter mobile number (KSA format)
2. Receive OTP / verify
3. Optional profile bootstrap: name, locale
4. Accept Terms & Privacy
5. Create `users` profile with role `customer`
6. Optional: add first address / Home Passport starter
7. Land on Home

### Outcomes

- New customer ready to request
- Incomplete profile flagged but not blocking first request (product choice: allow with nudge)

### Failure paths

- Invalid OTP → retry with cooldown
- Number already registered → switch to Login
- Network loss → preserve form draft locally if safe

---

## 5. Login Journey

### Goal
Return to existing account.

### Steps

1. Enter phone (or supported method)
2. OTP / session restore
3. Load profile, open requests, notifications badge
4. Resume pending deep link if any

### Outcomes

- Active session
- Suspended account → blocking screen with support contact

---

## 6. Home Journey

### Goal
Orient customer and start the primary action.

### Home must surface

- Primary CTA: **Create Request**
- Active requests / bookings summary
- Categories shortcuts
- Notifications entry
- Addresses / Home Passport entry
- Support / help

### Rules

- Brand-first, uncluttered first viewport
- One primary job: get help for the home
- Arabic RTL layout defaults

---

## 7. Create Request Journey

### Goal
Describe a service need at a location.

### Steps

1. Select category → service
2. Select/create address (map pin + structured fields)
3. Describe problem (text + optional photos)
4. Optional preferred time window / urgency (`normal` / `same_day` / `emergency`)
5. Optional budget range
6. Review summary (service, place, time, media)
7. Confirm → `draft` then **Publish** → `open`
8. Matching starts; waiting state shown

### Outcomes

- Open request awaiting offers
- Sparse matching → messaging that search is expanding / try later

### Rules

- Cannot publish without location + service
- Media capped
- Clear cancel before booking

---

## 8. Receive Offers Journey

### Goal
Know when providers respond.

### Steps

1. Stay on request detail / offers inbox
2. Push + in-app when offer arrives
3. Offer count badge updates
4. Optional reminder if no offers after SLA

### Outcomes

- ≥1 offer → Compare
- 0 offers until expiry → Cancelled/Expired guidance + re-request CTA

---

## 9. Compare Offers Journey

### Goal
Choose fairly among price, ETA, quality signals.

### Comparison dimensions

- Price (SAR)
- ETA
- Rating / Technician Score band (as exposed)
- Subscription badge (informational, not hiding cheaper offers)
- Message / notes
- Repeat provider affinity if any

### Actions

- Sort: best value / price / ETA / rating
- Reject individual offer
- Open provider public profile
- Accept one offer

### Rules

- Transparency over dark patterns
- Flag unusually low/high prices without removing them (unless fraud hold)

---

## 10. Accept Offer Journey

### Goal
Lock one provider and create booking.

### Steps

1. Confirm acceptance sheet (price, provider, ETA, cancellation notes)
2. Confirm → platform accepts offer (idempotent)
3. Booking `confirmed`
4. Navigate to Payment / Booking detail per payment policy

### Outcomes

- Success → booking + loser offers closed
- Conflict (already booked) → refresh state

---

## 11. Payment Journey

### Goal
Authorize/capture payment per policy.

### Steps

1. See breakdown (service, fees, VAT, discounts/points)
2. Apply coupon / loyalty if available
3. Pay via PSP
4. Success → booking proceeds
5. Failure → retry / change method / cancel per rules

### Outcomes

- Paid / authorized
- Failed with clear next step
- Double-submit prevented

---

## 12. Tracking Journey

### Goal
Reduce anxiety between accept and arrival/start.

### Surfaces

- Booking status timeline
- Scheduled/start window
- Provider contact / chat
- Optional map navigation status (if shared)
- Support entry

---

## 13. Job Started Journey

### Goal
Customer knows work began with evidence.

### Steps

1. Notification: job started
2. Before images available to customer (read)
3. Status `in_progress`
4. Chat remains open

---

## 14. Job Completed Journey

### Goal
Confirm completion and unlock trust steps.

### Steps

1. Notification: completed + after images
2. See warranty activation summary
3. Prompt review (skippable with reminders)
4. Invoice/receipt access
5. Home Passport history updated (if linked)

---

## 15. Warranty Journey

### Goal
Understand coverage and claim if needed.

### Steps

1. View active warranties list
2. Open warranty detail (dates, scope summary)
3. Claim with reason + evidence
4. Track claim / rework booking
5. Expired → explain + create new request CTA

---

## 16. Review Journey

### Goal
Leave rating/review after completion.

### Steps

1. Rate overall (+ optional dimensions)
2. Optional text (AR/EN input OK)
3. Optional anonymous public display
4. Submit once per booking
5. Thank-you + loyalty points if applicable

---

## 17. Repeat Service Journey

### Goal
Reorder faster with known home/provider context.

### Steps

1. From Home Passport asset / past booking → **Request again**
2. Prefill service + address + asset notes
3. Optional prefer previous provider (affinity)—still offer marketplace unless “rehire direct” feature enabled later
4. Continue standard offer flow

---

## 18. Cancelled Flow

### Triggers

- Customer cancels request before book
- Customer/provider cancels booking within policy
- System expires request

### Steps

1. Select reason
2. Confirm impacts (fees/refunds)
3. Status updates + notifications
4. Guidance: create new request / contact support

---

## 19. Refund Flow

### Triggers

- Cancelation policy
- Dispute resolution
- Payment failure unwind
- Admin goodwill

### Steps

1. Customer sees refund status on booking/payment
2. Amount + timeline expectations
3. Wallet/PSP settlement confirmation
4. Loyalty clawback messaging if points reversed

---

## 20. Cross-Journey Notifications (Customer)

| Event | Expectation |
|-------|-------------|
| New offer | Immediate |
| Offer accepted confirmation | Immediate |
| Payment result | Immediate |
| Technician en route / started | High priority |
| Completed / warranty | High |
| Review reminders | Soft, capped |

---

## 21. Journey Metrics

- Time to first request
- Time to first offer
- Offer→accept conversion
- Payment success rate
- Completion rate
- Review rate
- Re-request rate

---

## 22. Related Documents

- `TECHNICIAN_JOURNEY.md`
- `STATE_MACHINE.md`
- `EDGE_CASES.md`
- `ACCEPTANCE_CRITERIA.md`
- `UX_RULES.md`
