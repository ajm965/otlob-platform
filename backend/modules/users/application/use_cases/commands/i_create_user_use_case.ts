import type { IUseCase } from '@otlob/core';
import type { CreateUserRequest, UserResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateUserUseCase extends IUseCase<CreateUserRequest, UserResponse> {}
