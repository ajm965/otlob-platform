import { DomainEvent } from '@otlob/core';

export class CompanyRegistered extends DomainEvent {
  public constructor(public readonly companyId: string) {
    super('company.registered');
  }
}
