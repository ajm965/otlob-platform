import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { ReviewResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListReviewsUseCase extends IUseCase<QueryDto, CursorPageResponseDto<ReviewResponse>> {}
