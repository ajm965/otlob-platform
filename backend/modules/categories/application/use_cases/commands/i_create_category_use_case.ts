import type { IUseCase } from '@otlob/core';
import type { CreateCategoryRequest, CategoryResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateCategoryUseCase extends IUseCase<CreateCategoryRequest, CategoryResponse> {}
