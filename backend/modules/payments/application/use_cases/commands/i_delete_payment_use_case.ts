import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeletePaymentUseCaseOutput extends EntityIdDto {}

export interface IDeletePaymentUseCase extends IUseCase<EntityIdDto, DeletePaymentUseCaseOutput> {}
