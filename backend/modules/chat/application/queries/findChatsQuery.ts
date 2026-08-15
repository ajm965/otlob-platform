import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { ChatStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindChatsQuery extends QueryContract<StatusFilter<ChatStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
