import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Booking } from '../entities/booking';
import type { BookingId } from '../entities/booking_id';
import type { BookingStatus } from '../enums/booking_status';

export interface BookingFilter extends StatusFilter<BookingStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface IBookingRepository extends IRepository<Booking, BookingId, BookingFilter, SortOptions> {}
