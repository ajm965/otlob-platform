import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { WalletResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListWalletsUseCase extends IUseCase<QueryDto, CursorPageResponseDto<WalletResponse>> {}
