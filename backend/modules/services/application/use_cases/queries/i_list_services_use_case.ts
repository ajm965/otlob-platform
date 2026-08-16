import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { ServiceResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListServicesUseCase extends IUseCase<QueryDto, CursorPageResponseDto<ServiceResponse>> {}
