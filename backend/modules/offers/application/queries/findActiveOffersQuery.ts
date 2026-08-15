import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { OfferStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindActiveOffersQuery extends QueryContract<StatusFilter<OfferStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
