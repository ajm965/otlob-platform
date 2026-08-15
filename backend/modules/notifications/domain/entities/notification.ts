import { AggregateRoot } from '@otlob/core';
import { NotificationChannel } from '../enums/notification_channel';
import { NotificationStatus } from '../enums/notification_status';
import { NotificationId } from './notification_id';

export interface NotificationProps {
  recipientUserId: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  templateKey: string;
  marketId: string;
  countryCode: string;
}

export class Notification extends AggregateRoot<NotificationId> {
  public readonly recipientUserId: string;
  public readonly channel: NotificationChannel;
  public readonly status: NotificationStatus;
  public readonly templateKey: string;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: NotificationId, props: NotificationProps) {
    super(id);
    this.recipientUserId = props.recipientUserId;
    this.channel = props.channel;
    this.status = props.status;
    this.templateKey = props.templateKey;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: NotificationId, props: NotificationProps): Notification {
    return new Notification(id, props);
  }
}
