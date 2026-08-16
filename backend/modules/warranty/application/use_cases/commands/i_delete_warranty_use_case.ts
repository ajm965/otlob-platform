import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteWarrantyUseCaseOutput extends EntityIdDto {}

export interface IDeleteWarrantyUseCase extends IUseCase<EntityIdDto, DeleteWarrantyUseCaseOutput> {}
