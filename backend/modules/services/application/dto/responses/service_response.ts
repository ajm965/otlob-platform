import type { EntityIdDto, MarketScopeDto } from '@otlob/core';

/** Customer catalog service projection. Fields map from Service + LocalizedLabel. */
export interface ServiceResponse extends EntityIdDto, MarketScopeDto {
  readonly categoryId: string;
  readonly nameAr: string;
  readonly nameEn: string;
  readonly isActive: boolean;
}
