import type { IRepository, SortOptions, StatusFilter } from '@otlob/core';
import type { Attachment } from '../entities/attachment';
import type { AttachmentId } from '../entities/attachment_id';
import type { AttachmentStatus } from '../enums/attachment_status';

export interface AttachmentFilter extends StatusFilter<AttachmentStatus> {
  readonly marketId?: string;
  readonly countryCode?: string;
}

/** Canonical persistence port; implementation belongs in infrastructure only. */
export interface IAttachmentRepository extends IRepository<Attachment, AttachmentId, AttachmentFilter, SortOptions> {}
