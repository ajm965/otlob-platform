import { UniqueId } from '@otlob/core';

export class MessageId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): MessageId {
    return new MessageId(value);
  }
}
