import type { CommandContract } from '@otlob/core';

/** Intent contract only; rejection workflow is not implemented. */
export interface RejectOfferCommand extends CommandContract {
  readonly offerId: string;
}
