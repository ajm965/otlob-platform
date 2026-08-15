import type { CommandContract } from '@otlob/core';

/** Contract only; event recording behavior is intentionally absent. */
export interface RecordAnalyticsEventCommand extends CommandContract {
  readonly eventType: string;
  readonly marketId: string;
}
