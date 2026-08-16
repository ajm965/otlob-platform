import type { IUseCase } from '@otlob/core';
import type { CreateWalletRequest, WalletResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateWalletUseCase extends IUseCase<CreateWalletRequest, WalletResponse> {}
