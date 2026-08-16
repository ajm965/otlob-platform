import type { IUseCase } from '@otlob/core';
import type { CreateTechnicianRequest, TechnicianResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateTechnicianUseCase extends IUseCase<CreateTechnicianRequest, TechnicianResponse> {}
