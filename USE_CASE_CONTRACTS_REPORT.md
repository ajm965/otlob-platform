# USE_CASE_CONTRACTS_REPORT

**Sprint:** 2.6 — Use Case Contracts  
**Status:** PASS  
**Governing baseline:** Architecture Review V2

## Quality Gate

| Check | Result |
|---|---|
| No business logic | PASS |
| No implementation | PASS |
| No Firebase | PASS |
| No HTTP | PASS |
| No Controllers | PASS |
| No Services | PASS |
| No dependency cycles | PASS |
| Build passes | PASS |

`npm run build` exit code: **0**

## Modules Covered

- `users`
- `technicians`
- `companies`
- `categories`
- `services`
- `requests`
- `offers`
- `bookings`
- `payments`
- `wallet`
- `subscriptions`
- `reviews`
- `warranty`
- `disputes`
- `notifications`
- `home_passport`
- `chat`
- `files`
- `location`
- `analytics`

**Total:** 20 modules.

## Contracts Created

- Standard create/update/delete command contracts per module
- Standard get/list/search query contracts per module
- Typed input/output DTO references on each `execute()` contract through `IUseCase<TInput, TOutput>`
- Module-local use-case barrel files plus Core `IUseCase<TInput, TOutput>` abstraction

**Use-case interface declarations:** 120

## Command Contracts

```text
backend/modules/analytics/application/use_cases/commands/i_create_analytics_event_use_case.ts
backend/modules/analytics/application/use_cases/commands/i_delete_analytics_event_use_case.ts
backend/modules/analytics/application/use_cases/commands/i_update_analytics_event_use_case.ts
backend/modules/analytics/application/use_cases/commands/index.ts
backend/modules/bookings/application/use_cases/commands/i_create_booking_use_case.ts
backend/modules/bookings/application/use_cases/commands/i_delete_booking_use_case.ts
backend/modules/bookings/application/use_cases/commands/i_update_booking_use_case.ts
backend/modules/bookings/application/use_cases/commands/index.ts
backend/modules/categories/application/use_cases/commands/i_create_category_use_case.ts
backend/modules/categories/application/use_cases/commands/i_delete_category_use_case.ts
backend/modules/categories/application/use_cases/commands/i_update_category_use_case.ts
backend/modules/categories/application/use_cases/commands/index.ts
backend/modules/chat/application/use_cases/commands/i_create_chat_use_case.ts
backend/modules/chat/application/use_cases/commands/i_delete_chat_use_case.ts
backend/modules/chat/application/use_cases/commands/i_update_chat_use_case.ts
backend/modules/chat/application/use_cases/commands/index.ts
backend/modules/companies/application/use_cases/commands/i_create_company_use_case.ts
backend/modules/companies/application/use_cases/commands/i_delete_company_use_case.ts
backend/modules/companies/application/use_cases/commands/i_update_company_use_case.ts
backend/modules/companies/application/use_cases/commands/index.ts
backend/modules/disputes/application/use_cases/commands/i_create_dispute_use_case.ts
backend/modules/disputes/application/use_cases/commands/i_delete_dispute_use_case.ts
backend/modules/disputes/application/use_cases/commands/i_update_dispute_use_case.ts
backend/modules/disputes/application/use_cases/commands/index.ts
backend/modules/files/application/use_cases/commands/i_create_attachment_use_case.ts
backend/modules/files/application/use_cases/commands/i_delete_attachment_use_case.ts
backend/modules/files/application/use_cases/commands/i_update_attachment_use_case.ts
backend/modules/files/application/use_cases/commands/index.ts
backend/modules/home_passport/application/use_cases/commands/i_create_home_passport_use_case.ts
backend/modules/home_passport/application/use_cases/commands/i_delete_home_passport_use_case.ts
backend/modules/home_passport/application/use_cases/commands/i_update_home_passport_use_case.ts
backend/modules/home_passport/application/use_cases/commands/index.ts
backend/modules/location/application/use_cases/commands/i_create_location_use_case.ts
backend/modules/location/application/use_cases/commands/i_delete_location_use_case.ts
backend/modules/location/application/use_cases/commands/i_update_location_use_case.ts
backend/modules/location/application/use_cases/commands/index.ts
backend/modules/notifications/application/use_cases/commands/i_create_notification_use_case.ts
backend/modules/notifications/application/use_cases/commands/i_delete_notification_use_case.ts
backend/modules/notifications/application/use_cases/commands/i_update_notification_use_case.ts
backend/modules/notifications/application/use_cases/commands/index.ts
backend/modules/offers/application/use_cases/commands/i_create_offer_use_case.ts
backend/modules/offers/application/use_cases/commands/i_delete_offer_use_case.ts
backend/modules/offers/application/use_cases/commands/i_update_offer_use_case.ts
backend/modules/offers/application/use_cases/commands/index.ts
backend/modules/payments/application/use_cases/commands/i_create_payment_use_case.ts
backend/modules/payments/application/use_cases/commands/i_delete_payment_use_case.ts
backend/modules/payments/application/use_cases/commands/i_update_payment_use_case.ts
backend/modules/payments/application/use_cases/commands/index.ts
backend/modules/requests/application/use_cases/commands/i_create_request_use_case.ts
backend/modules/requests/application/use_cases/commands/i_delete_request_use_case.ts
backend/modules/requests/application/use_cases/commands/i_update_request_use_case.ts
backend/modules/requests/application/use_cases/commands/index.ts
backend/modules/reviews/application/use_cases/commands/i_create_review_use_case.ts
backend/modules/reviews/application/use_cases/commands/i_delete_review_use_case.ts
backend/modules/reviews/application/use_cases/commands/i_update_review_use_case.ts
backend/modules/reviews/application/use_cases/commands/index.ts
backend/modules/services/application/use_cases/commands/i_create_service_use_case.ts
backend/modules/services/application/use_cases/commands/i_delete_service_use_case.ts
backend/modules/services/application/use_cases/commands/i_update_service_use_case.ts
backend/modules/services/application/use_cases/commands/index.ts
backend/modules/subscriptions/application/use_cases/commands/i_create_subscription_use_case.ts
backend/modules/subscriptions/application/use_cases/commands/i_delete_subscription_use_case.ts
backend/modules/subscriptions/application/use_cases/commands/i_update_subscription_use_case.ts
backend/modules/subscriptions/application/use_cases/commands/index.ts
backend/modules/technicians/application/use_cases/commands/i_create_technician_use_case.ts
backend/modules/technicians/application/use_cases/commands/i_delete_technician_use_case.ts
backend/modules/technicians/application/use_cases/commands/i_update_technician_use_case.ts
backend/modules/technicians/application/use_cases/commands/index.ts
backend/modules/users/application/use_cases/commands/i_create_user_use_case.ts
backend/modules/users/application/use_cases/commands/i_delete_user_use_case.ts
backend/modules/users/application/use_cases/commands/i_update_user_use_case.ts
backend/modules/users/application/use_cases/commands/index.ts
backend/modules/wallet/application/use_cases/commands/i_create_wallet_use_case.ts
backend/modules/wallet/application/use_cases/commands/i_delete_wallet_use_case.ts
backend/modules/wallet/application/use_cases/commands/i_update_wallet_use_case.ts
backend/modules/wallet/application/use_cases/commands/index.ts
backend/modules/warranty/application/use_cases/commands/i_create_warranty_use_case.ts
backend/modules/warranty/application/use_cases/commands/i_delete_warranty_use_case.ts
backend/modules/warranty/application/use_cases/commands/i_update_warranty_use_case.ts
backend/modules/warranty/application/use_cases/commands/index.ts
```

## Query Contracts

```text
backend/modules/analytics/application/use_cases/queries/i_get_analytics_event_use_case.ts
backend/modules/analytics/application/use_cases/queries/i_list_analytics_events_use_case.ts
backend/modules/analytics/application/use_cases/queries/i_search_analytics_events_use_case.ts
backend/modules/analytics/application/use_cases/queries/index.ts
backend/modules/bookings/application/use_cases/queries/i_get_booking_use_case.ts
backend/modules/bookings/application/use_cases/queries/i_list_bookings_use_case.ts
backend/modules/bookings/application/use_cases/queries/i_search_bookings_use_case.ts
backend/modules/bookings/application/use_cases/queries/index.ts
backend/modules/categories/application/use_cases/queries/i_get_category_use_case.ts
backend/modules/categories/application/use_cases/queries/i_list_categorys_use_case.ts
backend/modules/categories/application/use_cases/queries/i_search_categorys_use_case.ts
backend/modules/categories/application/use_cases/queries/index.ts
backend/modules/chat/application/use_cases/queries/i_get_chat_use_case.ts
backend/modules/chat/application/use_cases/queries/i_list_chats_use_case.ts
backend/modules/chat/application/use_cases/queries/i_search_chats_use_case.ts
backend/modules/chat/application/use_cases/queries/index.ts
backend/modules/companies/application/use_cases/queries/i_get_company_use_case.ts
backend/modules/companies/application/use_cases/queries/i_list_companys_use_case.ts
backend/modules/companies/application/use_cases/queries/i_search_companys_use_case.ts
backend/modules/companies/application/use_cases/queries/index.ts
backend/modules/disputes/application/use_cases/queries/i_get_dispute_use_case.ts
backend/modules/disputes/application/use_cases/queries/i_list_disputes_use_case.ts
backend/modules/disputes/application/use_cases/queries/i_search_disputes_use_case.ts
backend/modules/disputes/application/use_cases/queries/index.ts
backend/modules/files/application/use_cases/queries/i_get_attachment_use_case.ts
backend/modules/files/application/use_cases/queries/i_list_attachments_use_case.ts
backend/modules/files/application/use_cases/queries/i_search_attachments_use_case.ts
backend/modules/files/application/use_cases/queries/index.ts
backend/modules/home_passport/application/use_cases/queries/i_get_home_passport_use_case.ts
backend/modules/home_passport/application/use_cases/queries/i_list_home_passports_use_case.ts
backend/modules/home_passport/application/use_cases/queries/i_search_home_passports_use_case.ts
backend/modules/home_passport/application/use_cases/queries/index.ts
backend/modules/location/application/use_cases/queries/i_get_location_use_case.ts
backend/modules/location/application/use_cases/queries/i_list_locations_use_case.ts
backend/modules/location/application/use_cases/queries/i_search_locations_use_case.ts
backend/modules/location/application/use_cases/queries/index.ts
backend/modules/notifications/application/use_cases/queries/i_get_notification_use_case.ts
backend/modules/notifications/application/use_cases/queries/i_list_notifications_use_case.ts
backend/modules/notifications/application/use_cases/queries/i_search_notifications_use_case.ts
backend/modules/notifications/application/use_cases/queries/index.ts
backend/modules/offers/application/use_cases/queries/i_get_offer_use_case.ts
backend/modules/offers/application/use_cases/queries/i_list_offers_use_case.ts
backend/modules/offers/application/use_cases/queries/i_search_offers_use_case.ts
backend/modules/offers/application/use_cases/queries/index.ts
backend/modules/payments/application/use_cases/queries/i_get_payment_use_case.ts
backend/modules/payments/application/use_cases/queries/i_list_payments_use_case.ts
backend/modules/payments/application/use_cases/queries/i_search_payments_use_case.ts
backend/modules/payments/application/use_cases/queries/index.ts
backend/modules/requests/application/use_cases/queries/i_get_request_use_case.ts
backend/modules/requests/application/use_cases/queries/i_list_requests_use_case.ts
backend/modules/requests/application/use_cases/queries/i_search_requests_use_case.ts
backend/modules/requests/application/use_cases/queries/index.ts
backend/modules/reviews/application/use_cases/queries/i_get_review_use_case.ts
backend/modules/reviews/application/use_cases/queries/i_list_reviews_use_case.ts
backend/modules/reviews/application/use_cases/queries/i_search_reviews_use_case.ts
backend/modules/reviews/application/use_cases/queries/index.ts
backend/modules/services/application/use_cases/queries/i_get_service_use_case.ts
backend/modules/services/application/use_cases/queries/i_list_services_use_case.ts
backend/modules/services/application/use_cases/queries/i_search_services_use_case.ts
backend/modules/services/application/use_cases/queries/index.ts
backend/modules/subscriptions/application/use_cases/queries/i_get_subscription_use_case.ts
backend/modules/subscriptions/application/use_cases/queries/i_list_subscriptions_use_case.ts
backend/modules/subscriptions/application/use_cases/queries/i_search_subscriptions_use_case.ts
backend/modules/subscriptions/application/use_cases/queries/index.ts
backend/modules/technicians/application/use_cases/queries/i_get_technician_use_case.ts
backend/modules/technicians/application/use_cases/queries/i_list_technicians_use_case.ts
backend/modules/technicians/application/use_cases/queries/i_search_technicians_use_case.ts
backend/modules/technicians/application/use_cases/queries/index.ts
backend/modules/users/application/use_cases/queries/i_get_user_use_case.ts
backend/modules/users/application/use_cases/queries/i_list_users_use_case.ts
backend/modules/users/application/use_cases/queries/i_search_users_use_case.ts
backend/modules/users/application/use_cases/queries/index.ts
backend/modules/wallet/application/use_cases/queries/i_get_wallet_use_case.ts
backend/modules/wallet/application/use_cases/queries/i_list_wallets_use_case.ts
backend/modules/wallet/application/use_cases/queries/i_search_wallets_use_case.ts
backend/modules/wallet/application/use_cases/queries/index.ts
backend/modules/warranty/application/use_cases/queries/i_get_warranty_use_case.ts
backend/modules/warranty/application/use_cases/queries/i_list_warrantys_use_case.ts
backend/modules/warranty/application/use_cases/queries/i_search_warrantys_use_case.ts
backend/modules/warranty/application/use_cases/queries/index.ts
```

## Shared Abstractions

| Abstraction | Location | Responsibility |
|---|---|---|
| `IUseCase<TInput, TOutput>` | `packages/core/src/contracts/use_case_contracts.ts` | Declares `execute(input)` return type only |
| Module `interfaces/index.ts` | `backend/modules/*/application/use_cases/interfaces/` | Re-exports the Core use-case contract |
| DTO contracts | `backend/modules/*/application/dto/` | Input/output contract shapes |
| Repository contracts | `backend/modules/*/domain/repositories/` | Permitted future dependency; not invoked by contracts |

## Future Implementation Dependencies

When explicitly authorized, use-case implementations may depend only on:

1. Domain entities and domain contracts
2. DTO contracts
3. Repository contracts
4. Core contracts

They must not depend directly on infrastructure, cloud SDKs, HTTP, controllers, or UI.

## Risks

| Risk | Mitigation |
|---|---|
| Generic CRUD naming may not fit all domain workflows | Add named contracts alongside the standard pattern after architecture review |
| Use-case input shapes need evolution | Version DTO contracts deliberately; avoid leaking domain entities into DTOs |
| Implementations may bypass repository ports | Enforce dependency constraints in CI and review |
| Standard contracts can be mistaken for approved business workflows | Interfaces declare shape only; engine rules remain authoritative |

## Recommendations

1. Approve and commit Sprint 2.6 before any implementation-layer work.
2. Add no use-case classes until an explicitly approved application implementation sprint.
3. Keep constructor dependencies and orchestration behavior out of these contracts.
4. Preserve the contract-only gate in CI.

## Stop Condition

Sprint 2.6 is complete. Do **not** continue to Infrastructure without approval.
