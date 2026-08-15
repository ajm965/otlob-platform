import { UniqueId } from './unique_id';

/**
 * Identity-bearing domain entity. No persistence or framework metadata.
 */
export abstract class BaseEntity<TId extends UniqueId = UniqueId> {
  protected constructor(public readonly id: TId) {}

  public equals(other: BaseEntity<TId> | null | undefined): boolean {
    if (other == null) {
      return false;
    }
    return this.id.equals(other.id);
  }
}
