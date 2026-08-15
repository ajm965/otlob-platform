# REPOSITORY_CONTRACTS_REPORT

**Sprint:** 2.4 — Repository Contracts  
**Status:** PASS  
**Governing baseline:** Architecture Review V2

## Quality Gate

| Check | Result |
|---|---|
| No implementation code exists | PASS |
| No business logic exists | PASS |
| Contracts depend only on Domain/Core | PASS |
| No dependency cycles/layer violations | PASS |
| No duplicate repository interfaces | PASS |
| Existing architecture preserved | PASS — Sprint 2.4 made no `docs/` writes |
| Repository builds successfully | PASS |

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

**Total:** 20. `analytics` is contract-only because Sprint 2.3 intentionally created no Analytics aggregate.

## Interfaces Created

- `IAnalyticsRepository`
- `IAttachmentRepository`
- `IBookingRepository`
- `ICategoryRepository`
- `IChatRepository`
- `ICompanyRepository`
- `IDisputeRepository`
- `IHomePassportRepository`
- `ILocationRepository`
- `INotificationRepository`
- `IOfferRepository`
- `IPaymentRepository`
- `IRequestRepository`
- `IReviewRepository`
- `IServiceRepository`
- `ISubscriptionRepository`
- `ITechnicianRepository`
- `IUserRepository`
- `IWalletRepository`
- `IWarrantyRepository`

Canonical ports are in `backend/modules/<module>/domain/repositories/`. Application `repositories/` and `interfaces/` re-export canonical ports and do not duplicate interfaces.

## Query Contracts

```text
backend/modules/analytics/application/queries/find_analytics_events_query.ts
backend/modules/analytics/application/queries/index.ts
backend/modules/bookings/application/queries/findBookingsQuery.ts
backend/modules/bookings/application/queries/index.ts
backend/modules/categories/application/queries/index.ts
backend/modules/categories/application/queries/searchCategoriesQuery.ts
backend/modules/chat/application/queries/findChatsQuery.ts
backend/modules/chat/application/queries/index.ts
backend/modules/companies/application/queries/index.ts
backend/modules/companies/application/queries/searchCompaniesQuery.ts
backend/modules/disputes/application/queries/findDisputesQuery.ts
backend/modules/disputes/application/queries/index.ts
backend/modules/files/application/queries/findAttachmentsQuery.ts
backend/modules/files/application/queries/index.ts
backend/modules/home_passport/application/queries/findHomePassportsQuery.ts
backend/modules/home_passport/application/queries/index.ts
backend/modules/location/application/queries/findAddressesQuery.ts
backend/modules/location/application/queries/index.ts
backend/modules/notifications/application/queries/findNotificationsQuery.ts
backend/modules/notifications/application/queries/index.ts
backend/modules/offers/application/queries/findActiveOffersQuery.ts
backend/modules/offers/application/queries/index.ts
backend/modules/payments/application/queries/findPaymentsQuery.ts
backend/modules/payments/application/queries/index.ts
backend/modules/requests/application/queries/findPendingRequestsQuery.ts
backend/modules/requests/application/queries/index.ts
backend/modules/reviews/application/queries/findReviewsQuery.ts
backend/modules/reviews/application/queries/index.ts
backend/modules/services/application/queries/index.ts
backend/modules/services/application/queries/searchServicesQuery.ts
backend/modules/subscriptions/application/queries/findSubscriptionsQuery.ts
backend/modules/subscriptions/application/queries/index.ts
backend/modules/technicians/application/queries/findNearbyTechniciansQuery.ts
backend/modules/technicians/application/queries/index.ts
backend/modules/users/application/queries/findUsersQuery.ts
backend/modules/users/application/queries/index.ts
backend/modules/wallet/application/queries/findWalletsQuery.ts
backend/modules/wallet/application/queries/index.ts
backend/modules/warranty/application/queries/findWarrantiesQuery.ts
backend/modules/warranty/application/queries/index.ts
```

## Command Contracts

```text
backend/modules/analytics/application/commands/index.ts
backend/modules/analytics/application/commands/record_analytics_event_command.ts
backend/modules/bookings/application/commands/completeBookingCommand.ts
backend/modules/bookings/application/commands/index.ts
backend/modules/categories/application/commands/createCategoryCommand.ts
backend/modules/categories/application/commands/index.ts
backend/modules/chat/application/commands/index.ts
backend/modules/chat/application/commands/openChatCommand.ts
backend/modules/companies/application/commands/createCompanyCommand.ts
backend/modules/companies/application/commands/index.ts
backend/modules/disputes/application/commands/index.ts
backend/modules/disputes/application/commands/openDisputeCommand.ts
backend/modules/files/application/commands/createAttachmentCommand.ts
backend/modules/files/application/commands/index.ts
backend/modules/home_passport/application/commands/createHomePassportCommand.ts
backend/modules/home_passport/application/commands/index.ts
backend/modules/location/application/commands/createAddressCommand.ts
backend/modules/location/application/commands/index.ts
backend/modules/notifications/application/commands/index.ts
backend/modules/notifications/application/commands/queueNotificationCommand.ts
backend/modules/offers/application/commands/accept_offer_command.ts
backend/modules/offers/application/commands/index.ts
backend/modules/offers/application/commands/reject_offer_command.ts
backend/modules/offers/application/commands/submitOfferCommand.ts
backend/modules/payments/application/commands/index.ts
backend/modules/payments/application/commands/recordPaymentCommand.ts
backend/modules/requests/application/commands/createRequestCommand.ts
backend/modules/requests/application/commands/index.ts
backend/modules/reviews/application/commands/index.ts
backend/modules/reviews/application/commands/submitReviewCommand.ts
backend/modules/services/application/commands/createServiceCommand.ts
backend/modules/services/application/commands/index.ts
backend/modules/subscriptions/application/commands/createSubscriptionCommand.ts
backend/modules/subscriptions/application/commands/index.ts
backend/modules/technicians/application/commands/createTechnicianCommand.ts
backend/modules/technicians/application/commands/index.ts
backend/modules/users/application/commands/createUserCommand.ts
backend/modules/users/application/commands/index.ts
backend/modules/wallet/application/commands/index.ts
backend/modules/wallet/application/commands/requestWithdrawalCommand.ts
backend/modules/warranty/application/commands/index.ts
backend/modules/warranty/application/commands/issueWarrantyCommand.ts
```

Commands are intent interfaces only. No handlers, persistence operations, or workflows exist.

## Filters, Sorting, and Pagination

Shared `@otlob/core` type-only contracts:

- `StatusFilter`, `DateRangeFilter`, `LocationFilter`, `PriceRangeFilter`, `RatingFilter`, `PaginationFilter`
- `SortDirection`, `SortField`, `SortOptions`
- `CursorPagination`, `OffsetPagination`, `PageInfo`, `Page<T>`

All module contract folders re-export these types. No pagination models were duplicated.

## Reused Core Components

- `IRepository<TEntity, TId, TFilter, TSort>`
- `QueryContract`, `CommandContract`
- Shared filtering, sorting, and pagination types
- Existing domain entity, ID, enum, and value-object exports

## Risks

| Risk | Mitigation |
|---|---|
| Generic operations may not express future reads | Add narrow named query contracts; never SDK details |
| Contract drift vs future HTTP/OpenAPI | Reconcile in a separately authorized API sprint |
| Runtime code leaks into contracts | Retain this quality gate in CI |
| Analytics lacks an aggregate | Keep it contract-only until an approved domain model exists |

## Recommendations

1. Approve and commit Sprint 2.4 before beginning Sprint 2.5.
2. Add repository adapters only in a separately authorized infrastructure sprint.
3. Keep SDK/database/HTTP/framework imports out of all contracts.
4. Extend contracts with namespaced interfaces instead of changing shared Core types without review.

## Stop Condition

Sprint 2.4 is complete. Do **not** continue to Sprint 2.5 without approval.
