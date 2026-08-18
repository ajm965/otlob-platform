import type { CoordinatesDto, EntityIdDto, MarketScopeDto } from '@otlob/core';

/** Customer request projection. Fields map from ServiceRequest + DateRange/GeoPoint. */
export interface RequestResponse extends EntityIdDto, MarketScopeDto {
  readonly customerId: string;
  readonly serviceId: string;
  readonly status: string;
  readonly description: string;
  readonly location: CoordinatesDto | null;
  readonly preferredTimeStart: string | null;
  readonly preferredTimeEnd: string | null;
  readonly acceptedOfferId: string | null;
  readonly bookingId: string | null;
}
