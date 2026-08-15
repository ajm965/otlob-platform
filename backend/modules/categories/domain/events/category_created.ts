import { DomainEvent } from '@otlob/core';

export class CategoryCreated extends DomainEvent {
  public constructor(public readonly categoryId: string) {
    super('category.created');
  }
}
