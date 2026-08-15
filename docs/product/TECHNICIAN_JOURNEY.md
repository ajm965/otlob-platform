# Technician Journey

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — Technician Journeys  
**Phase:** 1.9  
**Status:** Baseline  

---

## 1. Purpose

End-to-end journeys for individual technicians using the future Technician app (this repository plans it; implementation later).

---

## 2. Registration

### Steps

1. Download / open Technician app
2. Phone OTP registration
3. Choose role path: Independent technician
4. Accept provider terms
5. Create user + technician profile shell (`pending` verification)

### Outcome

- Account exists but **cannot** receive paid marketplace offers until verified (and subscription gates if enabled)

---

## 3. Verification

### Steps

1. Upload required documents (national ID, licenses/certificates as required)
2. Submit for review (`pending`)
3. Wait for admin decision
4. Approved → `active` / offers may enable
5. Rejected → reason + resubmit

### Rules

- Clear document checklist AR/EN
- Status always visible on Home
- No matching while unapproved

---

## 4. Profile Completion

### Checklist

- Photo, display name, bio AR/EN
- Services / categories
- Service radius + city
- Working hours
- Portfolio samples (optional)
- Availability toggle

### Outcome

- Profile completion % feeds Ranking Engine
- Nudges until complete; hard blocks only where policy requires (e.g., services empty)

---

## 5. Subscription

### Steps

1. View plans: Free / Pro / Premium
2. See limits (offers/day), commission, priority benefits
3. Subscribe / trial / upgrade
4. Manage renewal, invoices, grace warnings
5. Cancel → period-end messaging

### Outcome

- Entitlements applied to matching/offers/commission quotes

---

## 6. Receiving Requests

### Steps

1. Go online / available
2. Receive nearby request notifications (wave-based)
3. Open request detail: service, location distance, description, media, budget hints
4. Decide: offer / ignore / snooze (if feature exists)

### Rules

- Respect working hours & daily caps
- Sparse areas show honest empty states

---

## 7. Submitting Offers

### Steps

1. Enter price (suggested range shown)
2. ETA minutes
3. Optional message
4. Preview net after commission
5. Submit
6. Track status: submitted / edited / withdrawn

### Rules

- One active offer per request
- Edit/withdraw within policy windows
- Cap errors explained clearly

---

## 8. Offer Accepted

### Steps

1. Winner notification (push + SMS optional)
2. Booking confirmed detail
3. Customer address / contact / chat unlock per policy
4. Navigation prep
5. Losers get rejection/expiry notice (other providers)

---

## 9. Navigation

### Steps

1. Open maps navigation to job pin
2. Share on-the-way status (optional)
3. Handle GPS unavailable → manual address + guidance

### Rules

- Do not expose customer exact location earlier than policy allows

---

## 10. Start Job + Before Images

### Steps

1. Arrive → **Start Job**
2. Mandatory **before** photos (min count)
3. Status → `in_progress`
4. Customer notified

### Forbidden

- Start without before images
- Start if payment policy blocks

---

## 11. Finish Job + After Images

### Steps

1. Complete work
2. Upload **after** photos
3. Optional parts replaced notes (Home Passport)
4. **Complete Job**
5. Warranty auto-issued when eligible
6. Earnings update pending settlement rules

---

## 12. Warranty (Technician View)

### Steps

1. See warranties on completed jobs
2. Receive claim notifications
3. Accept rework schedule / perform rework booking
4. Escalation if SLA missed

---

## 13. Earnings

### Surfaces

- Pending / available balances
- Per-job breakdown (gross, commission, net)
- Historical statements
- Holds due to disputes

---

## 14. Withdrawals

### Steps

1. Link payout method (KYC’d)
2. Request withdrawal of available balance
3. Processing states
4. Failures with reasons (bank reject, compliance hold)

### Rules

- Minimum withdrawal amounts
- Cooldown / limits for fraud control

---

## 15. Performance

### Surfaces

- Technician Score band + improvement tips
- Ratings, completion, cancellation, response time
- Subscription impact explained separately from score
- Warnings when approaching disable thresholds

---

## 16. Metrics

- Time to first offer after notify
- Win rate
- On-time start rate
- Cancellation rate
- Claim rate
- Withdrawal success rate

---

## 17. Related Documents

- `USER_JOURNEYS.md`
- `COMPANY_JOURNEY.md`
- `STATE_MACHINE.md`
- `docs/engines/TECHNICIAN_RANKING_ENGINE.md`
- `docs/engines/SUBSCRIPTION_ENGINE.md`
