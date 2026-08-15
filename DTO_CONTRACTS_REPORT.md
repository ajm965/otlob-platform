# DTO_CONTRACTS_REPORT

**Sprint:** 2.5 — DTO Contracts  
**Status:** PASS  
**Governing baseline:** Architecture Review V2

## Quality Gate

| Check | Result |
|---|---|
| No Business Logic | PASS |
| No Firebase | PASS |
| No Serialization | PASS |
| No Mapping | PASS |
| No duplicate DTOs | PASS |
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

## DTOs Created

| Group | Count | Location |
|---|---:|---|
| Request contracts | 47 | `application/dto/requests/` |
| Response contracts | 40 | `application/dto/responses/` |
| Command contracts | 40 | `application/dto/commands/` |
| Query contracts | 40 | `application/dto/queries/` |
| Shared re-export contracts | 20 | `application/dto/shared/` |
| Core shared DTO contract file | 1 | `packages/core/src/contracts/dto_contracts.ts` |

Every covered module has `application/dto/` with `requests/`, `responses/`, `commands/`, `queries/`, `shared/`, and `README.md`.

## Shared DTOs

Centralized in `@otlob/core` and re-exported per module:

- `EntityIdDto`, `MarketScopeDto`, `MoneyDto`, `DateRangeDto`, `CoordinatesDto`
- `CursorPageRequestDto`, `CursorPageResponseDto<T>`
- `CommandDto`, `QueryDto`

## DTO Inventory

### Requests
```text
backend/modules/analytics/application/dto/requests/analytics_event_request.ts
backend/modules/analytics/application/dto/requests/index.ts
backend/modules/bookings/application/dto/requests/booking_request.ts
backend/modules/bookings/application/dto/requests/index.ts
backend/modules/categories/application/dto/requests/category_request.ts
backend/modules/categories/application/dto/requests/index.ts
backend/modules/chat/application/dto/requests/chat_request.ts
backend/modules/chat/application/dto/requests/index.ts
backend/modules/companies/application/dto/requests/company_request.ts
backend/modules/companies/application/dto/requests/index.ts
backend/modules/disputes/application/dto/requests/dispute_request.ts
backend/modules/disputes/application/dto/requests/index.ts
backend/modules/files/application/dto/requests/attachment_request.ts
backend/modules/files/application/dto/requests/index.ts
backend/modules/home_passport/application/dto/requests/home_passport_request.ts
backend/modules/home_passport/application/dto/requests/index.ts
backend/modules/location/application/dto/requests/address_request.ts
backend/modules/location/application/dto/requests/index.ts
backend/modules/notifications/application/dto/requests/index.ts
backend/modules/notifications/application/dto/requests/notification_request.ts
backend/modules/offers/application/dto/requests/index.ts
backend/modules/offers/application/dto/requests/offer_request.ts
backend/modules/payments/application/dto/requests/index.ts
backend/modules/payments/application/dto/requests/payment_request.ts
backend/modules/requests/application/dto/commands/index.ts
backend/modules/requests/application/dto/commands/request_command_dto.ts
backend/modules/requests/application/dto/queries/index.ts
backend/modules/requests/application/dto/queries/request_query_dto.ts
backend/modules/requests/application/dto/requests/index.ts
backend/modules/requests/application/dto/requests/request_request.ts
backend/modules/requests/application/dto/responses/index.ts
backend/modules/requests/application/dto/responses/request_response.ts
backend/modules/requests/application/dto/shared/index.ts
backend/modules/reviews/application/dto/requests/index.ts
backend/modules/reviews/application/dto/requests/review_request.ts
backend/modules/services/application/dto/requests/index.ts
backend/modules/services/application/dto/requests/service_request.ts
backend/modules/subscriptions/application/dto/requests/index.ts
backend/modules/subscriptions/application/dto/requests/subscription_request.ts
backend/modules/technicians/application/dto/requests/index.ts
backend/modules/technicians/application/dto/requests/technician_request.ts
backend/modules/users/application/dto/requests/index.ts
backend/modules/users/application/dto/requests/user_request.ts
backend/modules/wallet/application/dto/requests/index.ts
backend/modules/wallet/application/dto/requests/wallet_request.ts
backend/modules/warranty/application/dto/requests/index.ts
backend/modules/warranty/application/dto/requests/warranty_request.ts
```

### Responses
```text
backend/modules/analytics/application/dto/responses/analytics_event_response.ts
backend/modules/analytics/application/dto/responses/index.ts
backend/modules/bookings/application/dto/responses/booking_response.ts
backend/modules/bookings/application/dto/responses/index.ts
backend/modules/categories/application/dto/responses/category_response.ts
backend/modules/categories/application/dto/responses/index.ts
backend/modules/chat/application/dto/responses/chat_response.ts
backend/modules/chat/application/dto/responses/index.ts
backend/modules/companies/application/dto/responses/company_response.ts
backend/modules/companies/application/dto/responses/index.ts
backend/modules/disputes/application/dto/responses/dispute_response.ts
backend/modules/disputes/application/dto/responses/index.ts
backend/modules/files/application/dto/responses/attachment_response.ts
backend/modules/files/application/dto/responses/index.ts
backend/modules/home_passport/application/dto/responses/home_passport_response.ts
backend/modules/home_passport/application/dto/responses/index.ts
backend/modules/location/application/dto/responses/address_response.ts
backend/modules/location/application/dto/responses/index.ts
backend/modules/notifications/application/dto/responses/index.ts
backend/modules/notifications/application/dto/responses/notification_response.ts
backend/modules/offers/application/dto/responses/index.ts
backend/modules/offers/application/dto/responses/offer_response.ts
backend/modules/payments/application/dto/responses/index.ts
backend/modules/payments/application/dto/responses/payment_response.ts
backend/modules/requests/application/dto/responses/index.ts
backend/modules/requests/application/dto/responses/request_response.ts
backend/modules/reviews/application/dto/responses/index.ts
backend/modules/reviews/application/dto/responses/review_response.ts
backend/modules/services/application/dto/responses/index.ts
backend/modules/services/application/dto/responses/service_response.ts
backend/modules/subscriptions/application/dto/responses/index.ts
backend/modules/subscriptions/application/dto/responses/subscription_response.ts
backend/modules/technicians/application/dto/responses/index.ts
backend/modules/technicians/application/dto/responses/technician_response.ts
backend/modules/users/application/dto/responses/index.ts
backend/modules/users/application/dto/responses/user_response.ts
backend/modules/wallet/application/dto/responses/index.ts
backend/modules/wallet/application/dto/responses/wallet_response.ts
backend/modules/warranty/application/dto/responses/index.ts
backend/modules/warranty/application/dto/responses/warranty_response.ts
```

### Commands
```text
backend/modules/analytics/application/dto/commands/analytics_event_command_dto.ts
backend/modules/analytics/application/dto/commands/index.ts
backend/modules/bookings/application/dto/commands/booking_command_dto.ts
backend/modules/bookings/application/dto/commands/index.ts
backend/modules/categories/application/dto/commands/category_command_dto.ts
backend/modules/categories/application/dto/commands/index.ts
backend/modules/chat/application/dto/commands/chat_command_dto.ts
backend/modules/chat/application/dto/commands/index.ts
backend/modules/companies/application/dto/commands/company_command_dto.ts
backend/modules/companies/application/dto/commands/index.ts
backend/modules/disputes/application/dto/commands/dispute_command_dto.ts
backend/modules/disputes/application/dto/commands/index.ts
backend/modules/files/application/dto/commands/attachment_command_dto.ts
backend/modules/files/application/dto/commands/index.ts
backend/modules/home_passport/application/dto/commands/home_passport_command_dto.ts
backend/modules/home_passport/application/dto/commands/index.ts
backend/modules/location/application/dto/commands/address_command_dto.ts
backend/modules/location/application/dto/commands/index.ts
backend/modules/notifications/application/dto/commands/index.ts
backend/modules/notifications/application/dto/commands/notification_command_dto.ts
backend/modules/offers/application/dto/commands/index.ts
backend/modules/offers/application/dto/commands/offer_command_dto.ts
backend/modules/payments/application/dto/commands/index.ts
backend/modules/payments/application/dto/commands/payment_command_dto.ts
backend/modules/requests/application/dto/commands/index.ts
backend/modules/requests/application/dto/commands/request_command_dto.ts
backend/modules/reviews/application/dto/commands/index.ts
backend/modules/reviews/application/dto/commands/review_command_dto.ts
backend/modules/services/application/dto/commands/index.ts
backend/modules/services/application/dto/commands/service_command_dto.ts
backend/modules/subscriptions/application/dto/commands/index.ts
backend/modules/subscriptions/application/dto/commands/subscription_command_dto.ts
backend/modules/technicians/application/dto/commands/index.ts
backend/modules/technicians/application/dto/commands/technician_command_dto.ts
backend/modules/users/application/dto/commands/index.ts
backend/modules/users/application/dto/commands/user_command_dto.ts
backend/modules/wallet/application/dto/commands/index.ts
backend/modules/wallet/application/dto/commands/wallet_command_dto.ts
backend/modules/warranty/application/dto/commands/index.ts
backend/modules/warranty/application/dto/commands/warranty_command_dto.ts
```

### Queries
```text
backend/modules/analytics/application/dto/queries/analytics_event_query_dto.ts
backend/modules/analytics/application/dto/queries/index.ts
backend/modules/bookings/application/dto/queries/booking_query_dto.ts
backend/modules/bookings/application/dto/queries/index.ts
backend/modules/categories/application/dto/queries/category_query_dto.ts
backend/modules/categories/application/dto/queries/index.ts
backend/modules/chat/application/dto/queries/chat_query_dto.ts
backend/modules/chat/application/dto/queries/index.ts
backend/modules/companies/application/dto/queries/company_query_dto.ts
backend/modules/companies/application/dto/queries/index.ts
backend/modules/disputes/application/dto/queries/dispute_query_dto.ts
backend/modules/disputes/application/dto/queries/index.ts
backend/modules/files/application/dto/queries/attachment_query_dto.ts
backend/modules/files/application/dto/queries/index.ts
backend/modules/home_passport/application/dto/queries/home_passport_query_dto.ts
backend/modules/home_passport/application/dto/queries/index.ts
backend/modules/location/application/dto/queries/address_query_dto.ts
backend/modules/location/application/dto/queries/index.ts
backend/modules/notifications/application/dto/queries/index.ts
backend/modules/notifications/application/dto/queries/notification_query_dto.ts
backend/modules/offers/application/dto/queries/index.ts
backend/modules/offers/application/dto/queries/offer_query_dto.ts
backend/modules/payments/application/dto/queries/index.ts
backend/modules/payments/application/dto/queries/payment_query_dto.ts
backend/modules/requests/application/dto/queries/index.ts
backend/modules/requests/application/dto/queries/request_query_dto.ts
backend/modules/reviews/application/dto/queries/index.ts
backend/modules/reviews/application/dto/queries/review_query_dto.ts
backend/modules/services/application/dto/queries/index.ts
backend/modules/services/application/dto/queries/service_query_dto.ts
backend/modules/subscriptions/application/dto/queries/index.ts
backend/modules/subscriptions/application/dto/queries/subscription_query_dto.ts
backend/modules/technicians/application/dto/queries/index.ts
backend/modules/technicians/application/dto/queries/technician_query_dto.ts
backend/modules/users/application/dto/queries/index.ts
backend/modules/users/application/dto/queries/user_query_dto.ts
backend/modules/wallet/application/dto/queries/index.ts
backend/modules/wallet/application/dto/queries/wallet_query_dto.ts
backend/modules/warranty/application/dto/queries/index.ts
backend/modules/warranty/application/dto/queries/warranty_query_dto.ts
```

## Risks

| Risk | Mitigation |
|---|---|
| DTOs drift from later API/OpenAPI contracts | Reconcile in a separately approved API sprint |
| DTOs become accidental domain models | Retain interface-only, behavior-free rules |
| Shared DTO changes affect all modules | Review and version Core contract changes |
| Generic shapes need richer fields later | Add only alongside approved use-case/API design |

## Recommendations

1. Approve and commit Sprint 2.5 before starting any implementation layer.
2. Keep DTOs independent from entities, infrastructure records, and vendor SDK types.
3. Add validators, mappers, serialization, and handlers only in explicitly authorized future sprints.
4. Keep this quality gate in CI.

## Stop Condition

Sprint 2.5 complete. Do **not** continue automatically.
