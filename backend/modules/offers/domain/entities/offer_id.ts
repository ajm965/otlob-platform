import { UniqueId } from '@otlob/core';

export class OfferId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): OfferId {
    return new OfferId(value);
  }
}
