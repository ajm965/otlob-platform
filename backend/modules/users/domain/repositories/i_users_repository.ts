import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { User } from '../entities/user';
import type { UserId } from '../entities/user_id';
import type { UserStatus } from '../enums/user_status';

export interface UserFilter extends StatusFilter<UserStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface IUserRepository extends IRepository<User, UserId, UserFilter, SortOptions> {}
