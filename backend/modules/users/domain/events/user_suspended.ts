import { DomainEvent } from '@otlob/core';

export class UserSuspended extends DomainEvent {
  public constructor(public readonly userId: string) {
    super('user.suspended');
  }
}
