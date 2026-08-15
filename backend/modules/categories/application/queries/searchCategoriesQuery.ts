import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { CategoryStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface SearchCategoriesQuery extends QueryContract<StatusFilter<CategoryStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
