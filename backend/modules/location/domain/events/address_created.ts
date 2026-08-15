import { DomainEvent } from '@otlob/core';

export class AddressCreated extends DomainEvent {
  public constructor(public readonly addressId: string, public readonly userId: string) {
    super('address.created');
  }
}
