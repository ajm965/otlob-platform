import {
  AuthenticationSession,
  AuthenticationState,
  type IAuthenticationRepository,
} from '../../../domain';
import type { VerifyOtpRequest, VerifyOtpResponse } from '../../dto';
import { parsePhone, requireTrimmed } from '../../validators/authentication_input';
import type { IVerifyOtpUseCase } from './i_verify_otp_use_case';

export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  public constructor(private readonly authenticationRepository: IAuthenticationRepository) {}

  public async execute(input: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    const phone = parsePhone(requireTrimmed(input.phone, 'phone'));
    requireTrimmed(input.otp, 'otp');
    const existing = await this.authenticationRepository.findByPhone(phone.e164);
    const userId = existing?.userId ?? `offline:${phone.e164}`;
    await this.authenticationRepository.save(
      AuthenticationSession.create({
        phoneE164: phone.e164,
        state: AuthenticationState.Authenticated,
        userId,
        fullName: existing?.fullName ?? null,
        locale: existing?.locale ?? null,
        primaryRole: existing?.primaryRole ?? null,
      }),
    );
    return { userId };
  }
}
