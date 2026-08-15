import { DomainEvent } from '@otlob/core';

export class NotificationQueued extends DomainEvent {
  public constructor(public readonly notificationId: string) {
    super('notification.queued');
  }
}
