import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';

/** Analytics event/query port. No warehouse, database, or transport implementation. */
export interface IAnalyticsRepository
  extends IRepository<AnalyticsRecord, string, AnalyticsFilter, SortOptions> {}

export interface AnalyticsRecord {
  readonly eventId: string;
  readonly eventType: string;
  readonly marketId: string;
  readonly occurredAt: Date;
}

export interface AnalyticsFilter extends StatusFilter {
  readonly eventTypes?: readonly string[];
  readonly marketId?: string;
}

/** Backward-compatible query alias for contract consumers. */
export type AnalyticsQuery = AnalyticsFilter;
