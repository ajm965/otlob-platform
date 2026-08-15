import { DomainEvent } from '@otlob/core';

export class SubscriptionPastDue extends DomainEvent {
  public constructor(public readonly subscriptionId: string) {
    super('subscription.past_due');
  }
}
