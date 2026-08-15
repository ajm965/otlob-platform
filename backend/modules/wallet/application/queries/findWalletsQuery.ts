import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { WalletOwnerType } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindWalletsQuery extends QueryContract<StatusFilter<WalletOwnerType>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
