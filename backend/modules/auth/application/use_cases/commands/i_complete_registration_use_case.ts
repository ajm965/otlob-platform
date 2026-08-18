import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CompleteRegistrationRequest, CurrentUserResponse } from '../../dto';

export interface CompleteRegistrationUseCaseInput extends EntityIdDto {
  readonly payload: CompleteRegistrationRequest;
}

export interface ICompleteRegistrationUseCase
  extends IUseCase<CompleteRegistrationUseCaseInput, CurrentUserResponse> {}
