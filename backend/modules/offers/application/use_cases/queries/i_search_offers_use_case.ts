import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { OfferResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchOffersUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchOffersUseCase extends IUseCase<SearchOffersUseCaseInput, CursorPageResponseDto<OfferResponse>> {}
