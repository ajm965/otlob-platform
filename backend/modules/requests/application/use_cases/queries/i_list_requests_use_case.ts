import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { RequestResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListRequestsUseCase extends IUseCase<QueryDto, CursorPageResponseDto<RequestResponse>> {}
