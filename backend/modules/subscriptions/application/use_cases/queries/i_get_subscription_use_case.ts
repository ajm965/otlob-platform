import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { SubscriptionResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetSubscriptionUseCase extends IUseCase<EntityIdDto, SubscriptionResponse> {}
