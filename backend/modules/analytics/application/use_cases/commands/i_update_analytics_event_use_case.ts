import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { RecordAnalyticsEventRequest, AnalyticsEventResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateAnalyticsEventUseCaseInput extends EntityIdDto {
  readonly payload: RecordAnalyticsEventRequest;
}

export interface IUpdateAnalyticsEventUseCase extends IUseCase<UpdateAnalyticsEventUseCaseInput, AnalyticsEventResponse> {}
