import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { AddressStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindAddressesQuery extends QueryContract<StatusFilter<AddressStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
