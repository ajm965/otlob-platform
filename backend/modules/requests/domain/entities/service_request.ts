import { AggregateRoot, DateRange, GeoPoint } from '@otlob/core';
import { RequestStatus } from '../enums/request_status';
import { RequestId } from './request_id';

export interface ServiceRequestProps {
  customerId: string;
  serviceId: string;
  status: RequestStatus;
  description: string;
  location: GeoPoint | null;
  preferredWindow: DateRange | null;
  acceptedOfferId: string | null;
  bookingId: string | null;
  marketId: string;
  countryCode: string;
}

/** Marketplace service request aggregate (collection name: requests). */
export class ServiceRequest extends AggregateRoot<RequestId> {
  public readonly customerId: string;
  public readonly serviceId: string;
  public readonly status: RequestStatus;
  public readonly description: string;
  public readonly location: GeoPoint | null;
  public readonly preferredWindow: DateRange | null;
  public readonly acceptedOfferId: string | null;
  public readonly bookingId: string | null;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: RequestId, props: ServiceRequestProps) {
    super(id);
    this.customerId = props.customerId;
    this.serviceId = props.serviceId;
    this.status = props.status;
    this.description = props.description;
    this.location = props.location;
    this.preferredWindow = props.preferredWindow;
    this.acceptedOfferId = props.acceptedOfferId;
    this.bookingId = props.bookingId;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: RequestId, props: ServiceRequestProps): ServiceRequest {
    return new ServiceRequest(id, props);
  }
}
