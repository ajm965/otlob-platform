import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { AttachmentResponse } from '../../dto';

/** Contract only; no listing behavior is implemented. */
export interface IListAttachmentsUseCase extends IUseCase<QueryDto, CursorPageResponseDto<AttachmentResponse>> {}
