import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateChatRequest, ChatResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateChatUseCaseInput extends EntityIdDto {
  readonly payload: CreateChatRequest;
}

export interface IUpdateChatUseCase extends IUseCase<UpdateChatUseCaseInput, ChatResponse> {}
