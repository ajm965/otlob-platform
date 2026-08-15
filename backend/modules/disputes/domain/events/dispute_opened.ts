import { DomainEvent } from '@otlob/core';

export class DisputeOpened extends DomainEvent {
  public constructor(public readonly disputeId: string, public readonly bookingId: string) {
    super('dispute.opened');
  }
}
