import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateUserRequest, UserResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateUserUseCaseInput extends EntityIdDto {
  readonly payload: CreateUserRequest;
}

export interface IUpdateUserUseCase extends IUseCase<UpdateUserUseCaseInput, UserResponse> {}
