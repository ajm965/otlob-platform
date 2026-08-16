import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { NotificationResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchNotificationsUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchNotificationsUseCase extends IUseCase<SearchNotificationsUseCaseInput, CursorPageResponseDto<NotificationResponse>> {}
