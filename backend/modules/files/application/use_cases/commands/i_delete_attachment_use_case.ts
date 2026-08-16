import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteAttachmentUseCaseOutput extends EntityIdDto {}

export interface IDeleteAttachmentUseCase extends IUseCase<EntityIdDto, DeleteAttachmentUseCaseOutput> {}
