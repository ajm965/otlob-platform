import { DomainEvent } from '@otlob/core';

export class SubscriptionActivated extends DomainEvent {
  public constructor(public readonly subscriptionId: string) {
    super('subscription.activated');
  }
}
