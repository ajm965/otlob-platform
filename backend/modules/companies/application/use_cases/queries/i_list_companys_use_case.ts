import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { CompanyResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListCompanysUseCase extends IUseCase<QueryDto, CursorPageResponseDto<CompanyResponse>> {}
