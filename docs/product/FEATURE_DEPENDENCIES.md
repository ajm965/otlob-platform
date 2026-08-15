# Feature Dependencies

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — Feature Dependency Graph  
**Phase:** 1.9  
**Status:** Baseline  

---

## 1. Purpose

Define which features depend on others so MVP sequencing, staffing, and release planning stay coherent.

---

## 2. Dependency Legend

| Symbol | Meaning |
|--------|---------|
| → | “requires / depends on” |
| Hard | Cannot ship without |
| Soft | Degrades but usable without |

---

## 3. Foundation Layer (Hard for almost everything)

```text
Identity/Auth → Profiles/Roles → Notifications (basic)
                ↘ Catalog (categories/services)
                ↘ Addresses / Location
```

---

## 4. Core Marketplace Graph

```text
Catalog + Addresses + Auth
        → Create Request
            → Matching
                → Offer Submit
                    → Compare Offers
                        → Accept Offer (= authorize funds, then commit booking under one idempotency key)
                            → Booking confirmed + Payment authorized
                                    → Job Start (before images)
                                        → Job Complete (after images)
                                            → Warranty
                                            → Review
                                            → Home Passport history (soft)
                                            → Capture on eligible completion
```

### Hard dependencies (core)

| Feature | Depends on |
|---------|------------|
| Create Request | Auth, Catalog, Address/Location |
| Matching | Request open, Technician profile geo/services, Verification |
| Submit Offer | Matching visibility (or policy), Verification, Free entitlement foundation |
| Accept Offer | Submitted offer, Request open, payment authorization capability |
| Booking | Successful Accept Offer commit after authorization |
| Payment authorization | Bound to Accept Offer (same idempotency key); not a post-booking prerequisite for KSA v1 |
| Payment capture | Booking completed (or eligible cancellation fee policy) |
| Job Start | Booking confirmed + valid authorization (unless finance-audited exception), Assignment if company |
| Job Complete | Job Start + after media |
| Warranty | Eligible Job Complete |
| Review | Job Complete |
| Chat | Booking (preferred) |

---

## 5. Provider Growth Graph

```text
Technician Registration → KYC Verification → Profile Completion
        → Subscription (soft for Free tier)
            → Matching eligibility
                → Offers → Earnings ledger → Withdrawals (needs payout KYC)
Technician Ranking ← Reviews, Completions, Cancellations, Claims, Response metrics
```

| Feature | Depends on |
|---------|------------|
| Withdrawals | Earnings, Payout account KYC, Finance rules |
| Ranking score | Job/review/dispute/warranty events |
| Free entitlements v1 | Technician eligibility, Matching priority, Offer submit, Pricing commission snapshot |
| Paid subscription gating | Offer submit, Matching priority, billing lifecycle |

---

## 6. Company Graph

```text
Company Registration → Company Verification → Company Subscription
        → Branches
        → Seats / Technicians
            → Company Offers → Accept → Assignment → Job execution
                → Company reports / invoices
```

| Feature | Depends on |
|---------|------------|
| Company offers | Verified company + subscription seats |
| Assignment | Company booking |
| Company invoices | Payments + company legal profile |

---

## 7. Trust & Safety Graph

```text
Booking/Payment/Job media
        → Dispute
            → Refund / Compensation / Rework
Warranty ← Job Complete
Moderation ← Reviews, Chat reports, KYC
Admin Dashboard ← all operational queues
```

---

## 8. Loyalty & Passport (Often soft on MVP core)

```text
Job Complete → Loyalty earn (soft)
Payment → Loyalty redeem (soft; needs Pricing)
Job Complete → Home Passport history (soft)
Home Passport → Maintenance reminders → Create Request prefills (soft)
Home Passport → Pricing confidence (soft)
```

---

## 9. Notification Dependencies

| Notification family | Depends on |
|---------------------|
| Offer received | Offer submit |
| Matching waves | Matching engine |
| Payment results | Payment webhooks |
| Job status | Booking transitions |
| Dispute/warranty | Trust engines |
| Subscription grace | Billing events |

Notifications are soft for marketplace correctness but hard for operational quality.

---

## 10. Suggested Build Order (Product)

1. Auth + Profiles + Catalog + Addresses  
2. Free entitlements v1 foundation: policy version, provider snapshot, caps, counters, commission input, reconciliation  
3. Request + Matching (basic) + Offers + Accept(=authorize-then-book)  
4. Capture + Job media + Complete  
5. Notifications critical path  
6. Warranty + Review  
7. Admin verification + disputes (minimum)  
8. Paid Pro/Premium subscriptions (`v1.5`)  
9. Company (`v1.5`)  
10. Home Passport + Loyalty (`v1.5`)  
11. Advanced ranking/matching AI (`v2.0`)  

This is dependency order, not an independent engineering phase map. `docs/ROADMAP.md` exclusively owns phase numbering and staffing sequence; `RELEASE_PLAN.md` owns release scope and gates.

---

## 11. Circular Dependency Avoidance

- Ranking must not block first offers (cold start)  
- Loyalty must not block payment success path  
- Home Passport must not block create request  
- Subscription paid tiers must not be required for first verified technician (Free tier exists)  
- Free entitlement enforcement is a hard Matching/Offers prerequisite even though paid subscription billing is deferred  

---

## 12. Related Documents

- `MVP_SCOPE.md`
- `RELEASE_PLAN.md`
- `docs/ROADMAP.md`
- `docs/engines/README.md`
