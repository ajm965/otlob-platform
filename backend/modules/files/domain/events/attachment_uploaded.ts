import { DomainEvent } from '@otlob/core';

export class AttachmentUploaded extends DomainEvent {
  public constructor(public readonly attachmentId: string) {
    super('attachment.uploaded');
  }
}
