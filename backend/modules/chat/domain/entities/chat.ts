import { AggregateRoot } from '@otlob/core';
import { ChatStatus } from '../enums/chat_status';
import { ChatId } from './chat_id';

export interface ChatProps {
  bookingId: string;
  participantUserIds: readonly string[];
  status: ChatStatus;
  marketId: string;
  countryCode: string;
}

export class Chat extends AggregateRoot<ChatId> {
  public readonly bookingId: string;
  public readonly participantUserIds: readonly string[];
  public readonly status: ChatStatus;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: ChatId, props: ChatProps) {
    super(id);
    this.bookingId = props.bookingId;
    this.participantUserIds = props.participantUserIds;
    this.status = props.status;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: ChatId, props: ChatProps): Chat {
    return new Chat(id, props);
  }
}
