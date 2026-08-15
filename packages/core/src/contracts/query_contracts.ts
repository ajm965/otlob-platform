import type { DateRange, GeoPoint, Money } from '../value_objects';
import type { CursorPagination } from '../pagination';

export interface StatusFilter<TStatus extends string = string> {
  readonly statuses?: readonly TStatus[];
}

export interface DateRangeFilter {
  readonly range?: DateRange;
}

export interface LocationFilter {
  readonly center?: GeoPoint;
  readonly radiusKm?: number;
}

export interface PriceRangeFilter {
  readonly minimum?: Money;
  readonly maximum?: Money;
}

export interface RatingFilter {
  readonly minimumRating?: number;
  readonly maximumRating?: number;
}

/** Reuses core CursorPagination; no module-local pagination type is defined. */
export interface PaginationFilter {
  readonly pagination: CursorPagination;
}

/** Sorting contract; type-only to keep Core framework- and runtime-free. */
export type SortDirection = 'asc' | 'desc';

export interface SortField {
  readonly field: string;
}

export interface SortOptions extends SortField {
  readonly direction: SortDirection;
}

export interface QueryContract<TFilter = never, TSort = never> {
  readonly filter?: TFilter;
  readonly sort?: TSort;
}

export interface CommandContract {
  readonly commandId?: string;
}
