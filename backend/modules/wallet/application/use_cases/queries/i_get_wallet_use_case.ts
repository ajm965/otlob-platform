import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { WalletResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetWalletUseCase extends IUseCase<EntityIdDto, WalletResponse> {}
