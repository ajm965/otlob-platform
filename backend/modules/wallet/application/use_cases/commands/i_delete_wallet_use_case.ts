import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteWalletUseCaseOutput extends EntityIdDto {}

export interface IDeleteWalletUseCase extends IUseCase<EntityIdDto, DeleteWalletUseCaseOutput> {}
