import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteRequestUseCaseOutput extends EntityIdDto {}

export interface IDeleteRequestUseCase extends IUseCase<EntityIdDto, DeleteRequestUseCaseOutput> {}
