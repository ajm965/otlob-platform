import { AggregateRoot, Money } from '@otlob/core';
import { WalletOwnerType } from '../enums/wallet_owner_type';
import { WalletId } from './wallet_id';

export interface WalletProps {
  ownerType: WalletOwnerType;
  ownerId: string;
  pending: Money;
  available: Money;
  held: Money;
  paid: Money;
  marketId: string;
  countryCode: string;
}

/** Provider balance projection aggregate (not ledger authority). */
export class Wallet extends AggregateRoot<WalletId> {
  public readonly ownerType: WalletOwnerType;
  public readonly ownerId: string;
  public readonly pending: Money;
  public readonly available: Money;
  public readonly held: Money;
  public readonly paid: Money;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: WalletId, props: WalletProps) {
    super(id);
    this.ownerType = props.ownerType;
    this.ownerId = props.ownerId;
    this.pending = props.pending;
    this.available = props.available;
    this.held = props.held;
    this.paid = props.paid;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: WalletId, props: WalletProps): Wallet {
    return new Wallet(id, props);
  }
}
