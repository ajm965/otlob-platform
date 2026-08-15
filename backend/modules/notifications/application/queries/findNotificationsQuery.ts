import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { NotificationStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindNotificationsQuery extends QueryContract<StatusFilter<NotificationStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
