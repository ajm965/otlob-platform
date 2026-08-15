import { BaseEntity } from './base_entity';
import { DomainEvent } from './domain_event';
import { UniqueId } from './unique_id';

/**
 * Aggregate root with domain-event collection only (no business workflows).
 */
export abstract class AggregateRoot<TId extends UniqueId = UniqueId> extends BaseEntity<TId> {
  private readonly domainEvents: DomainEvent[] = [];

  protected record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): readonly DomainEvent[] {
    const copy = [...this.domainEvents];
    this.domainEvents.length = 0;
    return copy;
  }
}
