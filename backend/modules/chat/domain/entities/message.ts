import { AggregateRoot } from '@otlob/core';
import { MessageType } from '../enums/message_type';
import { MessageId } from './message_id';

export interface MessageProps {
  chatId: string;
  senderUserId: string;
  type: MessageType;
  body: string | null;
  attachmentId: string | null;
  marketId: string;
  countryCode: string;
}

export class Message extends AggregateRoot<MessageId> {
  public readonly chatId: string;
  public readonly senderUserId: string;
  public readonly type: MessageType;
  public readonly body: string | null;
  public readonly attachmentId: string | null;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: MessageId, props: MessageProps) {
    super(id);
    this.chatId = props.chatId;
    this.senderUserId = props.senderUserId;
    this.type = props.type;
    this.body = props.body;
    this.attachmentId = props.attachmentId;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: MessageId, props: MessageProps): Message {
    return new Message(id, props);
  }
}
