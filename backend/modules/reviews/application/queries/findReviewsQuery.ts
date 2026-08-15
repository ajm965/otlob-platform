import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { ReviewStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindReviewsQuery extends QueryContract<StatusFilter<ReviewStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
