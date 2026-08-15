import { UniqueId } from './unique_id';
/**
 * Identity-bearing domain entity. No persistence or framework metadata.
 */
export declare abstract class BaseEntity<TId extends UniqueId = UniqueId> {
    readonly id: TId;
    protected constructor(id: TId);
    equals(other: BaseEntity<TId> | null | undefined): boolean;
}
//# sourceMappingURL=base_entity.d.ts.map