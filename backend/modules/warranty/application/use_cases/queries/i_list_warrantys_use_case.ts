import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { WarrantyResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListWarrantysUseCase extends IUseCase<QueryDto, CursorPageResponseDto<WarrantyResponse>> {}
