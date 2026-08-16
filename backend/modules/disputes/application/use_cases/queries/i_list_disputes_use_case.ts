import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { DisputeResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListDisputesUseCase extends IUseCase<QueryDto, CursorPageResponseDto<DisputeResponse>> {}
