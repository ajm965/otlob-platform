# Home Passport Engine

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Business Engine Specification  
**Engine ID:** `home_passport`  
**Phase:** 1.5 — Business Engines  
**Status:** Design baseline  
**Scale Target:** Millions of users across KSA and future GCC markets  

---

## 1. Purpose

The Home Passport Engine provides a **digital home profile**—a structured, longitudinal record of a customer’s property, rooms, devices, systems, maintenance, warranties, invoices, and preferred technicians—to improve matching context, job quality, upsell of preventive care, and future AI recommendations.

It extends `homeProfiles`, `homeAssets`, and `maintenanceHistory` into a full product capability.

---

## 2. Design Goals

| Goal | Requirement |
|------|-------------|
| Customer value | One place to understand home health |
| Marketplace value | Better diagnostics and pricing hints |
| Privacy | Home data is private to owner (+ support) |
| Continuity | Auto-capture from completed bookings |
| Extensibility | New asset types without schema breaks |

---

## 3. Passport Hierarchy

```text
Customer
 └─ House / Property (Home Profile)
     ├─ Rooms
     ├─ Devices / Assets
     │   ├─ Air Conditioners
     │   ├─ Water Heaters
     │   ├─ Electrical Systems
     │   ├─ Plumbing assets
     │   └─ Other appliances
     ├─ Maintenance History
     ├─ Warranty History
     ├─ Invoices
     ├─ Technicians (service graph)
     ├─ Replacement Parts
     └─ Upcoming Maintenance
```

A customer may own multiple properties (villa + apartment).

---

## 4. House (Property) Profile

### 4.1 Core Fields

| Field | Description |
|-------|-------------|
| Name | Customer label |
| Property type | villa, apartment, office, shop, farmhouse, other |
| Address link | `addressId` + location snapshot |
| Size sqm | Optional |
| Floors | Optional |
| Year built / renovated | Optional |
| Occupancy | family, rental, vacant |
| Notes | Free text |
| Cover photo | Optional |

### 4.2 Rules

- Owned by `customerId`
- Soft delete supported
- Bound count per customer (e.g., 10)

---

## 5. Rooms

### 5.1 Purpose

Spatial organization for assets and jobs (“AC in master bedroom”).

### 5.2 Fields

| Field | Description |
|-------|-------------|
| `homeProfileId` | Parent |
| Name / type | living, bedroom, kitchen, bathroom, rooftop, utility, other |
| Floor number | Optional |
| Area sqm | Optional |
| Notes | Optional |

### 5.3 Rules

- Optional layer—assets can exist without rooms
- Deleting room unassigns assets (does not delete assets by default)

---

## 6. Devices & Systems (Assets)

### 6.1 Common Asset Fields

| Field | Description |
|-------|-------------|
| Asset type | Enum/code |
| Brand / model / serial | Optional |
| Room link | Optional |
| Installed at | Date |
| Condition | unknown/good/fair/poor |
| Photos | Storage refs |
| Service hints | Related `serviceIds` |
| Notes | |

### 6.2 Air Conditioners

| Extra fields | Examples |
|--------------|----------|
| AC type | split, window, central, cassette |
| Cooling capacity | tons / BTU |
| Refrigerant type | if known |
| Last gas refill | Date |
| Filter cleaned at | Date |
| Indoor/outdoor unit identifiers | Optional |

### 6.3 Water Heaters

| Extra fields | Examples |
|--------------|----------|
| Fuel/power | electric, gas, solar |
| Capacity liters | |
| Pressure/safety valve service dates | |

### 6.4 Electrical Systems

| Extra fields | Examples |
|--------------|----------|
| Panel type / amperage | |
| Circuit zones | |
| Generator / inverter / solar linkage | |
| Last electrical inspection | |

Treat “system” assets as first-class even if not a single device.

### 6.5 Plumbing

| Extra fields | Examples |
|--------------|----------|
| Main line material | |
| Water tank type/capacity | |
| Pump present | |
| Septic/soakaway notes | |
| Leak history flags | |

### 6.6 Other Devices

Extensible catalog: washers, dryers, ovens, dishwashers, CCTV, smart locks, etc., via `assetType` + flexible attributes map with schemaVersion.

---

## 7. Maintenance History

### 7.1 Sources

| Source | Description |
|--------|-------------|
| `booking` | Auto-appended on job completion |
| `manual` | Customer-entered |
| `warranty_rework` | From warranty claims |
| `company_import` | Future bulk import |

### 7.2 Fields

| Field | Description |
|-------|-------------|
| Title / description | |
| Performed at | |
| Service / category | |
| Asset / room links | |
| Provider snapshot | Name, id |
| Cost | Halalas optional |
| Media | Before/after refs |
| Booking / invoice links | |

### 7.3 Rules

- Append-only preferred; edits audited
- Completions should propose asset linkage if missing (customer confirm)

---

## 8. Warranty History

- Links platform guarantees to property/assets when available
- Shows active vs expired coverage per asset/home
- Claim shortcuts into Warranty Engine

Does not replace Warranty Engine as authority for claim eligibility.

---

## 9. Invoices

### 9.1 Purpose

Customer-facing financial history for home work.

### 9.2 Contents

| Item | Source |
|------|--------|
| Platform booking invoices/receipts | Payments domain |
| Manual invoice uploads | Customer PDF/image |
| Company-issued invoices | If provider shares through platform |

### 9.3 Rules

- Store files in Storage; metadata in Passport
- VAT invoice compliance fields as finance enables them
- Not publicly visible

---

## 10. Technicians (Service Graph)

Passport keeps a **trusted provider list** derived from:

- Completed bookings
- Customer favorites/pins
- Blocked providers

Fields: provider id/type, last serviced at, services performed, average rating by customer, notes.

Used for:

- Faster rehire
- Matching affinity (Repeat Customer factor)
- Excluding blocked providers from suggestions

---

## 11. Replacement Parts

### 11.1 Purpose

Track parts replaced during jobs for future diagnostics and warranty scope.

### 11.2 Fields

| Field | Description |
|-------|-------------|
| Asset link | Required when known |
| Part name/SKU | |
| Quantity | |
| Replaced at | |
| Booking link | |
| Warranty on part | Optional days |
| Cost | Optional |

Providers may submit part records at completion; customer can edit notes later.

---

## 12. Upcoming Maintenance

### 12.1 Purpose

Preventive schedule suggestions and reminders.

### 12.2 Rule Examples

| Asset | Cadence intent |
|-------|----------------|
| AC filter cleaning | Every 1–3 months |
| AC gas check | Seasonal |
| Water heater flush | Annual |
| Electrical inspection | Annual / biennial |

### 12.3 Features

- Next due date
- Status: upcoming / due / overdue / dismissed
- One-tap create request prefilled with service + asset context
- Notification reminders via Notification Engine

---

## 13. Privacy & Sharing

| Principal | Access |
|-----------|--------|
| Owner customer | Full |
| Platform admin support | Controlled, audited |
| Technician | Only what customer shares for an active booking (snapshot), not full passport by default |
| Company | Same as technician constraints |

Future explicit “share passport summary with provider” consent flag may expand visibility for a booking window.

---

## 14. Marketplace Integrations

| Engine | Integration |
|--------|-------------|
| Pricing | Property size / AC count improve suggested price confidence |
| Matching | Optional context only; does not bypass geo hard filters |
| Offers | Customer may attach asset context to request |
| Warranty | Asset-linked claims |
| Loyalty | Points for keeping passport updated (optional) |

---

## 15. Future AI Recommendations

AI may propose:

- Overdue maintenance prioritization
- Likely failing assets from history patterns
- Optimal service timing before summer peak (AC)
- Bundled multi-asset service visits
- Parts likely needed for a described symptom

Controls:

1. Recommendations advisory only  
2. No autonomous bookings without customer action  
3. Train per climate region (KSA/GCC)  
4. Privacy-preserving aggregates  

---

## 16. Scale Notes

- Partition by `customerId`
- Avoid huge monolithic house documents—use subcollections for history/parts
- Media via Storage references
- Index upcoming maintenance by due date for reminder workers
- GCC multi-country address formats in linked Address entity

---

## 17. Observability KPIs

- % customers with ≥1 passport
- Assets per home
- Auto-history attach rate from bookings
- Reminder → request conversion
- Claim linkage rate to assets

---

## 18. Non-Goals

- Smart home IoT device control
- Real estate listing marketplace
- Public social feed of homes

---

## 19. Related Documents

- `WARRANTY_ENGINE.md`
- `PRICING_ENGINE.md`
- `NOTIFICATION_ENGINE.md`
- `LOYALTY_ENGINE.md`
- `../FIRESTORE_STRUCTURE.md`
- `../API.md`
- `../SECURITY.md`

---

## 20. Canonical Policy — Passport v0/v1 Staging and Consent

Home Passport v0 is the only MVP-compatible stage. It is history-only: a customer may link a home profile and optional asset reference to a request, and completed bookings, issued warranties, claims, and payment receipt references create append-only history projections. Rooms, replacement-part catalogs, preventive schedules, preferred-provider graphs, manual invoices, rich asset attributes, and AI recommendations are v1 features and must not be required by core request, pricing, matching, booking, or warranty flows.

Passport v1 may add those structured aggregates only after their ownership, retention, deletion, and access contracts exist. Pricing and Matching treat Passport inputs as optional, confidence-scored context; missing Passport data never reduces eligibility or creates a hard price decision. V0 data migrates additively and remains readable as history.

The owner’s consent is purpose-specific and revocable. Attaching Passport context to a request creates a booking-scoped consent grant naming the shared fields, recipient provider identity, purpose, issue time, and expiry. The default pre-offer view shares no Passport data. After acceptance, the provider receives only the selected snapshot needed for that booking, not the live Passport or unrelated history. Company access is granted to the company provider identity and only to an assigned active technician.

Consent revocation blocks future reads and new snapshots but does not erase evidence already required for an active booking, warranty claim, dispute, invoice retention, fraud review, or legal hold. Those retained copies are access-restricted and deleted when their governing retention ends. Support access requires a reason, least-privilege view, and audit record. Favorites, maintenance marketing, and AI use require separate consent and are not implied by service fulfillment.
