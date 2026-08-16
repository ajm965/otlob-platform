import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { AddressResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListLocationsUseCase extends IUseCase<QueryDto, CursorPageResponseDto<AddressResponse>> {}
