import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Payment } from '../entities/payment';
import type { PaymentId } from '../entities/payment_id';
import type { PaymentStatus } from '../enums/payment_status';

export interface PaymentFilter extends StatusFilter<PaymentStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface IPaymentRepository extends IRepository<Payment, PaymentId, PaymentFilter, SortOptions> {}
