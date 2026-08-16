import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteReviewUseCaseOutput extends EntityIdDto {}

export interface IDeleteReviewUseCase extends IUseCase<EntityIdDto, DeleteReviewUseCaseOutput> {}
