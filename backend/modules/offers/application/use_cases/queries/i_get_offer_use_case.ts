import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { OfferResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetOfferUseCase extends IUseCase<EntityIdDto, OfferResponse> {}
