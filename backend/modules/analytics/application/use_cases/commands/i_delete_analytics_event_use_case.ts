import type { EntityIdDto, IUseCase } from '@otlob/core';

/** Output shape only; deletion behavior is intentionally absent. */
export interface DeleteAnalyticsEventUseCaseOutput extends EntityIdDto {}

export interface IDeleteAnalyticsEventUseCase extends IUseCase<EntityIdDto, DeleteAnalyticsEventUseCaseOutput> {}
