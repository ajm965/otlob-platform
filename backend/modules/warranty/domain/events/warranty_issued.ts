import { DomainEvent } from '@otlob/core';

export class WarrantyIssued extends DomainEvent {
  public constructor(public readonly warrantyId: string, public readonly bookingId: string) {
    super('warranty.issued');
  }
}
