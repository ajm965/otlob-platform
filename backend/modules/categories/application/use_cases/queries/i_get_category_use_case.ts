import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CategoryResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetCategoryUseCase extends IUseCase<EntityIdDto, CategoryResponse> {}
