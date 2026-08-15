import type { CommandDto, MarketScopeDto } from '@otlob/core';

/** Command data shape only; no handler or workflow is defined. */
export interface OpenDisputeCommandDto extends CommandDto, MarketScopeDto {
  readonly aggregateId?: string;
}
