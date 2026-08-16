import type { IUseCase } from '@otlob/core';
import type { CreateNotificationRequest, NotificationResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateNotificationUseCase extends IUseCase<CreateNotificationRequest, NotificationResponse> {}
