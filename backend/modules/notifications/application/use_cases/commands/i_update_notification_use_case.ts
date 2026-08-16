import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateNotificationRequest, NotificationResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateNotificationUseCaseInput extends EntityIdDto {
  readonly payload: CreateNotificationRequest;
}

export interface IUpdateNotificationUseCase extends IUseCase<UpdateNotificationUseCaseInput, NotificationResponse> {}
