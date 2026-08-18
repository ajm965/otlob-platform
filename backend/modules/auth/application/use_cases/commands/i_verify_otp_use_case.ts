import type { IUseCase } from '@otlob/core';
import type { VerifyOtpRequest, VerifyOtpResponse } from '../../dto';

export interface IVerifyOtpUseCase extends IUseCase<VerifyOtpRequest, VerifyOtpResponse> {}
