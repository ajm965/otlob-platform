import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteNotificationUseCaseOutput extends EntityIdDto {}

export interface IDeleteNotificationUseCase extends IUseCase<EntityIdDto, DeleteNotificationUseCaseOutput> {}
