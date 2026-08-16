import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteChatUseCaseOutput extends EntityIdDto {}

export interface IDeleteChatUseCase extends IUseCase<EntityIdDto, DeleteChatUseCaseOutput> {}
