import { BaseEntity } from './base_entity';
import { DomainEvent } from './domain_event';
import { UniqueId } from './unique_id';
/**
 * Aggregate root with domain-event collection only (no business workflows).
 */
export declare abstract class AggregateRoot<TId extends UniqueId = UniqueId> extends BaseEntity<TId> {
    private readonly domainEvents;
    protected record(event: DomainEvent): void;
    pullDomainEvents(): readonly DomainEvent[];
}
//# sourceMappingURL=aggregate_root.d.ts.map