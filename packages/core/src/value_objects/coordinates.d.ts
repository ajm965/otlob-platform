import { BaseValueObject } from '../base/base_value_object';
export declare class Coordinates extends BaseValueObject {
    readonly latitude: number;
    readonly longitude: number;
    private constructor();
    static create(latitude: number, longitude: number): Coordinates;
    protected get equalityComponents(): readonly unknown[];
}
//# sourceMappingURL=coordinates.d.ts.map