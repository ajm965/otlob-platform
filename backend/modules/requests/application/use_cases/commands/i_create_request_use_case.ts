import type { IUseCase } from '@otlob/core';
import type { CreateRequestRequest, RequestResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateRequestUseCase extends IUseCase<CreateRequestRequest, RequestResponse> {}
