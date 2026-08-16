import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { CategoryResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchCategorysUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchCategorysUseCase extends IUseCase<SearchCategorysUseCaseInput, CursorPageResponseDto<CategoryResponse>> {}
