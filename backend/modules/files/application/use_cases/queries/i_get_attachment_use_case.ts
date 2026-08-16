import type { EntityIdDto, IUseCase } from '@otlob/core';
import type { AttachmentResponse } from '../../dto';

/** Contract only; no retrieval behavior is implemented. */
export interface IGetAttachmentUseCase extends IUseCase<EntityIdDto, AttachmentResponse> {}
