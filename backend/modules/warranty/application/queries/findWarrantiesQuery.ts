import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { WarrantyStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindWarrantiesQuery extends QueryContract<StatusFilter<WarrantyStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
