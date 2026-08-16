import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { SubmitOfferRequest, OfferResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateOfferUseCaseInput extends EntityIdDto {
  readonly payload: SubmitOfferRequest;
}

export interface IUpdateOfferUseCase extends IUseCase<UpdateOfferUseCaseInput, OfferResponse> {}
