/**
 * Equality-by-value foundation for value objects.
 */
export declare abstract class BaseValueObject {
    protected abstract get equalityComponents(): readonly unknown[];
    equals(other: BaseValueObject | null | undefined): boolean;
}
//# sourceMappingURL=base_value_object.d.ts.map