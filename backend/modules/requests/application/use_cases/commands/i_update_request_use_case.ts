import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateRequestRequest, RequestResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateRequestUseCaseInput extends EntityIdDto {
  readonly payload: CreateRequestRequest;
}

export interface IUpdateRequestUseCase extends IUseCase<UpdateRequestUseCaseInput, RequestResponse> {}
