import type { IUseCase } from '@otlob/core';
import type { CreateCompanyRequest, CompanyResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateCompanyUseCase extends IUseCase<CreateCompanyRequest, CompanyResponse> {}
