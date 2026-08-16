import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { SubscriptionResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchSubscriptionsUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchSubscriptionsUseCase extends IUseCase<SearchSubscriptionsUseCaseInput, CursorPageResponseDto<SubscriptionResponse>> {}
