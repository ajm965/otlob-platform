import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { UserResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchUsersUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchUsersUseCase extends IUseCase<SearchUsersUseCaseInput, CursorPageResponseDto<UserResponse>> {}
