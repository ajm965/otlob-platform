import { AggregateRoot, Email, Phone } from '@otlob/core';
import { GlobalRole } from '../enums/global_role';
import { UserStatus } from '../enums/user_status';
import { UserId } from './user_id';

export interface UserProps {
  roles: readonly GlobalRole[];
  primaryRole: GlobalRole;
  fullName: string;
  email: Email | null;
  phone: Phone | null;
  locale: 'ar' | 'en';
  status: UserStatus;
  marketId: string;
  countryCode: string;
  authorizationVersion: number;
}

/** Pure user aggregate — no identity-provider coupling. */
export class User extends AggregateRoot<UserId> {
  public readonly roles: readonly GlobalRole[];
  public readonly primaryRole: GlobalRole;
  public readonly fullName: string;
  public readonly email: Email | null;
  public readonly phone: Phone | null;
  public readonly locale: 'ar' | 'en';
  public readonly status: UserStatus;
  public readonly marketId: string;
  public readonly countryCode: string;
  public readonly authorizationVersion: number;

  private constructor(id: UserId, props: UserProps) {
    super(id);
    this.roles = props.roles;
    this.primaryRole = props.primaryRole;
    this.fullName = props.fullName;
    this.email = props.email;
    this.phone = props.phone;
    this.locale = props.locale;
    this.status = props.status;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
    this.authorizationVersion = props.authorizationVersion;
  }

  public static create(id: UserId, props: UserProps): User {
    return new User(id, props);
  }
}
