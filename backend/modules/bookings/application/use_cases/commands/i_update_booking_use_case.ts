import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateBookingRequest, BookingResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateBookingUseCaseInput extends EntityIdDto {
  readonly payload: CreateBookingRequest;
}

export interface IUpdateBookingUseCase extends IUseCase<UpdateBookingUseCaseInput, BookingResponse> {}
