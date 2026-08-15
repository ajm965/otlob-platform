import type { CommandContract } from '@otlob/core';

/** Intent contract only; acceptance workflow is not implemented. */
export interface AcceptOfferCommand extends CommandContract {
  readonly offerId: string;
  readonly idempotencyKey: string;
}
