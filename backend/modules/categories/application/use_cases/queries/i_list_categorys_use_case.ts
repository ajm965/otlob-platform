import type { CursorPageResponseDto, IUseCase } from '@otlob/core';
import type { CategoryResponse, SearchCategoriesQueryDto } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListCategorysUseCase
  extends IUseCase<SearchCategoriesQueryDto, CursorPageResponseDto<CategoryResponse>> {}
