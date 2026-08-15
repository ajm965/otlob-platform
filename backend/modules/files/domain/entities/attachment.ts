import { AggregateRoot } from '@otlob/core';
import { AttachmentPurpose } from '../enums/attachment_purpose';
import { AttachmentStatus } from '../enums/attachment_status';
import { ContentType } from '../value_objects/content_type';
import { AttachmentId } from './attachment_id';

export interface AttachmentProps {
  ownerUserId: string;
  purpose: AttachmentPurpose;
  status: AttachmentStatus;
  contentType: ContentType;
  storageKey: string;
  byteSize: number;
  marketId: string;
  countryCode: string;
}

export class Attachment extends AggregateRoot<AttachmentId> {
  public readonly ownerUserId: string;
  public readonly purpose: AttachmentPurpose;
  public readonly status: AttachmentStatus;
  public readonly contentType: ContentType;
  public readonly storageKey: string;
  public readonly byteSize: number;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: AttachmentId, props: AttachmentProps) {
    super(id);
    this.ownerUserId = props.ownerUserId;
    this.purpose = props.purpose;
    this.status = props.status;
    this.contentType = props.contentType;
    this.storageKey = props.storageKey;
    this.byteSize = props.byteSize;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: AttachmentId, props: AttachmentProps): Attachment {
    return new Attachment(id, props);
  }
}
