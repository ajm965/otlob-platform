import assert from 'node:assert/strict';
import { test } from 'node:test';
import { AuthenticationSession, AuthenticationState } from '../../domain';
import { InMemoryAuthenticationRepository } from '../../infrastructure/repositories/in_memory_authentication_repository';

test('in-memory authentication repository saves and finds by phone and user id', async () => {
  const repository = new InMemoryAuthenticationRepository();
  const session = AuthenticationSession.create({
    phoneE164: '+966500000001',
    state: AuthenticationState.Authenticated,
    userId: 'user-1',
    fullName: 'Test User',
    locale: 'ar',
    primaryRole: 'customer',
  });

  await repository.save(session);

  const byPhone = await repository.findByPhone('+966500000001');
  const byUserId = await repository.findByUserId('user-1');
  assert.equal(byPhone?.userId, 'user-1');
  assert.equal(byUserId?.phoneE164, '+966500000001');
  assert.equal(await repository.findByPhone('+966500000099'), null);
});
