import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Dispute } from '../entities/dispute';
import type { DisputeId } from '../entities/dispute_id';
import type { DisputeStatus } from '../enums/dispute_status';

export interface DisputeFilter extends StatusFilter<DisputeStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface IDisputeRepository extends IRepository<Dispute, DisputeId, DisputeFilter, SortOptions> {}
