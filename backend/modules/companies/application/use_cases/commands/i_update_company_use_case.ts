import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateCompanyRequest, CompanyResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateCompanyUseCaseInput extends EntityIdDto {
  readonly payload: CreateCompanyRequest;
}

export interface IUpdateCompanyUseCase extends IUseCase<UpdateCompanyUseCaseInput, CompanyResponse> {}
