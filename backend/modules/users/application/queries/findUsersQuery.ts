import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { UserStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindUsersQuery extends QueryContract<StatusFilter<UserStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
