import type { CommandContract } from '@otlob/core';

/** Intent contract only; no handler or workflow implementation. */
export interface CreateHomePassportCommand extends CommandContract {
  readonly aggregateId?: string;
}
