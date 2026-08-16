import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { SubmitReviewRequest, ReviewResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateReviewUseCaseInput extends EntityIdDto {
  readonly payload: SubmitReviewRequest;
}

export interface IUpdateReviewUseCase extends IUseCase<UpdateReviewUseCaseInput, ReviewResponse> {}
