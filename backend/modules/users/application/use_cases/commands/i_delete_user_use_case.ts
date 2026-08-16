import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteUserUseCaseOutput extends EntityIdDto {}

export interface IDeleteUserUseCase extends IUseCase<EntityIdDto, DeleteUserUseCaseOutput> {}
