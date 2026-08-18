import type { AuthenticationSession } from '../entities/authentication_session';

/** Offline/auth-adapter port. Persistence adapters belong in infrastructure only. */
export interface IAuthenticationRepository {
  save(session: AuthenticationSession): Promise<void>;
  findByPhone(phoneE164: string): Promise<AuthenticationSession | null>;
  findByUserId(userId: string): Promise<AuthenticationSession | null>;
}
