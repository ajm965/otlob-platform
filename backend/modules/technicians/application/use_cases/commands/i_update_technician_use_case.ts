import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateTechnicianRequest, TechnicianResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateTechnicianUseCaseInput extends EntityIdDto {
  readonly payload: CreateTechnicianRequest;
}

export interface IUpdateTechnicianUseCase extends IUseCase<UpdateTechnicianUseCaseInput, TechnicianResponse> {}
