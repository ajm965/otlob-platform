import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Company } from '../entities/company';
import type { CompanyId } from '../entities/company_id';
import type { CompanyStatus } from '../enums/company_status';

export interface CompanyFilter extends StatusFilter<CompanyStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface ICompanyRepository extends IRepository<Company, CompanyId, CompanyFilter, SortOptions> {}
