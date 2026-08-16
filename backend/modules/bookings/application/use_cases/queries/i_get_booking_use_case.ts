import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { BookingResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetBookingUseCase extends IUseCase<EntityIdDto, BookingResponse> {}
