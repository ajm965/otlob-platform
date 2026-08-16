import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { NotificationResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetNotificationUseCase extends IUseCase<EntityIdDto, NotificationResponse> {}
