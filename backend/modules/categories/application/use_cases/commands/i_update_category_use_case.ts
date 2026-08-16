import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateCategoryRequest, CategoryResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateCategoryUseCaseInput extends EntityIdDto {
  readonly payload: CreateCategoryRequest;
}

export interface IUpdateCategoryUseCase extends IUseCase<UpdateCategoryUseCaseInput, CategoryResponse> {}
