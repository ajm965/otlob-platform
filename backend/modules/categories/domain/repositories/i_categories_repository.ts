import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Category } from '../entities/category';
import type { CategoryId } from '../entities/category_id';
import type { CategoryStatus } from '../enums/category_status';

export interface CategoryFilter extends StatusFilter<CategoryStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface ICategoryRepository extends IRepository<Category, CategoryId, CategoryFilter, SortOptions> {}
