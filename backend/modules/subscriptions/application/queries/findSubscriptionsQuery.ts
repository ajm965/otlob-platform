import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { SubscriptionStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindSubscriptionsQuery extends QueryContract<StatusFilter<SubscriptionStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
