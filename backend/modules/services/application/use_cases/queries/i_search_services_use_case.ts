import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { ServiceResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchServicesUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchServicesUseCase extends IUseCase<SearchServicesUseCaseInput, CursorPageResponseDto<ServiceResponse>> {}
