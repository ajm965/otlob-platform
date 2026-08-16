import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteCategoryUseCaseOutput extends EntityIdDto {}

export interface IDeleteCategoryUseCase extends IUseCase<EntityIdDto, DeleteCategoryUseCaseOutput> {}
