import type { IUseCase } from '@otlob/core';
import type { StartAuthenticationRequest } from '../../dto';

export interface IStartAuthenticationUseCase extends IUseCase<StartAuthenticationRequest, void> {}
