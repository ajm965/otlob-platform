import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { ServiceRequest } from '../entities/service_request';
import type { RequestId } from '../entities/request_id';
import type { RequestStatus } from '../enums/request_status';

export interface ServiceRequestFilter extends StatusFilter<RequestStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
  readonly customerId?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface IRequestRepository extends IRepository<ServiceRequest, RequestId, ServiceRequestFilter, SortOptions> {}

/** Backward-compatible descriptive alias for the Request aggregate port. */
export type IServiceRequestRepository = IRequestRepository;
