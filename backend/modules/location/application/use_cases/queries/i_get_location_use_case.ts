import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { AddressResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetLocationUseCase extends IUseCase<EntityIdDto, AddressResponse> {}
