import { DomainEvent } from '@otlob/core';

export class TechnicianProfileUpdated extends DomainEvent {
  public constructor(public readonly technicianId: string) {
    super('technician.profile_updated');
  }
}
