import type { QueryDto } from '@otlob/core';

/** List-my-requests query. `status` is the documented HTTP filter; customerId is set by the adapter. */
export interface FindPendingRequestsQueryDto extends QueryDto {
  readonly marketId?: string;
  readonly countryCode?: string;
  readonly customerId?: string;
  readonly status?: string;
}
