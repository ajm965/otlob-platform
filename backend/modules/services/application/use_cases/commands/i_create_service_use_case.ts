import type { IUseCase } from '@otlob/core';
import type { CreateServiceRequest, ServiceResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateServiceUseCase extends IUseCase<CreateServiceRequest, ServiceResponse> {}
