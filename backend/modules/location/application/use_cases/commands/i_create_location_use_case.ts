import type { IUseCase } from '@otlob/core';
import type { CreateAddressRequest, AddressResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateLocationUseCase extends IUseCase<CreateAddressRequest, AddressResponse> {}
