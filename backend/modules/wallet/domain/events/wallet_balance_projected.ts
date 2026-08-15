import { DomainEvent } from '@otlob/core';

export class WalletBalanceProjected extends DomainEvent {
  public constructor(public readonly walletId: string) {
    super('wallet.balance_projected');
  }
}
