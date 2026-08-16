import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { RequestResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchRequestsUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchRequestsUseCase extends IUseCase<SearchRequestsUseCaseInput, CursorPageResponseDto<RequestResponse>> {}
