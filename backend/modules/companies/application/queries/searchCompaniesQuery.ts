import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { CompanyStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface SearchCompaniesQuery extends QueryContract<StatusFilter<CompanyStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
