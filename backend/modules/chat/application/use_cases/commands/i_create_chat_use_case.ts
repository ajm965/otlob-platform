import type { IUseCase } from '@otlob/core';
import type { CreateChatRequest, ChatResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateChatUseCase extends IUseCase<CreateChatRequest, ChatResponse> {}
