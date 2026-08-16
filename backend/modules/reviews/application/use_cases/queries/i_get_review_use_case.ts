import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { ReviewResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetReviewUseCase extends IUseCase<EntityIdDto, ReviewResponse> {}
