import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { WalletResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchWalletsUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchWalletsUseCase extends IUseCase<SearchWalletsUseCaseInput, CursorPageResponseDto<WalletResponse>> {}
