import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { UserResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetUserUseCase extends IUseCase<EntityIdDto, UserResponse> {}
