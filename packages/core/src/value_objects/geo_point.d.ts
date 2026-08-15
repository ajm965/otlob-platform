import { BaseValueObject } from '../base/base_value_object';
import { Coordinates } from './coordinates';
/** Framework-agnostic geographic point (not a Firebase SDK type). */
export declare class GeoPoint extends BaseValueObject {
    readonly coordinates: Coordinates;
    private constructor();
    static fromCoordinates(coordinates: Coordinates): GeoPoint;
    static create(latitude: number, longitude: number): GeoPoint;
    protected get equalityComponents(): readonly unknown[];
}
//# sourceMappingURL=geo_point.d.ts.map