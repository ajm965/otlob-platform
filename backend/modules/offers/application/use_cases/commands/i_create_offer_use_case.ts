import type { IUseCase } from '@otlob/core';
import type { SubmitOfferRequest, OfferResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateOfferUseCase extends IUseCase<SubmitOfferRequest, OfferResponse> {}
