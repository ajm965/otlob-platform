import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { BookingResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchBookingsUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchBookingsUseCase extends IUseCase<SearchBookingsUseCaseInput, CursorPageResponseDto<BookingResponse>> {}
