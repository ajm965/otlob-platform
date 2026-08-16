import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { CompanyResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchCompanysUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchCompanysUseCase extends IUseCase<SearchCompanysUseCaseInput, CursorPageResponseDto<CompanyResponse>> {}
