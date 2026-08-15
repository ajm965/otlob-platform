import { DomainEvent } from '@otlob/core';

export class UserRegistered extends DomainEvent {
  public constructor(public readonly userId: string) {
    super('user.registered');
  }
}
