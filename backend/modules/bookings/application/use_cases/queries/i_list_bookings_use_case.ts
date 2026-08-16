import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { BookingResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListBookingsUseCase extends IUseCase<QueryDto, CursorPageResponseDto<BookingResponse>> {}
