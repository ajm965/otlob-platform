import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { ServiceStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface SearchServicesQuery extends QueryContract<StatusFilter<ServiceStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
