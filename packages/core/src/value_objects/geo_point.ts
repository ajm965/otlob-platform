import { BaseValueObject } from '../base/base_value_object';
import { Coordinates } from './coordinates';

/** Framework-agnostic geographic point (no vendor SDK geo types). */
export class GeoPoint extends BaseValueObject {
  private constructor(public readonly coordinates: Coordinates) {
    super();
  }

  public static fromCoordinates(coordinates: Coordinates): GeoPoint {
    return new GeoPoint(coordinates);
  }

  public static create(latitude: number, longitude: number): GeoPoint {
    return new GeoPoint(Coordinates.create(latitude, longitude));
  }

  protected get equalityComponents(): readonly unknown[] {
    return [this.coordinates.latitude, this.coordinates.longitude];
  }
}
