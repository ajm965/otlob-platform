import { UniqueId } from '@otlob/core';

export class AddressId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): AddressId {
    return new AddressId(value);
  }
}
