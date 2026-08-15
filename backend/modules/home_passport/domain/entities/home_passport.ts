import { AggregateRoot } from '@otlob/core';
import { HomePassportStatus } from '../enums/home_passport_status';
import { HomePassportId } from './home_passport_id';

export interface HomePassportProps {
  customerId: string;
  addressId: string | null;
  label: string;
  status: HomePassportStatus;
  marketId: string;
  countryCode: string;
}

export class HomePassport extends AggregateRoot<HomePassportId> {
  public readonly customerId: string;
  public readonly addressId: string | null;
  public readonly label: string;
  public readonly status: HomePassportStatus;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: HomePassportId, props: HomePassportProps) {
    super(id);
    this.customerId = props.customerId;
    this.addressId = props.addressId;
    this.label = props.label;
    this.status = props.status;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: HomePassportId, props: HomePassportProps): HomePassport {
    return new HomePassport(id, props);
  }
}
