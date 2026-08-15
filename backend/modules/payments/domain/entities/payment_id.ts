import { UniqueId } from '@otlob/core';

export class PaymentId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): PaymentId {
    return new PaymentId(value);
  }
}
