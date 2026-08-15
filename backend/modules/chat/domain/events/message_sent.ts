import { DomainEvent } from '@otlob/core';

export class MessageSent extends DomainEvent {
  public constructor(public readonly messageId: string, public readonly chatId: string) {
    super('message.sent');
  }
}
