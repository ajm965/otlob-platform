import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { TechnicianStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindNearbyTechniciansQuery extends QueryContract<StatusFilter<TechnicianStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
