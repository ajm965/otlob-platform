import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Wallet } from '../entities/wallet';
import type { WalletId } from '../entities/wallet_id';
import type { WalletOwnerType } from '../enums/wallet_owner_type';

export interface WalletFilter extends StatusFilter<WalletOwnerType> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface IWalletRepository extends IRepository<Wallet, WalletId, WalletFilter, SortOptions> {}
