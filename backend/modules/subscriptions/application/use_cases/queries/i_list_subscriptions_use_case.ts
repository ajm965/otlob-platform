import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { SubscriptionResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListSubscriptionsUseCase extends IUseCase<QueryDto, CursorPageResponseDto<SubscriptionResponse>> {}
