import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateAddressRequest, AddressResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateLocationUseCaseInput extends EntityIdDto {
  readonly payload: CreateAddressRequest;
}

export interface IUpdateLocationUseCase extends IUseCase<UpdateLocationUseCaseInput, AddressResponse> {}
