import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteServiceUseCaseOutput extends EntityIdDto {}

export interface IDeleteServiceUseCase extends IUseCase<EntityIdDto, DeleteServiceUseCaseOutput> {}
