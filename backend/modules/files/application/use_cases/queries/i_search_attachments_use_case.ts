import type { CursorPageResponseDto, IUseCase, QueryDto } from '@otlob/core';
import type { AttachmentResponse } from '../../dto';

/** Query data shape only; no search behavior is implemented. */
export interface SearchAttachmentsUseCaseInput extends QueryDto {
  readonly search: string;
}

export interface ISearchAttachmentsUseCase extends IUseCase<SearchAttachmentsUseCaseInput, CursorPageResponseDto<AttachmentResponse>> {}
