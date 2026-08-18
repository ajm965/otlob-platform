import type { CoordinatesDto } from '@otlob/core';
import type { ServiceRequest } from '../../domain';
import type { RequestResponse } from '../dto';

export function toRequestResponse(request: ServiceRequest): RequestResponse {
  return {
    id: request.id.value,
    marketId: request.marketId,
    countryCode: request.countryCode,
    customerId: request.customerId,
    serviceId: request.serviceId,
    status: request.status,
    description: request.description,
    location: toCoordinates(request),
    preferredTimeStart: request.preferredWindow?.start.toISOString() ?? null,
    preferredTimeEnd: request.preferredWindow?.end.toISOString() ?? null,
    acceptedOfferId: request.acceptedOfferId,
    bookingId: request.bookingId,
  };
}

function toCoordinates(request: ServiceRequest): CoordinatesDto | null {
  if (request.location === null) {
    return null;
  }
  return {
    latitude: request.location.coordinates.latitude,
    longitude: request.location.coordinates.longitude,
  };
}
