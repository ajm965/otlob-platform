import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateWalletRequest, WalletResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateWalletUseCaseInput extends EntityIdDto {
  readonly payload: CreateWalletRequest;
}

export interface IUpdateWalletUseCase extends IUseCase<UpdateWalletUseCaseInput, WalletResponse> {}
