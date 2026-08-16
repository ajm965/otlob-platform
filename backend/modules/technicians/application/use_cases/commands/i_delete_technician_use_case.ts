import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteTechnicianUseCaseOutput extends EntityIdDto {}

export interface IDeleteTechnicianUseCase extends IUseCase<EntityIdDto, DeleteTechnicianUseCaseOutput> {}
