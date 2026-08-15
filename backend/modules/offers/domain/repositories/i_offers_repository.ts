import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Offer } from '../entities/offer';
import type { OfferId } from '../entities/offer_id';
import type { OfferStatus } from '../enums/offer_status';

export interface OfferFilter extends StatusFilter<OfferStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface IOfferRepository extends IRepository<Offer, OfferId, OfferFilter, SortOptions> {}
