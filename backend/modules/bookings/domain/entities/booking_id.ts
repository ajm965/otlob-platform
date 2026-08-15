import { UniqueId } from '@otlob/core';

export class BookingId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): BookingId {
    return new BookingId(value);
  }
}
