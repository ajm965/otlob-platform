import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { OpenDisputeRequest, DisputeResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateDisputeUseCaseInput extends EntityIdDto {
  readonly payload: OpenDisputeRequest;
}

export interface IUpdateDisputeUseCase extends IUseCase<UpdateDisputeUseCaseInput, DisputeResponse> {}
