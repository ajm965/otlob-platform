import type { IUseCase } from '@otlob/core';
import type { SubmitReviewRequest, ReviewResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateReviewUseCase extends IUseCase<SubmitReviewRequest, ReviewResponse> {}
