import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { BookingStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindBookingsQuery extends QueryContract<StatusFilter<BookingStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
