import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { RequestResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetRequestUseCase extends IUseCase<EntityIdDto, RequestResponse> {}
