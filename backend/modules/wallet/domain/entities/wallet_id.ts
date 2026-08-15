import { UniqueId } from '@otlob/core';

export class WalletId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): WalletId {
    return new WalletId(value);
  }
}
