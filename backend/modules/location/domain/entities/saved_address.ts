import { Address, AggregateRoot, GeoPoint } from '@otlob/core';
import { AddressStatus } from '../enums/address_status';
import { AddressId } from './address_id';

export interface SavedAddressProps {
  userId: string;
  label: string;
  postal: Address;
  location: GeoPoint | null;
  isDefault: boolean;
  status: AddressStatus;
  marketId: string;
  countryCode: string;
}

/**
 * Persisted customer address aggregate.
 * Postal fields reuse core `Address` value object — not duplicated.
 */
export class SavedAddress extends AggregateRoot<AddressId> {
  public readonly userId: string;
  public readonly label: string;
  public readonly postal: Address;
  public readonly location: GeoPoint | null;
  public readonly isDefault: boolean;
  public readonly status: AddressStatus;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: AddressId, props: SavedAddressProps) {
    super(id);
    this.userId = props.userId;
    this.label = props.label;
    this.postal = props.postal;
    this.location = props.location;
    this.isDefault = props.isDefault;
    this.status = props.status;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: AddressId, props: SavedAddressProps): SavedAddress {
    return new SavedAddress(id, props);
  }
}
