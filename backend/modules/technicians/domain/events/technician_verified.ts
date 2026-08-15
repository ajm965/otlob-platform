import { DomainEvent } from '@otlob/core';

export class TechnicianVerified extends DomainEvent {
  public constructor(public readonly technicianId: string) {
    super('technician.verified');
  }
}
