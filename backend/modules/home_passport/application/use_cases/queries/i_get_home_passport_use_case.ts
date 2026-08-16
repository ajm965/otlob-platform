import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { HomePassportResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetHomePassportUseCase extends IUseCase<EntityIdDto, HomePassportResponse> {}
