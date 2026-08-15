import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Warranty } from '../entities/warranty';
import type { WarrantyId } from '../entities/warranty_id';
import type { WarrantyStatus } from '../enums/warranty_status';

export interface WarrantyFilter extends StatusFilter<WarrantyStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface IWarrantyRepository extends IRepository<Warranty, WarrantyId, WarrantyFilter, SortOptions> {}
