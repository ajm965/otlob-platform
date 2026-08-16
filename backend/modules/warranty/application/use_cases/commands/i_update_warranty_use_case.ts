import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateWarrantyRequest, WarrantyResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateWarrantyUseCaseInput extends EntityIdDto {
  readonly payload: CreateWarrantyRequest;
}

export interface IUpdateWarrantyUseCase extends IUseCase<UpdateWarrantyUseCaseInput, WarrantyResponse> {}
