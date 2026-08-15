import { UniqueId } from '@otlob/core';

export class NotificationId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): NotificationId {
    return new NotificationId(value);
  }
}
