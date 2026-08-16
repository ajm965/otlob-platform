import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { AddressResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchLocationsUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchLocationsUseCase extends IUseCase<SearchLocationsUseCaseInput, CursorPageResponseDto<AddressResponse>> {}
