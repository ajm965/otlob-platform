import type { IUseCase } from '@otlob/core';
import type { OpenDisputeRequest, DisputeResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateDisputeUseCase extends IUseCase<OpenDisputeRequest, DisputeResponse> {}
