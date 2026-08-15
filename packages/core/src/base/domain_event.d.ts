import { UniqueId } from './unique_id';
/**
 * Generic domain event envelope. Feature payloads belong in module events.
 */
export declare abstract class DomainEvent {
    readonly eventId: UniqueId;
    readonly occurredAt: Date;
    readonly eventType: string;
    protected constructor(eventType: string, eventId?: UniqueId, occurredAt?: Date);
}
//# sourceMappingURL=domain_event.d.ts.map