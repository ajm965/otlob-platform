import type { IUseCase } from '@otlob/core';
import type { CreateAttachmentRequest, AttachmentResponse } from '../../dto';

/** Contract only; no create behavior is implemented. */
export interface ICreateAttachmentUseCase extends IUseCase<CreateAttachmentRequest, AttachmentResponse> {}
