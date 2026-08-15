import { DomainEvent } from '@otlob/core';

export class HomePassportCreated extends DomainEvent {
  public constructor(public readonly homePassportId: string) {
    super('home_passport.created');
  }
}
