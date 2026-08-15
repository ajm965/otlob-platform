import { AggregateRoot, Money } from '@otlob/core';
import { PaymentStatus } from '../enums/payment_status';
import { PaymentId } from './payment_id';

export interface PaymentProps {
  bookingId: string;
  customerId: string;
  amount: Money;
  status: PaymentStatus;
  providerCode: string | null;
  idempotencyKey: string;
  marketId: string;
  countryCode: string;
}

export class Payment extends AggregateRoot<PaymentId> {
  public readonly bookingId: string;
  public readonly customerId: string;
  public readonly amount: Money;
  public readonly status: PaymentStatus;
  public readonly providerCode: string | null;
  public readonly idempotencyKey: string;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: PaymentId, props: PaymentProps) {
    super(id);
    this.bookingId = props.bookingId;
    this.customerId = props.customerId;
    this.amount = props.amount;
    this.status = props.status;
    this.providerCode = props.providerCode;
    this.idempotencyKey = props.idempotencyKey;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: PaymentId, props: PaymentProps): Payment {
    return new Payment(id, props);
  }
}
