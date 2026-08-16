import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteLocationUseCaseOutput extends EntityIdDto {}

export interface IDeleteLocationUseCase extends IUseCase<EntityIdDto, DeleteLocationUseCaseOutput> {}
