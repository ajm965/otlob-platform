import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { SavedAddress } from '../entities/saved_address';
import type { AddressId } from '../entities/address_id';
import type { AddressStatus } from '../enums/address_status';

export interface SavedAddressFilter extends StatusFilter<AddressStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface ILocationRepository extends IRepository<SavedAddress, AddressId, SavedAddressFilter, SortOptions> {}

/** Backward-compatible descriptive alias for the saved-address port. */
export type ISavedAddressRepository = ILocationRepository;
