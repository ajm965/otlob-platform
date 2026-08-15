import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Service } from '../entities/service';
import type { ServiceId } from '../entities/service_id';
import type { ServiceStatus } from '../enums/service_status';

export interface ServiceFilter extends StatusFilter<ServiceStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface IServiceRepository extends IRepository<Service, ServiceId, ServiceFilter, SortOptions> {}
