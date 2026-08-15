import { DomainEvent } from '@otlob/core';

export class CompanyVerified extends DomainEvent {
  public constructor(public readonly companyId: string) {
    super('company.verified');
  }
}
