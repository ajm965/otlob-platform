import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { CategoryResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListCategorysUseCase extends IUseCase<QueryDto, CursorPageResponseDto<CategoryResponse>> {}
