import assert from 'node:assert/strict';
import { test } from 'node:test';
import { AuthenticationFailure, AuthenticationSession, AuthenticationState } from '../../domain';
import { toCurrentUserResponse } from '../../application/mappers/authentication_mapper';

test('maps a complete session to the current-user DTO', () => {
  const session = AuthenticationSession.create({
    phoneE164: '+966500000001',
    state: AuthenticationState.Authenticated,
    userId: 'uid-1',
    fullName: 'Sara',
    locale: 'en',
    primaryRole: 'technician',
  });
  assert.deepEqual(toCurrentUserResponse(session), {
    id: 'uid-1',
    fullName: 'Sara',
    locale: 'en',
    primaryRole: 'technician',
  });
});

test('mapping fails when profile fields are missing', () => {
  const session = AuthenticationSession.create({
    phoneE164: '+966500000001',
    state: AuthenticationState.Authenticated,
    userId: 'uid-1',
    fullName: null,
    locale: 'ar',
    primaryRole: 'customer',
  });
  assert.throws(
    () => toCurrentUserResponse(session),
    (error: unknown) => error instanceof AuthenticationFailure && error.code === 'validation_failed',
  );
});
