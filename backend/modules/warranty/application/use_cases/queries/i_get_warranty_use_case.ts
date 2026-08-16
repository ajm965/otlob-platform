import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { WarrantyResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetWarrantyUseCase extends IUseCase<EntityIdDto, WarrantyResponse> {}
