import type { MarketScopeDto } from '@otlob/core';

/** Input shape only; validation and transformation are intentionally absent. */
export interface CreateWalletRequest extends MarketScopeDto {
  readonly id?: string;
}
