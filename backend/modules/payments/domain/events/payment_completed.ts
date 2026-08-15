import { DomainEvent } from '@otlob/core';

export class PaymentCompleted extends DomainEvent {
  public constructor(public readonly paymentId: string) {
    super('payment.completed');
  }
}
