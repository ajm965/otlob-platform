import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { HomePassportStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindHomePassportsQuery extends QueryContract<StatusFilter<HomePassportStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
