import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateSubscriptionRequest, SubscriptionResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateSubscriptionUseCaseInput extends EntityIdDto {
  readonly payload: CreateSubscriptionRequest;
}

export interface IUpdateSubscriptionUseCase extends IUseCase<UpdateSubscriptionUseCaseInput, SubscriptionResponse> {}
