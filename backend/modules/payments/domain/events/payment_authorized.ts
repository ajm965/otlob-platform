import { DomainEvent } from '@otlob/core';

export class PaymentAuthorized extends DomainEvent {
  public constructor(public readonly paymentId: string) {
    super('payment.authorized');
  }
}
