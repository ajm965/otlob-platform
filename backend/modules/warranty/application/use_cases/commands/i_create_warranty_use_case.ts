import type { IUseCase } from '@otlob/core';
import type { CreateWarrantyRequest, WarrantyResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateWarrantyUseCase extends IUseCase<CreateWarrantyRequest, WarrantyResponse> {}
