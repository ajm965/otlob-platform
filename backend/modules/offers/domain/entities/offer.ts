import { AggregateRoot, Money } from '@otlob/core';
import { OfferStatus } from '../enums/offer_status';
import { ProviderType } from '../enums/provider_type';
import { OfferId } from './offer_id';

export interface OfferProps {
  requestId: string;
  providerType: ProviderType;
  providerId: string;
  status: OfferStatus;
  price: Money;
  etaMinutes: number | null;
  message: string | null;
  marketId: string;
  countryCode: string;
}

export class Offer extends AggregateRoot<OfferId> {
  public readonly requestId: string;
  public readonly providerType: ProviderType;
  public readonly providerId: string;
  public readonly status: OfferStatus;
  public readonly price: Money;
  public readonly etaMinutes: number | null;
  public readonly message: string | null;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: OfferId, props: OfferProps) {
    super(id);
    this.requestId = props.requestId;
    this.providerType = props.providerType;
    this.providerId = props.providerId;
    this.status = props.status;
    this.price = props.price;
    this.etaMinutes = props.etaMinutes;
    this.message = props.message;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: OfferId, props: OfferProps): Offer {
    return new Offer(id, props);
  }
}
