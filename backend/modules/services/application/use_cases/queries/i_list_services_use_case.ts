import type { CursorPageResponseDto, IUseCase } from '@otlob/core';
import type { SearchServicesQueryDto, ServiceResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListServicesUseCase
  extends IUseCase<SearchServicesQueryDto, CursorPageResponseDto<ServiceResponse>> {}
