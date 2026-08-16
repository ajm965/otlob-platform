import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { NotificationResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListNotificationsUseCase extends IUseCase<QueryDto, CursorPageResponseDto<NotificationResponse>> {}
