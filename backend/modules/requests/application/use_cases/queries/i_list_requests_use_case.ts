import type { CursorPageResponseDto, IUseCase } from '@otlob/core';
import type { FindPendingRequestsQueryDto, RequestResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListRequestsUseCase
  extends IUseCase<FindPendingRequestsQueryDto, CursorPageResponseDto<RequestResponse>> {}
