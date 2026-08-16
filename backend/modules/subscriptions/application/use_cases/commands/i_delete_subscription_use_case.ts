import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteSubscriptionUseCaseOutput extends EntityIdDto {}

export interface IDeleteSubscriptionUseCase extends IUseCase<EntityIdDto, DeleteSubscriptionUseCaseOutput> {}
