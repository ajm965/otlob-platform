import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { TechnicianResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListTechniciansUseCase extends IUseCase<QueryDto, CursorPageResponseDto<TechnicianResponse>> {}
