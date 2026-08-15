import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Chat } from '../entities/chat';
import type { ChatId } from '../entities/chat_id';
import type { ChatStatus } from '../enums/chat_status';

export interface ChatFilter extends StatusFilter<ChatStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface IChatRepository extends IRepository<Chat, ChatId, ChatFilter, SortOptions> {}
