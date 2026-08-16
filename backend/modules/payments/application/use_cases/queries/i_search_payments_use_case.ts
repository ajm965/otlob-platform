import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { PaymentResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchPaymentsUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchPaymentsUseCase extends IUseCase<SearchPaymentsUseCaseInput, CursorPageResponseDto<PaymentResponse>> {}
