# Pricing Engine

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Business Engine Specification  
**Engine ID:** `pricing`  
**Phase:** 1.5 — Business Engines  
**Status:** Design baseline  
**Scale Target:** Millions of users across KSA and future GCC markets  

---

## 1. Purpose

The Pricing Engine provides **price guidance, validation bounds, fee calculation, tax handling, and promotional adjustments** for marketplace offers and bookings.

It does not accept offers or capture payments. It supplies canonical money math in **halalas (SAR)** and future GCC currencies.

---

## 2. Design Goals

| Goal | Requirement |
|------|-------------|
| Integrity | Server recomputes all fees; clients never decide commission |
| Transparency | Customers and providers see clear price breakdowns |
| Flexibility | City/service/urgency/plan-aware policies |
| Compliance | VAT-ready for KSA; extensible to GCC tax regimes |
| Stability | Integer money math only (no floating SAR) |

---

## 3. Money Conventions

| Rule | Detail |
|------|--------|
| Currency default | `SAR` |
| Storage unit | Integer halalas (1 SAR = 100 halalas) |
| Rounding | Half-up to nearest halala on percentage fees unless finance policy says otherwise |
| Display | Localization layer formats SAR for AR/EN |
| Multi-currency (future) | `currencyCode` + FX policy per country pack |

---

## 4. Price Components (Canonical Breakdown)

For a quoted job amount (`grossAmountHalalas` = what customer pays for service before/after tax per display policy):

| Component | Description |
|-----------|-------------|
| Base service price | Provider quote |
| Emergency surcharge | Urgency multiplier/add-on |
| Night surcharge | Time-of-day add-on |
| Holiday surcharge | Calendar add-on |
| Discount / coupon | Reductions |
| Platform fee | Customer-side and/or provider-side fee per policy |
| Commission | Platform share of provider earnings |
| VAT / tax | Statutory tax |
| Net to provider | After commission/fees/tax rules |

Exact incidence (who pays fee) is policy-configurable; defaults below for KSA v1.

---

## 5. Suggested Price

### 5.1 Purpose

Advisory “market estimate” shown to customers when creating requests and to providers when bidding.

### 5.2 Inputs

- Service ID
- City / region
- Property signals (optional Home Passport size/rooms)
- Urgency
- Time window (night/holiday)
- Historical median accepted prices (rolling window)
- Seasonality index

### 5.3 Output

| Field | Meaning |
|-------|---------|
| `suggestedHalalas` | Point estimate |
| `rangeMinHalalas` | Low band |
| `rangeMaxHalalas` | High band |
| `confidence` | `low` \| `medium` \| `high` |
| `policyVersion` | Traceability |

### 5.4 Rules

- Suggested price is **non-binding** by default.
- Low confidence when sample size insufficient → widen range + use catalog defaults.
- Never show competitor personal data; only aggregates.

---

## 6. Customer Budget

| Field | Role |
|-------|------|
| `budgetMinHalalas` | Optional lower preference |
| `budgetMaxHalalas` | Optional upper preference |

### Rules

1. Budget does not block offer submission by default.
2. Offers above `budgetMax` are flagged `above_budget` in comparison UI.
3. Offers below `budgetMin` may be flagged `unusually_low` if also below market floor heuristics.
4. Customer may filter comparison list by budget without deleting offers.

---

## 7. Minimum Price

### 7.1 Sources (strictest wins)

1. Platform global minimum for marketplace jobs
2. Per-service minimum
3. Per-city minimum
4. Subscription-tier provider minimum override (rare)
5. Anti-dumping floor relative to suggested price (e.g., not below X% of suggested) when enabled

### 7.2 Enforcement

- Offer create/edit rejected with `price_below_minimum` if `amountHalalas < minAllowed`.
- Admin can grant exceptions with audit for special campaigns.

---

## 8. Maximum Price

### 8.1 Sources

1. Per-service maximum
2. Per-city maximum
3. Soft max vs suggested (warning) vs hard max (block)
4. Emergency category higher caps

### 8.2 Enforcement

- Hard max violations → `price_above_maximum`
- Soft max → allow with `price_outlier_high` flag for customer attention

---

## 9. Platform Fee

### 9.1 Definition

Fixed and/or percentage fee charged for using the platform, distinct from provider commission if policy splits them.

### 9.2 Default KSA v1 Options (configurable)

| Model | Description |
|-------|-------------|
| A | Customer pays service price; platform takes commission from provider (no separate customer fee) |
| B | Small customer service fee + provider commission |
| C | Subscription-funded reduced commission (see Subscription Engine) |

### 9.3 Fee Calculation Inputs

- Gross job amount
- Service category
- City
- Subscription plan of provider
- Campaign flags

### 9.4 Output Fields

- `platformFeeHalalas`
- `platformFeePayer` = `customer` \| `provider` \| `split`

---

## 10. Commission

### 10.1 Definition

Percentage (basis points) of eligible amount owed to platform from provider proceeds.

### 10.2 Commission Base

Default: `amountHalalas` after discounts, before VAT (finance-configurable).

### 10.3 Plan-Based Commission Rules (defaults)

| Plan | Example commission bps | Notes |
|------|------------------------|-------|
| Free | 1500 (15%) | Highest |
| Pro | 1200 (12%) | Reduced |
| Premium | 900 (9%) | Lowest individual |
| Company | 1000 (10%) | Volume tiers may reduce further |

Exact bps live in Subscription Engine + Pricing policy pack; Pricing Engine is the calculator.

### 10.4 Caps

Optional `minCommissionHalalas` and `maxCommissionHalalas` per job.

### 10.5 Transparency

Provider sees estimated net **before** submitting offer.

---

## 11. Discounts

### 11.1 Types

| Type | Description |
|------|-------------|
| Provider discount | Provider voluntarily prices below suggestion |
| Platform discount | Platform-funded reduction |
| Subscription perk | e.g., fee waiver campaigns |

### 11.2 Rules

- Platform-funded discounts require budget/campaign IDs.
- Discount cannot push final price below minimum floor.
- Stacking policy: define allowed combinations (default: one platform discount + coupons rules below).

---

## 12. Coupons

### 12.1 Coupon Properties

| Field | Description |
|-------|-------------|
| `code` | Customer-entered code |
| `type` | `percent` \| `fixed` |
| `value` | bps or halalas |
| `maxRedemptionHalalas` | Cap for percent coupons |
| `eligibleServiceIds` | Optional |
| `eligibleCities` | Optional |
| `startsAt` / `endsAt` | Validity |
| `usageLimitGlobal` | Inventory |
| `usageLimitPerCustomer` | Fairness |
| `firstBookingOnly` | Acquisition |

### 12.2 Application Moment

- Prefer apply at payment intent for accepted booking (not at every offer), unless product shows “price with coupon” preview.
- Revalidate coupon at payment time (expiry, usage).

### 12.3 Funding

| Funder | Effect |
|--------|--------|
| Platform | Reduces customer pay; platform absorbs |
| Provider | Rare co-funded campaigns |

### 12.4 Failures

Stable codes: `coupon_invalid`, `coupon_expired`, `coupon_not_applicable`, `coupon_limit_reached`.

---

## 13. Taxes (VAT)

### 13.1 KSA Baseline

- VAT rate in basis points (e.g., 1500 = 15%) from tax config, not hard-coded forever.
- Tax invoice fields reserved for compliance phase.

### 13.2 Computation Fields

| Field | Meaning |
|-------|---------|
| `vatRateBps` | Applied rate |
| `vatAmountHalalas` | Computed tax |
| `amountExVatHalalas` | Net of VAT if displayed that way |
| `amountIncVatHalalas` | Customer gross if VAT-inclusive presentation |

### 13.3 Display Policy

Market setting chooses VAT-inclusive vs exclusive customer display; internal storage keeps components explicit.

### 13.4 GCC Readiness

Tax module keyed by `countryCode` with different rates/rules without rewriting engine.

---

## 14. Emergency Pricing

When `urgency=emergency`:

| Lever | Default behavior |
|-------|------------------|
| Suggested price | Uplift multiplier (e.g., +25% to +100% by service) |
| Minimum price | Raise floor |
| Maximum price | Raise cap |
| Commission | Optional emergency commission schedule |
| Customer notice | Mandatory surcharge disclosure |

Emergency uplift must be explained in breakdown as `emergencySurchargeHalalas`.

---

## 15. Night Pricing

### 15.1 Night Window

Configurable local windows (example: 22:00–06:00 Asia/Riyadh).

### 15.2 Application

If job scheduled start or request publish time falls in night window (policy chooses which):

- Apply `nightSurcharge` percent or fixed
- Surfacing in breakdown mandatory

### 15.3 Overlap with Emergency

Combine using explicit stacking rules (default: apply both; cap total surcharge percentage).

---

## 16. Holiday Pricing

### 16.1 Calendar

Country holiday calendar (KSA official holidays + optional city events).

### 16.2 Rules

- Holiday surcharge percent/fixed by service
- Blackout services possible (no matching) separate from pricing
- Multi-day holidays supported

---

## 17. Validation API (Logical Responsibilities)

Pricing Engine must support these operations conceptually:

1. **Suggest** price for request context  
2. **ValidateOfferAmount** against min/max/flags  
3. **QuoteBreakdown** for provider/customer preview  
4. **FinalizeBookingAmounts** at acceptance/payment  
5. **ApplyCoupon** at payment  
6. **ComputePayout** for provider net  

Each returns `policyVersion` for audit.

---

## 18. Finalization at Acceptance / Payment

At booking finalization, freeze:

- Gross amount
- Surcharges
- Discounts/coupons
- Platform fee
- Commission bps and amount
- VAT components
- Currency
- Policy version

Later profile/plan changes must not rewrite historical booking economics.

---

## 19. Future AI Price Estimation

AI may improve suggested ranges using:

- Home Passport features (AC count, property size)
- Seasonal demand
- Technician scarcity in geohash
- Job description text signals

**Controls**

1. AI suggestion never bypasses hard min/max.
2. Shadow predictions before user-visible rollout.
3. Per-city models; no single GCC blob model blindly applied.
4. Confidence intervals required.
5. Human override catalogs remain source of business floors/caps.

---

## 20. Fraud & Abuse Signals

| Signal | Response |
|--------|----------|
| Extreme underpricing | Flag / block if below anti-dumping floor |
| Extreme overpricing | Soft flag |
| Coupon farming | Velocity limits + device/account graph (later) |
| Commission evasion via off-platform | Trust & safety, not pricing calc |

---

## 21. Observability KPIs

- Suggested vs accepted price delta
- % offers rejected for bounds
- Average commission by plan
- Coupon redemption rate
- Emergency/night/holiday surcharge attach rate
- VAT computation error rate (must be ~0)

---

## 22. Non-Goals

- Charging cards (Payments domain)
- Setting subscription plan prices for seats (Subscription catalog may share calculator helpers)
- Ranking technicians

---

## 23. Related Documents

- `OFFERS_ENGINE.md`
- `SUBSCRIPTION_ENGINE.md`
- `LOYALTY_ENGINE.md` (points redemption may convert to discounts)
- `../BUSINESS_RULES.md`
- `../API.md`
- `../FIRESTORE_STRUCTURE.md`

---

## 24. Canonical Policy — KSA v1 Commercial Calculation

KSA v1 locks Platform Fee Model A: the customer pays the accepted service price and applicable VAT; there is no separate customer platform fee. The platform deducts provider commission from provider proceeds. Models B and C remain post-v1 design options and must not be selected by configuration in KSA v1.

The provider quote is the tax-exclusive base service amount. Emergency, night, and holiday surcharges are applied in that order and are itemized. Provider-funded discounts then reduce the service subtotal; platform-funded coupons reduce the customer amount without reducing provider consideration. Loyalty redemption is a platform-funded discount unless a campaign snapshot explicitly names another funder. The statutory VAT calculation follows the KSA tax policy pack, and customer presentation is VAT-inclusive with the tax-exclusive amount and VAT shown separately. Percentage calculations use integer halalas and half-up rounding per line; the final total is the sum of rounded lines.

For compatibility, the ambiguous `grossAmountHalalas` name maps to canonical `customerTotalIncVatHalalas`. Booking snapshots must also preserve base service amount, every surcharge and discount by funder, service subtotal before VAT, commission base, commission amount, VAT bases and amounts by liable supply, customer total, provider payable preview, currency, market, and all relevant policy versions.

Commission base for KSA v1 is provider consideration after provider-funded discounts and before VAT. Platform-funded discounts do not reduce that base. Subscription Engine exclusively owns the versioned commission schedule and effective dates. Pricing Engine reads the frozen entitlement schedule, performs the calculation, and never authors or overrides commission rates. The phrase “Pricing policy pack commission” means only calculation and validation rules, not rate ownership.

`ComputePayout` is a compatibility name for computing a provider-payable preview. Pricing does not create earnings, ledger entries, settlements, or payouts. The Finance/Payments authority records the actual commission revenue, provider liability, refund, tax, and settlement entries from the frozen booking snapshot.

At acceptance, the full amount snapshot is frozen before authorization. Refunds and chargebacks reverse the original lines proportionally or by explicit line allocation; they never recompute using current plan or tax policy.
