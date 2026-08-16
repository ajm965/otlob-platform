import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { ServiceResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetServiceUseCase extends IUseCase<EntityIdDto, ServiceResponse> {}
