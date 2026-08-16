import type { IUseCase } from '@otlob/core';
import type { RecordAnalyticsEventRequest, AnalyticsEventResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateAnalyticsEventUseCase extends IUseCase<RecordAnalyticsEventRequest, AnalyticsEventResponse> {}
