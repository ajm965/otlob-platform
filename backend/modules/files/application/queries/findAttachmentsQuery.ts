import type { QueryContract, SortOptions, StatusFilter } from '@otlob/core';
import type { AttachmentStatus } from '../../domain';

/** Query shape only; no query execution or transport concerns. */
export interface FindAttachmentsQuery extends QueryContract<StatusFilter<AttachmentStatus>, SortOptions> {
  readonly marketId?: string;
  readonly countryCode?: string;
}
