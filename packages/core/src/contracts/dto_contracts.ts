/** Shared DTO shapes. These are transport-neutral declarations only. */
export interface EntityIdDto {
  readonly id: string;
}

export interface MarketScopeDto {
  readonly marketId: string;
  readonly countryCode: string;
}

export interface MoneyDto {
  readonly amountMinor: number;
  readonly currency: string;
}

export interface DateRangeDto {
  readonly start: string;
  readonly end: string;
}

export interface CoordinatesDto {
  readonly latitude: number;
  readonly longitude: number;
}

export interface CursorPageRequestDto {
  readonly cursor?: string | null;
  readonly pageSize?: number;
}

export interface CursorPageResponseDto<T> {
  readonly items: readonly T[];
  readonly nextCursor: string | null;
  readonly hasMore: boolean;
}

export interface CommandDto {
  readonly commandId?: string;
}

export interface QueryDto extends CursorPageRequestDto {
  readonly search?: string;
}
