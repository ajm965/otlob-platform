import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteOfferUseCaseOutput extends EntityIdDto {}

export interface IDeleteOfferUseCase extends IUseCase<EntityIdDto, DeleteOfferUseCaseOutput> {}
