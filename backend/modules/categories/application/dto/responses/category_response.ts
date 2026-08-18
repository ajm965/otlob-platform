import type { EntityIdDto, MarketScopeDto } from '@otlob/core';

/** Customer catalog category projection. Fields map from Category + LocalizedLabel. */
export interface CategoryResponse extends EntityIdDto, MarketScopeDto {
  readonly nameAr: string;
  readonly nameEn: string;
  readonly isActive: boolean;
  readonly sortOrder: number;
}
