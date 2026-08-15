import { DomainEvent } from '@otlob/core';

export class ServiceCreated extends DomainEvent {
  public constructor(public readonly serviceId: string) {
    super('service.created');
  }
}
