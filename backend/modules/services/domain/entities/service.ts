import { AggregateRoot, LocalizedLabel } from '@otlob/core';
import { ServiceStatus } from '../enums/service_status';
import { ServiceId } from './service_id';

export interface ServiceProps {
  categoryId: string;
  name: LocalizedLabel;
  status: ServiceStatus;
  marketId: string;
  countryCode: string;
}

export class Service extends AggregateRoot<ServiceId> {
  public readonly categoryId: string;
  public readonly name: LocalizedLabel;
  public readonly status: ServiceStatus;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: ServiceId, props: ServiceProps) {
    super(id);
    this.categoryId = props.categoryId;
    this.name = props.name;
    this.status = props.status;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: ServiceId, props: ServiceProps): Service {
    return new Service(id, props);
  }
}
