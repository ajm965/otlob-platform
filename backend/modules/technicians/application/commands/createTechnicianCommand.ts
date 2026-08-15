import type { CommandContract } from '@otlob/core';

/** Intent contract only; no handler or workflow implementation. */
export interface CreateTechnicianCommand extends CommandContract {
  readonly aggregateId?: string;
}
