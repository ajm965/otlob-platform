import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { TechnicianResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchTechniciansUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchTechniciansUseCase extends IUseCase<SearchTechniciansUseCaseInput, CursorPageResponseDto<TechnicianResponse>> {}
