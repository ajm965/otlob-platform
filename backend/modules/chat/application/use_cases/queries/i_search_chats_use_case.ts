import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { ChatResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchChatsUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchChatsUseCase extends IUseCase<SearchChatsUseCaseInput, CursorPageResponseDto<ChatResponse>> {}
