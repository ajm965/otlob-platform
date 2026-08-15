import { DomainEvent } from '@otlob/core';

export class DisputeResolved extends DomainEvent {
  public constructor(public readonly disputeId: string) {
    super('dispute.resolved');
  }
}
