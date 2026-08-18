import {
  AuthenticationSession,
  AuthenticationState,
  type IAuthenticationRepository,
} from '../../../domain';
import type { StartAuthenticationRequest } from '../../dto';
import { parsePhone, requireTrimmed } from '../../validators/authentication_input';
import type { IStartAuthenticationUseCase } from './i_start_authentication_use_case';

export class StartAuthenticationUseCase implements IStartAuthenticationUseCase {
  public constructor(private readonly authenticationRepository: IAuthenticationRepository) {}

  public async execute(input: StartAuthenticationRequest): Promise<void> {
    const phone = parsePhone(requireTrimmed(input.phone, 'phone'));
    const existing = await this.authenticationRepository.findByPhone(phone.e164);
    await this.authenticationRepository.save(
      AuthenticationSession.create({
        phoneE164: phone.e164,
        state: existing?.state ?? AuthenticationState.Unauthenticated,
        userId: existing?.userId ?? null,
        fullName: existing?.fullName ?? null,
        locale: existing?.locale ?? null,
        primaryRole: existing?.primaryRole ?? null,
      }),
    );
  }
}
