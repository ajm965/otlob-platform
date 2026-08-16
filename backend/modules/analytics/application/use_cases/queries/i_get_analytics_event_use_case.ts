import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { AnalyticsEventResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetAnalyticsEventUseCase extends IUseCase<EntityIdDto, AnalyticsEventResponse> {}
