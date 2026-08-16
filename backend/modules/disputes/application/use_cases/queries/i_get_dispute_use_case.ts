import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { DisputeResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetDisputeUseCase extends IUseCase<EntityIdDto, DisputeResponse> {}
