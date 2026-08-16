import type { IUseCase } from '@otlob/core';
import type { CreatePaymentRequest, PaymentResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreatePaymentUseCase extends IUseCase<CreatePaymentRequest, PaymentResponse> {}
