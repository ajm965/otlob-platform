import { UniqueId } from './unique_id';

/**
 * Generic domain event envelope. Feature payloads belong in module events.
 */
export abstract class DomainEvent {
  public readonly eventId: UniqueId;
  public readonly occurredAt: Date;
  public readonly eventType: string;

  protected constructor(eventType: string, eventId?: UniqueId, occurredAt?: Date) {
    this.eventType = eventType;
    this.eventId = eventId ?? new UniqueId(`evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`);
    this.occurredAt = occurredAt ?? new Date();
  }
}
