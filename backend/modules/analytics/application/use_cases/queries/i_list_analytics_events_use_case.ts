import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { AnalyticsEventResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListAnalyticsEventsUseCase extends IUseCase<QueryDto, CursorPageResponseDto<AnalyticsEventResponse>> {}
