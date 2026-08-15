import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Technician } from '../entities/technician';
import type { TechnicianId } from '../entities/technician_id';
import type { TechnicianStatus } from '../enums/technician_status';

export interface TechnicianFilter extends StatusFilter<TechnicianStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface ITechnicianRepository extends IRepository<Technician, TechnicianId, TechnicianFilter, SortOptions> {}
