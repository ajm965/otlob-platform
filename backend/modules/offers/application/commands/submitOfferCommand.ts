import type { CommandContract } from '@otlob/core';

/** Intent contract only; no handler or workflow implementation. */
export interface SubmitOfferCommand extends CommandContract {
  readonly aggregateId?: string;
}
