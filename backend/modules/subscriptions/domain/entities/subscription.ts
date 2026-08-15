import { AggregateRoot } from '@otlob/core';
import { SubscriptionOwnerType } from '../enums/subscription_owner_type';
import { SubscriptionStatus } from '../enums/subscription_status';
import { SubscriptionId } from './subscription_id';

export interface SubscriptionProps {
  ownerType: SubscriptionOwnerType;
  ownerId: string;
  planCode: string;
  status: SubscriptionStatus;
  startsAt: Date;
  endsAt: Date | null;
  graceEndsAt: Date | null;
  cancelAtPeriodEnd: boolean;
  marketId: string;
  countryCode: string;
}

export class Subscription extends AggregateRoot<SubscriptionId> {
  public readonly ownerType: SubscriptionOwnerType;
  public readonly ownerId: string;
  public readonly planCode: string;
  public readonly status: SubscriptionStatus;
  public readonly startsAt: Date;
  public readonly endsAt: Date | null;
  public readonly graceEndsAt: Date | null;
  public readonly cancelAtPeriodEnd: boolean;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: SubscriptionId, props: SubscriptionProps) {
    super(id);
    this.ownerType = props.ownerType;
    this.ownerId = props.ownerId;
    this.planCode = props.planCode;
    this.status = props.status;
    this.startsAt = props.startsAt;
    this.endsAt = props.endsAt;
    this.graceEndsAt = props.graceEndsAt;
    this.cancelAtPeriodEnd = props.cancelAtPeriodEnd;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: SubscriptionId, props: SubscriptionProps): Subscription {
    return new Subscription(id, props);
  }
}
