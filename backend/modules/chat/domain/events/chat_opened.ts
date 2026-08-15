import { DomainEvent } from '@otlob/core';

export class ChatOpened extends DomainEvent {
  public constructor(public readonly chatId: string, public readonly bookingId: string) {
    super('chat.opened');
  }
}
