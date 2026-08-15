import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Subscription } from '../entities/subscription';
import type { SubscriptionId } from '../entities/subscription_id';
import type { SubscriptionStatus } from '../enums/subscription_status';

export interface SubscriptionFilter extends StatusFilter<SubscriptionStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface ISubscriptionRepository extends IRepository<Subscription, SubscriptionId, SubscriptionFilter, SortOptions> {}
