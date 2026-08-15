import { AggregateRoot, DateRange, Money } from '@otlob/core';
import { BookingStatus } from '../enums/booking_status';
import { BookingId } from './booking_id';

export interface BookingProps {
  requestId: string;
  offerId: string;
  customerId: string;
  providerId: string;
  status: BookingStatus;
  scheduledWindow: DateRange | null;
  frozenTotal: Money;
  marketId: string;
  countryCode: string;
}

export class Booking extends AggregateRoot<BookingId> {
  public readonly requestId: string;
  public readonly offerId: string;
  public readonly customerId: string;
  public readonly providerId: string;
  public readonly status: BookingStatus;
  public readonly scheduledWindow: DateRange | null;
  public readonly frozenTotal: Money;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: BookingId, props: BookingProps) {
    super(id);
    this.requestId = props.requestId;
    this.offerId = props.offerId;
    this.customerId = props.customerId;
    this.providerId = props.providerId;
    this.status = props.status;
    this.scheduledWindow = props.scheduledWindow;
    this.frozenTotal = props.frozenTotal;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: BookingId, props: BookingProps): Booking {
    return new Booking(id, props);
  }
}
