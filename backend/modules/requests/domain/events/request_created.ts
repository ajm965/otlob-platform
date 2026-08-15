import { DomainEvent } from '@otlob/core';

export class RequestCreated extends DomainEvent {
  public constructor(public readonly requestId: string) {
    super('request.created');
  }
}
