import { DomainEvent } from '@otlob/core';

export class BookingConfirmed extends DomainEvent {
  public constructor(public readonly bookingId: string) {
    super('booking.confirmed');
  }
}
