import { DomainEvent } from '@otlob/core';

export class WarrantyClaimSubmitted extends DomainEvent {
  public constructor(public readonly warrantyId: string, public readonly claimId: string) {
    super('warranty.claim_submitted');
  }
}
