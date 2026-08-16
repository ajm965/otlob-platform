import type { IUseCase } from '@otlob/core';
import type { CreateHomePassportRequest, HomePassportResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateHomePassportUseCase extends IUseCase<CreateHomePassportRequest, HomePassportResponse> {}
