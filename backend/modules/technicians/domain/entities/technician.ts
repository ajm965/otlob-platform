import { AggregateRoot, GeoPoint } from '@otlob/core';
import { TechnicianStatus } from '../enums/technician_status';
import { VerificationStatus } from '../enums/verification_status';
import { ServiceRadiusKm } from '../value_objects/service_radius_km';
import { TechnicianId } from './technician_id';

export interface TechnicianProps {
  userId: string;
  displayName: string;
  status: TechnicianStatus;
  verificationStatus: VerificationStatus;
  serviceIds: readonly string[];
  location: GeoPoint | null;
  serviceRadius: ServiceRadiusKm | null;
  marketId: string;
  countryCode: string;
}

export class Technician extends AggregateRoot<TechnicianId> {
  public readonly userId: string;
  public readonly displayName: string;
  public readonly status: TechnicianStatus;
  public readonly verificationStatus: VerificationStatus;
  public readonly serviceIds: readonly string[];
  public readonly location: GeoPoint | null;
  public readonly serviceRadius: ServiceRadiusKm | null;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: TechnicianId, props: TechnicianProps) {
    super(id);
    this.userId = props.userId;
    this.displayName = props.displayName;
    this.status = props.status;
    this.verificationStatus = props.verificationStatus;
    this.serviceIds = props.serviceIds;
    this.location = props.location;
    this.serviceRadius = props.serviceRadius;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: TechnicianId, props: TechnicianProps): Technician {
    return new Technician(id, props);
  }
}
