import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { AnalyticsEventResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchAnalyticsEventsUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchAnalyticsEventsUseCase extends IUseCase<SearchAnalyticsEventsUseCaseInput, CursorPageResponseDto<AnalyticsEventResponse>> {}
