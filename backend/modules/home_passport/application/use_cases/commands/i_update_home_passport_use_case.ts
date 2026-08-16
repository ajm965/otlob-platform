import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateHomePassportRequest, HomePassportResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateHomePassportUseCaseInput extends EntityIdDto {
  readonly payload: CreateHomePassportRequest;
}

export interface IUpdateHomePassportUseCase extends IUseCase<UpdateHomePassportUseCaseInput, HomePassportResponse> {}
