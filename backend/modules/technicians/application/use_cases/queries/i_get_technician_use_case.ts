import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { TechnicianResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetTechnicianUseCase extends IUseCase<EntityIdDto, TechnicianResponse> {}
