import {
  type AuthenticationSession,
  type IAuthenticationRepository,
} from '../../domain';

export class InMemoryAuthenticationRepository implements IAuthenticationRepository {
  private readonly byPhone = new Map<string, AuthenticationSession>();
  private readonly byUserId = new Map<string, AuthenticationSession>();

  public async save(session: AuthenticationSession): Promise<void> {
    if (session.phoneE164.length > 0) {
      this.byPhone.set(session.phoneE164, session);
    }
    if (session.userId !== null) {
      this.byUserId.set(session.userId, session);
    }
  }

  public async findByPhone(phoneE164: string): Promise<AuthenticationSession | null> {
    return this.byPhone.get(phoneE164) ?? null;
  }

  public async findByUserId(userId: string): Promise<AuthenticationSession | null> {
    return this.byUserId.get(userId) ?? null;
  }
}
