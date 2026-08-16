import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteBookingUseCaseOutput extends EntityIdDto {}

export interface IDeleteBookingUseCase extends IUseCase<EntityIdDto, DeleteBookingUseCaseOutput> {}
