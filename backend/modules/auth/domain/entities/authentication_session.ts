import { AuthenticationState } from '../enums/authentication_state';

export interface AuthenticationSessionProps {
  readonly phoneE164: string;
  readonly state: AuthenticationState;
  readonly userId: string | null;
  readonly fullName: string | null;
  readonly locale: 'ar' | 'en' | null;
  readonly primaryRole: 'customer' | 'technician' | 'company_operator' | null;
}

export class AuthenticationSession {
  public readonly phoneE164: string;
  public readonly state: AuthenticationState;
  public readonly userId: string | null;
  public readonly fullName: string | null;
  public readonly locale: 'ar' | 'en' | null;
  public readonly primaryRole: 'customer' | 'technician' | 'company_operator' | null;

  private constructor(props: AuthenticationSessionProps) {
    this.phoneE164 = props.phoneE164;
    this.state = props.state;
    this.userId = props.userId;
    this.fullName = props.fullName;
    this.locale = props.locale;
    this.primaryRole = props.primaryRole;
  }

  public static create(props: AuthenticationSessionProps): AuthenticationSession {
    return new AuthenticationSession(props);
  }
}
