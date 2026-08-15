import type { DateRangeFilter, QueryContract, SortOptions } from '@otlob/core';

export interface FindAnalyticsEventsQuery extends QueryContract<DateRangeFilter, SortOptions> {
  readonly eventTypes?: readonly string[];
  readonly marketId?: string;
}
