import { DomainEvent } from '@otlob/core';

export class BookingCompleted extends DomainEvent {
  public constructor(public readonly bookingId: string) {
    super('booking.completed');
  }
}
