import type { QueryDto } from '@otlob/core';

/** Query data shape only; no query execution or datastore clause is defined. */
export interface FindNotificationsQueryDto extends QueryDto {
  readonly marketId?: string;
  readonly countryCode?: string;
}
