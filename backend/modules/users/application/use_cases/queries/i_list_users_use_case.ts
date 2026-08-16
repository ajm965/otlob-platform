import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { UserResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListUsersUseCase extends IUseCase<QueryDto, CursorPageResponseDto<UserResponse>> {}
