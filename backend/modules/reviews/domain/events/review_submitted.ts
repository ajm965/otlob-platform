import { DomainEvent } from '@otlob/core';

export class ReviewSubmitted extends DomainEvent {
  public constructor(public readonly reviewId: string, public readonly bookingId: string) {
    super('review.submitted');
  }
}
