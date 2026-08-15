export interface OffsetPagination {
  readonly page: number;
  readonly pageSize: number;
}

export interface CursorPagination {
  readonly cursor: string | null;
  readonly pageSize: number;
}

export interface PageInfo {
  readonly nextCursor: string | null;
  readonly hasMore: boolean;
  readonly totalCount?: number;
}

export interface Page<T> {
  readonly items: readonly T[];
  readonly pageInfo: PageInfo;
}
