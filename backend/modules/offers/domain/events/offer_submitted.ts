import { DomainEvent } from '@otlob/core';

export class OfferSubmitted extends DomainEvent {
  public constructor(public readonly offerId: string, public readonly requestId: string) {
    super('offer.submitted');
  }
}
