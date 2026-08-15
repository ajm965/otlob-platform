import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Notification } from '../entities/notification';
import type { NotificationId } from '../entities/notification_id';
import type { NotificationStatus } from '../enums/notification_status';

export interface NotificationFilter extends StatusFilter<NotificationStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface INotificationRepository extends IRepository<Notification, NotificationId, NotificationFilter, SortOptions> {}
