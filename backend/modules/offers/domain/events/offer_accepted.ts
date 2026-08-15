import { DomainEvent } from '@otlob/core';

export class OfferAccepted extends DomainEvent {
  public constructor(public readonly offerId: string, public readonly requestId: string) {
    super('offer.accepted');
  }
}
