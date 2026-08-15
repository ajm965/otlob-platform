import { UniqueId } from '@otlob/core';

export class SubscriptionId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): SubscriptionId {
    return new SubscriptionId(value);
  }
}
