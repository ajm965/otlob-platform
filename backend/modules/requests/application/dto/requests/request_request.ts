import type { MarketScopeDto } from '@otlob/core';

/** Create input. Persistable fields map onto ServiceRequest; customerId is set by the adapter. */
export interface CreateRequestRequest extends MarketScopeDto {
  readonly id?: string;
  readonly customerId: string;
  readonly serviceId: string;
  readonly description: string;
  readonly preferredTimeStart?: string | null;
  readonly preferredTimeEnd?: string | null;
  /** Documented API example field; not on ServiceRequest — rejected if supplied. */
  readonly title?: unknown;
  /** Documented API example field; not on ServiceRequest — rejected if supplied. */
  readonly addressId?: unknown;
  /** Documented API example field; not on ServiceRequest — rejected if supplied. */
  readonly budgetMinHalalas?: unknown;
  /** Documented API example field; not on ServiceRequest — rejected if supplied. */
  readonly budgetMaxHalalas?: unknown;
  /** Documented API example field; not on ServiceRequest — rejected if supplied. */
  readonly mediaUrls?: unknown;
}
