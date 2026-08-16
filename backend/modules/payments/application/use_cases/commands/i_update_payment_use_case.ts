import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreatePaymentRequest, PaymentResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdatePaymentUseCaseInput extends EntityIdDto {
  readonly payload: CreatePaymentRequest;
}

export interface IUpdatePaymentUseCase extends IUseCase<UpdatePaymentUseCaseInput, PaymentResponse> {}
