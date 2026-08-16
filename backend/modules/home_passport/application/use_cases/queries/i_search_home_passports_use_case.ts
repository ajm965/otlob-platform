import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { HomePassportResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchHomePassportsUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchHomePassportsUseCase extends IUseCase<SearchHomePassportsUseCaseInput, CursorPageResponseDto<HomePassportResponse>> {}
