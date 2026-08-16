import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { CreateAttachmentRequest, AttachmentResponse } from '../../dto';

/** Input shape only; no update behavior is implemented. */
export interface UpdateAttachmentUseCaseInput extends EntityIdDto {
  readonly payload: CreateAttachmentRequest;
}

export interface IUpdateAttachmentUseCase extends IUseCase<UpdateAttachmentUseCaseInput, AttachmentResponse> {}
