import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteDisputeUseCaseOutput extends EntityIdDto {}

export interface IDeleteDisputeUseCase extends IUseCase<EntityIdDto, DeleteDisputeUseCaseOutput> {}
