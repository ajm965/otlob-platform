import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteHomePassportUseCaseOutput extends EntityIdDto {}

export interface IDeleteHomePassportUseCase extends IUseCase<EntityIdDto, DeleteHomePassportUseCaseOutput> {}
