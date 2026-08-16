import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CompanyResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetCompanyUseCase extends IUseCase<EntityIdDto, CompanyResponse> {}
