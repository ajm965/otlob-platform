import type { IUseCase } from '@otlob/core';
import type { CreateBookingRequest, BookingResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateBookingUseCase extends IUseCase<CreateBookingRequest, BookingResponse> {}
