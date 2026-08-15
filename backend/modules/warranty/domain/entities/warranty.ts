import { AggregateRoot } from '@otlob/core';
import { WarrantyStatus } from '../enums/warranty_status';
import { WarrantyId } from './warranty_id';

export interface WarrantyProps {
  bookingId: string;
  customerId: string;
  providerId: string;
  status: WarrantyStatus;
  startsAt: Date;
  endsAt: Date;
  marketId: string;
  countryCode: string;
}

export class Warranty extends AggregateRoot<WarrantyId> {
  public readonly bookingId: string;
  public readonly customerId: string;
  public readonly providerId: string;
  public readonly status: WarrantyStatus;
  public readonly startsAt: Date;
  public readonly endsAt: Date;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: WarrantyId, props: WarrantyProps) {
    super(id);
    this.bookingId = props.bookingId;
    this.customerId = props.customerId;
    this.providerId = props.providerId;
    this.status = props.status;
    this.startsAt = props.startsAt;
    this.endsAt = props.endsAt;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: WarrantyId, props: WarrantyProps): Warranty {
    return new Warranty(id, props);
  }
}
