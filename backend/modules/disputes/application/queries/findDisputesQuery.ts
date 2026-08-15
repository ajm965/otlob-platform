import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { DisputeStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindDisputesQuery extends QueryContract<StatusFilter<DisputeStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
