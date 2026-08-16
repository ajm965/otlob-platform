import type { IUseCase } from '@otlob/core';
import type { CreateSubscriptionRequest, SubscriptionResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateSubscriptionUseCase extends IUseCase<CreateSubscriptionRequest, SubscriptionResponse> {}
