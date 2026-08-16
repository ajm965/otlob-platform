import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteCompanyUseCaseOutput extends EntityIdDto {}

export interface IDeleteCompanyUseCase extends IUseCase<EntityIdDto, DeleteCompanyUseCaseOutput> {}
