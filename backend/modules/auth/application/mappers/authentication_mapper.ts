import { AuthenticationFailure, type AuthenticationSession } from '../../domain';
import type { CurrentUserResponse } from '../dto';

export function toCurrentUserResponse(session: AuthenticationSession): CurrentUserResponse {
  if (
    session.userId === null ||
    session.fullName === null ||
    session.locale === null ||
    session.primaryRole === null
  ) {
    throw new AuthenticationFailure('validation_failed', 'Required field missing', {
      fields: [{ field: 'profile', code: 'required' }],
    });
  }
  return {
    id: session.userId,
    fullName: session.fullName,
    locale: session.locale,
    primaryRole: session.primaryRole,
  };
}
