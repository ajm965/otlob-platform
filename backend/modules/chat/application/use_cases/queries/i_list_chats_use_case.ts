import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { ChatResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListChatsUseCase extends IUseCase<QueryDto, CursorPageResponseDto<ChatResponse>> {}
