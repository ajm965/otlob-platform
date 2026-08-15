import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Review } from '../entities/review';
import type { ReviewId } from '../entities/review_id';
import type { ReviewStatus } from '../enums/review_status';

export interface ReviewFilter extends StatusFilter<ReviewStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface IReviewRepository extends IRepository<Review, ReviewId, ReviewFilter, SortOptions> {}
