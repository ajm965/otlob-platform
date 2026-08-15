import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { RequestStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindPendingRequestsQuery extends QueryContract<StatusFilter<RequestStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
