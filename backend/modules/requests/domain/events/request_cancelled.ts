import { DomainEvent } from '@otlob/core';

export class RequestCancelled extends DomainEvent {
  public constructor(public readonly requestId: string) {
    super('request.cancelled');
  }
}
