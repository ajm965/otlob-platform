import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { HomePassport } from '../entities/home_passport';
import type { HomePassportId } from '../entities/home_passport_id';
import type { HomePassportStatus } from '../enums/home_passport_status';

export interface HomePassportFilter extends StatusFilter<HomePassportStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface IHomePassportRepository extends IRepository<HomePassport, HomePassportId, HomePassportFilter, SortOptions> {}
