import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { PaymentResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListPaymentsUseCase extends IUseCase<QueryDto, CursorPageResponseDto<PaymentResponse>> {}
