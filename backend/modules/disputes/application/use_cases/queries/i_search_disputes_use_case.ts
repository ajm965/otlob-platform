import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { DisputeResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchDisputesUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchDisputesUseCase extends IUseCase<SearchDisputesUseCaseInput, CursorPageResponseDto<DisputeResponse>> {}
