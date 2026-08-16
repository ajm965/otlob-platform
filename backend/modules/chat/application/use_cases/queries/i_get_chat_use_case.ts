import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { ChatResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetChatUseCase extends IUseCase<EntityIdDto, ChatResponse> {}
