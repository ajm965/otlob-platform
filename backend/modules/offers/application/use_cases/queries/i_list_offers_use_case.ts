import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { OfferResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListOffersUseCase extends IUseCase<QueryDto, CursorPageResponseDto<OfferResponse>> {}
