import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { HomePassportResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListHomePassportsUseCase extends IUseCase<QueryDto, CursorPageResponseDto<HomePassportResponse>> {}
