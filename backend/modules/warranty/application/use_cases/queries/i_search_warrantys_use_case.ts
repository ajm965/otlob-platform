import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { WarrantyResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchWarrantysUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchWarrantysUseCase extends IUseCase<SearchWarrantysUseCaseInput, CursorPageResponseDto<WarrantyResponse>> {}
