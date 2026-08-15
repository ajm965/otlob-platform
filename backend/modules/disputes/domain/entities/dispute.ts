import { AggregateRoot } from '@otlob/core';
import { DisputeStatus } from '../enums/dispute_status';
import { DisputeId } from './dispute_id';

export interface DisputeProps {
  bookingId: string;
  openedByUserId: string;
  reasonCode: string;
  description: string;
  status: DisputeStatus;
  marketId: string;
  countryCode: string;
}

export class Dispute extends AggregateRoot<DisputeId> {
  public readonly bookingId: string;
  public readonly openedByUserId: string;
  public readonly reasonCode: string;
  public readonly description: string;
  public readonly status: DisputeStatus;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: DisputeId, props: DisputeProps) {
    super(id);
    this.bookingId = props.bookingId;
    this.openedByUserId = props.openedByUserId;
    this.reasonCode = props.reasonCode;
    this.description = props.description;
    this.status = props.status;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: DisputeId, props: DisputeProps): Dispute {
    return new Dispute(id, props);
  }
}
