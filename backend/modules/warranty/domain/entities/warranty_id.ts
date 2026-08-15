import { UniqueId } from '@otlob/core';

export class WarrantyId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): WarrantyId {
    return new WarrantyId(value);
  }
}
