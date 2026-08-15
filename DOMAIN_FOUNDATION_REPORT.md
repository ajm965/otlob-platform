# DOMAIN_FOUNDATION_REPORT

**Sprint:** 2.3 — Domain Foundation  
**Date:** 2026-08-15  
**Governing baseline:** Architecture Review V2  
**Language:** TypeScript (pure domain)

---

## 1. Quality Gate

| Check | Result |
|-------|--------|
| No Business Logic | PASS |
| No Firebase | PASS |
| No Flutter | PASS |
| No HTTP | PASS |
| No duplicated Value Objects | PASS |
| No dependency cycles | PASS |
| Repository remains buildable (`npm run build`) | PASS |

**Overall:** PASS

## 2. Domains Created

| Domain | Module path | Primary type(s) |
|--------|-------------|-----------------|
| User | `backend/modules/users/domain` | User |
| Technician | `backend/modules/technicians/domain` | Technician |
| Company | `backend/modules/companies/domain` | Company |
| Category | `backend/modules/categories/domain` | Category |
| Service | `backend/modules/services/domain` | Service |
| Request | `backend/modules/requests/domain` | Request |
| Offer | `backend/modules/offers/domain` | Offer |
| Booking | `backend/modules/bookings/domain` | Booking |
| Payment | `backend/modules/payments/domain` | Payment |
| Wallet | `backend/modules/wallet/domain` | Wallet |
| Subscription | `backend/modules/subscriptions/domain` | Subscription |
| Review | `backend/modules/reviews/domain` | Review |
| Warranty | `backend/modules/warranty/domain` | Warranty |
| Dispute | `backend/modules/disputes/domain` | Dispute |
| Notification | `backend/modules/notifications/domain` | Notification |
| HomePassport | `backend/modules/home_passport/domain` | HomePassport |
| Address | `backend/modules/location/domain` | Address |
| Attachment | `backend/modules/files/domain` | Attachment |
| Chat+Message | `backend/modules/chat/domain` | Chat+Message |

**Modules with domain models:** 19 (Chat includes Message)

---

## 3. Entities

```text
backend/modules/bookings/domain/entities/booking.ts
backend/modules/bookings/domain/entities/booking_id.ts
backend/modules/categories/domain/entities/category.ts
backend/modules/categories/domain/entities/category_id.ts
backend/modules/chat/domain/entities/chat.ts
backend/modules/chat/domain/entities/chat_id.ts
backend/modules/chat/domain/entities/message.ts
backend/modules/chat/domain/entities/message_id.ts
backend/modules/companies/domain/entities/company.ts
backend/modules/companies/domain/entities/company_id.ts
backend/modules/disputes/domain/entities/dispute.ts
backend/modules/disputes/domain/entities/dispute_id.ts
backend/modules/files/domain/entities/attachment.ts
backend/modules/files/domain/entities/attachment_id.ts
backend/modules/home_passport/domain/entities/home_passport.ts
backend/modules/home_passport/domain/entities/home_passport_id.ts
backend/modules/location/domain/entities/address_id.ts
backend/modules/location/domain/entities/saved_address.ts
backend/modules/notifications/domain/entities/notification.ts
backend/modules/notifications/domain/entities/notification_id.ts
backend/modules/offers/domain/entities/offer.ts
backend/modules/offers/domain/entities/offer_id.ts
backend/modules/payments/domain/entities/payment.ts
backend/modules/payments/domain/entities/payment_id.ts
backend/modules/requests/domain/entities/request_id.ts
backend/modules/requests/domain/entities/service_request.ts
backend/modules/reviews/domain/entities/review.ts
backend/modules/reviews/domain/entities/review_id.ts
backend/modules/services/domain/entities/service.ts
backend/modules/services/domain/entities/service_id.ts
backend/modules/subscriptions/domain/entities/subscription.ts
backend/modules/subscriptions/domain/entities/subscription_id.ts
backend/modules/technicians/domain/entities/technician.ts
backend/modules/technicians/domain/entities/technician_id.ts
backend/modules/users/domain/entities/user.ts
backend/modules/users/domain/entities/user_id.ts
backend/modules/wallet/domain/entities/wallet.ts
backend/modules/wallet/domain/entities/wallet_id.ts
backend/modules/warranty/domain/entities/warranty.ts
backend/modules/warranty/domain/entities/warranty_id.ts
```

---

## 4. Value Objects

### Reused from `@otlob/core`

- `address.d.ts`
- `address.ts`
- `coordinates.d.ts`
- `coordinates.ts`
- `date_range.d.ts`
- `date_range.ts`
- `email.d.ts`
- `email.ts`
- `geo_point.d.ts`
- `geo_point.ts`
- `index.d.ts`
- `localized_label.d.ts`
- `localized_label.ts`
- `money.d.ts`
- `money.ts`
- `percentage.d.ts`
- `percentage.ts`
- `phone.d.ts`
- `phone.ts`

### Domain-specific (non-duplicating)

```text
backend/modules/files/domain/value_objects/content_type.ts
backend/modules/reviews/domain/value_objects/rating_score.ts
backend/modules/technicians/domain/value_objects/service_radius_km.ts
```

---

## 5. Enums

```text
backend/modules/bookings/domain/enums/booking_status.ts
backend/modules/categories/domain/enums/category_status.ts
backend/modules/chat/domain/enums/chat_status.ts
backend/modules/chat/domain/enums/message_type.ts
backend/modules/companies/domain/enums/company_member_role.ts
backend/modules/companies/domain/enums/company_status.ts
backend/modules/disputes/domain/enums/dispute_status.ts
backend/modules/files/domain/enums/attachment_purpose.ts
backend/modules/files/domain/enums/attachment_status.ts
backend/modules/home_passport/domain/enums/home_passport_status.ts
backend/modules/location/domain/enums/address_status.ts
backend/modules/notifications/domain/enums/notification_channel.ts
backend/modules/notifications/domain/enums/notification_status.ts
backend/modules/offers/domain/enums/offer_status.ts
backend/modules/offers/domain/enums/provider_type.ts
backend/modules/payments/domain/enums/payment_status.ts
backend/modules/requests/domain/enums/request_status.ts
backend/modules/reviews/domain/enums/review_status.ts
backend/modules/services/domain/enums/service_status.ts
backend/modules/subscriptions/domain/enums/subscription_owner_type.ts
backend/modules/subscriptions/domain/enums/subscription_status.ts
backend/modules/technicians/domain/enums/technician_status.ts
backend/modules/technicians/domain/enums/verification_status.ts
backend/modules/users/domain/enums/global_role.ts
backend/modules/users/domain/enums/user_status.ts
backend/modules/wallet/domain/enums/wallet_owner_type.ts
backend/modules/warranty/domain/enums/warranty_claim_status.ts
backend/modules/warranty/domain/enums/warranty_status.ts
```

---

## 6. Domain Events (placeholders)

```text
backend/modules/bookings/domain/events/booking_completed.ts
backend/modules/bookings/domain/events/booking_confirmed.ts
backend/modules/categories/domain/events/category_created.ts
backend/modules/chat/domain/events/chat_opened.ts
backend/modules/chat/domain/events/message_sent.ts
backend/modules/companies/domain/events/company_registered.ts
backend/modules/companies/domain/events/company_verified.ts
backend/modules/disputes/domain/events/dispute_opened.ts
backend/modules/disputes/domain/events/dispute_resolved.ts
backend/modules/files/domain/events/attachment_uploaded.ts
backend/modules/home_passport/domain/events/home_passport_created.ts
backend/modules/location/domain/events/address_created.ts
backend/modules/notifications/domain/events/notification_queued.ts
backend/modules/offers/domain/events/offer_accepted.ts
backend/modules/offers/domain/events/offer_submitted.ts
backend/modules/payments/domain/events/payment_authorized.ts
backend/modules/payments/domain/events/payment_completed.ts
backend/modules/requests/domain/events/request_cancelled.ts
backend/modules/requests/domain/events/request_created.ts
backend/modules/reviews/domain/events/review_submitted.ts
backend/modules/services/domain/events/service_created.ts
backend/modules/subscriptions/domain/events/subscription_activated.ts
backend/modules/subscriptions/domain/events/subscription_past_due.ts
backend/modules/technicians/domain/events/technician_profile_updated.ts
backend/modules/technicians/domain/events/technician_verified.ts
backend/modules/users/domain/events/user_registered.ts
backend/modules/users/domain/events/user_suspended.ts
backend/modules/wallet/domain/events/wallet_balance_projected.ts
backend/modules/warranty/domain/events/warranty_claim_submitted.ts
backend/modules/warranty/domain/events/warranty_issued.ts
```

Includes: `RequestCreated`, `OfferSubmitted`, `BookingConfirmed`, `PaymentCompleted`, `WarrantyIssued`, `ReviewSubmitted`.

---

## 7. Reused Core Components

| Component | Usage |
|-----------|--------|
| `UniqueId`, `AggregateRoot`, `DomainEvent`, `BaseValueObject` | All entities & events |
| `Money` | Offer, Booking, Payment, Wallet |
| `Email`, `Phone` | User |
| `Address` (VO) | `SavedAddress.postal` |
| `GeoPoint`, `Coordinates` | Technician, ServiceRequest, SavedAddress |
| `DateRange` | ServiceRequest, Booking |
| `LocalizedLabel` | Category, Service |

---

## 8. Future Dependencies

| Next layer | May depend on |
|------------|----------------|
| Application use cases | Domain entities + ports |
| Infrastructure repositories | Domain + `@otlob/core` (later) |
| HTTP presentation | Application (not Sprint 2.3) |
| Firebase adapters | Explicit authorization required |

---

## 9. Risks

| Risk | Mitigation |
|------|------------|
| Anemic models gain workflow methods early | Keep transitions in use cases until intentional enrichment |
| `SavedAddress` vs core `Address` naming | Entity reuses VO as `postal` |
| Enum drift vs lifecycle matrix | Aligned to `LIFECYCLE_RECONCILIATION.md` |
| Wallet mistaken for ledger authority | Documented as projection-only |

---

## 10. Recommendations

1. Approve and commit Sprint 2.3 before Sprint 2.4.
2. Next: repository **ports/interfaces only** — still no Firebase.
3. Keep `@otlob/core` as the only shared VO source.
4. Add core VO unit tests in a later sprint.

---

## 11. Build

```bash
npm run build
```

Exit code: **0**

---

## 12. Stop Condition

Sprint 2.3 complete. **Do not continue to Sprint 2.4 without approval.**
