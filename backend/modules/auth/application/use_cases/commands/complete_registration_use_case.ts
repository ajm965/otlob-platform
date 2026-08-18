import {
  AuthenticationSession,
  AuthenticationState,
  type IAuthenticationRepository,
} from '../../../domain';
import type { CurrentUserResponse } from '../../dto';
import { toCurrentUserResponse } from '../../mappers/authentication_mapper';
import {
  requireLocale,
  requirePrimaryRole,
  requireTrimmed,
} from '../../validators/authentication_input';
import type {
  CompleteRegistrationUseCaseInput,
  ICompleteRegistrationUseCase,
} from './i_complete_registration_use_case';

export class CompleteRegistrationUseCase implements ICompleteRegistrationUseCase {
  public constructor(private readonly authenticationRepository: IAuthenticationRepository) {}

  public async execute(input: CompleteRegistrationUseCaseInput): Promise<CurrentUserResponse> {
    const userId = requireTrimmed(input.id, 'id');
    const fullName = requireTrimmed(input.payload.fullName, 'fullName');
    const locale = requireLocale(input.payload.locale);
    const primaryRole = requirePrimaryRole(input.payload.primaryRole);
    const existing = await this.authenticationRepository.findByUserId(userId);
    const session = AuthenticationSession.create({
      phoneE164: existing?.phoneE164 ?? '',
      state: existing?.state ?? AuthenticationState.Authenticated,
      userId,
      fullName,
      locale,
      primaryRole,
    });
    await this.authenticationRepository.save(session);
    return toCurrentUserResponse(session);
  }
}
