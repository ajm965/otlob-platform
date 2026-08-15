import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { PaymentStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindPaymentsQuery extends QueryContract<StatusFilter<PaymentStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
