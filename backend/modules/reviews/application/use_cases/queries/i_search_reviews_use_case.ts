import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { ReviewResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchReviewsUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchReviewsUseCase extends IUseCase<SearchReviewsUseCaseInput, CursorPageResponseDto<ReviewResponse>> {}
