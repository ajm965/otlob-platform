import assert from 'node:assert/strict';
import { test } from 'node:test';
import { AuthenticationFailure, AuthenticationState } from '../../domain';
import { InMemoryAuthenticationRepository } from '../../infrastructure/repositories/in_memory_authentication_repository';
import { StartAuthenticationUseCase } from '../../application/use_cases/commands/start_authentication_use_case';
import { VerifyOtpUseCase } from '../../application/use_cases/commands/verify_otp_use_case';
import { CompleteRegistrationUseCase } from '../../application/use_cases/commands/complete_registration_use_case';

test('start, verify, and complete registration use cases construct and execute against the mock repository', async () => {
  const repository = new InMemoryAuthenticationRepository();
  const start = new StartAuthenticationUseCase(repository);
  const verify = new VerifyOtpUseCase(repository);
  const complete = new CompleteRegistrationUseCase(repository);

  await start.execute({ phone: '+966500000001' });
  const started = await repository.findByPhone('+966500000001');
  assert.equal(started?.state, AuthenticationState.Unauthenticated);

  const verified = await verify.execute({ phone: '+966500000001', otp: 'any' });
  assert.equal(verified.userId, 'offline:+966500000001');

  const profile = await complete.execute({
    id: verified.userId,
    payload: { fullName: 'نورة', locale: 'ar', primaryRole: 'customer' },
  });
  assert.deepEqual(profile, {
    id: 'offline:+966500000001',
    fullName: 'نورة',
    locale: 'ar',
    primaryRole: 'customer',
  });
});

test('start authentication rejects invalid phone format', async () => {
  const start = new StartAuthenticationUseCase(new InMemoryAuthenticationRepository());
  await assert.rejects(
    () => start.execute({ phone: '0500000001' }),
    (error: unknown) => {
      assert.ok(error instanceof AuthenticationFailure);
      assert.equal(error.code, 'validation_failed');
      return true;
    },
  );
});

test('verify otp rejects missing otp', async () => {
  const verify = new VerifyOtpUseCase(new InMemoryAuthenticationRepository());
  await assert.rejects(
    () => verify.execute({ phone: '+966500000001', otp: '  ' }),
    (error: unknown) => {
      assert.ok(error instanceof AuthenticationFailure);
      assert.equal(error.code, 'validation_failed');
      return true;
    },
  );
});
