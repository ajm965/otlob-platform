import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateServiceRequest, ServiceResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateServiceUseCaseInput extends EntityIdDto {
  readonly payload: CreateServiceRequest;
}

export interface IUpdateServiceUseCase extends IUseCase<UpdateServiceUseCaseInput, ServiceResponse> {}
