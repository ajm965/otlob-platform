import { BaseValueObject } from '../base/base_value_object';
/** Percentage in basis points (0–10000 = 0%–100%) to avoid floats. */
export declare class Percentage extends BaseValueObject {
    readonly basisPoints: number;
    private constructor();
    static fromBasisPoints(basisPoints: number): Percentage;
    protected get equalityComponents(): readonly unknown[];
}
//# sourceMappingURL=percentage.d.ts.map