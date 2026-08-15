# MVP Scope

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — MVP Definition  
**Phase:** 1.9  
**Status:** Baseline  
**Market focus:** Saudi Arabia first  

---

## 1. Purpose

Define what **is** and **is not** in MVP so engineering, product, and the external Customer team share one scope boundary.

MVP goal: a trustworthy request → offer → book → pay → complete → warranty → review loop in KSA cities with enough supply.

---

## 2. MVP Included

### 2.1 Customer (external app consuming APIs)

- Phone auth registration/login  
- Create/publish/cancel requests  
- Address + map pin  
- Receive/compare/accept/reject offers  
- Payment checkout (PSP) with breakdown  
- Booking tracking + chat  
- Before/after image viewing  
- Basic warranty view + claim submit  
- Review/rating once  
- Notifications (push + in-app) for critical events  
- Arabic-first UX; English secondary  

### 2.2 Technician

- Registration + document verification submit  
- Profile, services, radius, hours, availability  
- Free tier participation with server-enforced entitlement snapshot, offer caps, active-booking cap, selected-service cap, base matching priority, and Free commission schedule  
- Receive nearby requests + submit/withdraw offers  
- Accept flow handling + navigation to job  
- Start/complete with before/after media  
- Basic earnings view  
- Basic performance/rating visibility  

### 2.3 Platform / Admin (minimum viable ops)

- Verify technicians  
- Catalog manage categories/services  
- Monitor requests/bookings  
- Basic dispute intake + resolve (refund/rework/no-action)  
- Suspend abusive accounts  
- Payment investigation basics  

### 2.4 Platform Backend Capabilities

- Matching v1 (distance, services, verification, basic score/subscription weights)  
- Offers engine exclusivity  
- Pricing bounds + commission + VAT fields readiness  
- Notifications critical path  
- State machines enforced server-side  
- Free entitlements v1 available before Matching/Offers: policy version, denormalized provider snapshot, cap counters, and reconciliation  

---

## 3. MVP Explicitly NOT Included

| Item | Deferred to |
|------|-------------|
| Full Company multi-branch console | Post-MVP / v1.5–v2 |
| Premium subscription sophistication / featured marketplace | v1.5+ |
| Home Passport full intelligence + AI recommendations | v1.5–v2 |
| Loyalty points / referrals | v1.5+ |
| Advanced AI matching/pricing | v2 |
| Customer “rehire direct only” private jobs | Later |
| Multi-country GCC launch | After SA stability |
| Complex partial change-orders mid-job | Later |
| In-app wallet cash-out promotions | Later |
| Full accountant CSV suite | Later |
| Super-advanced fraud graph ML | Hardening |
| Admin perfect analytics warehouse | Progressive |
| Chat voice/video | Later |
| Technician withdrawals automation maturity | May be manual ops initially |
| Guest or customer technician favorites | v1.5; repeat-provider affinity may use completed-booking history without a favorites feature |

---

## 4. MVP Quality Bar (Non-negotiable)

Even in MVP:

- No double booking on accept  
- No double charge  
- Server-side authz  
- Before/after evidence gates  
- Arabic RTL acceptable quality  
- Honest empty/sparse states  
- Audit on admin money/trust actions  
- Free caps and commission are enforced from the first provider offer; no placeholder “unlimited Free” period  
- MVP Arabic/English, RTL, money/date formatting, accessibility, and recovery gates in `TESTING_GUIDE.md` pass  

---

## 5. MVP Success Criteria

| Metric | Direction |
|--------|-----------|
| Time to first offer | Low in launched cities |
| Payment success rate | High |
| Completion rate | Healthy |
| Dispute rate | Controlled |
| Crash-free sessions | High |
| Verification turnaround | Within ops SLA |

Exact numeric targets set at launch city planning.

---

## 6. Future Roadmap (Product View)

| Horizon | Themes |
|---------|--------|
| Post-MVP | Company, subscriptions paid tiers, stronger admin |
| v1.5 | Home Passport, loyalty, better ranking, withdrawals polish |
| v2.0 | GCC expansion, AI assist matching/pricing, deeper B2B |

See `RELEASE_PLAN.md` and `docs/ROADMAP.md`.

---

## 7. Scope Change Control

Any addition to MVP requires:

1. Explicit product approval  
2. Dependency check (`FEATURE_DEPENDENCIES.md`)  
3. Impact on launch date  
4. Update of this document in the same decision record  

---

## 8. Related Documents

- `FEATURE_DEPENDENCIES.md`
- `RELEASE_PLAN.md`
- `ACCEPTANCE_CRITERIA.md`
- `PRODUCT_PRINCIPLES.md`
