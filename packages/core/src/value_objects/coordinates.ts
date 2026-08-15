import { BaseValueObject } from '../base/base_value_object';

export class Coordinates extends BaseValueObject {
  private constructor(
    public readonly latitude: number,
    public readonly longitude: number,
  ) {
    super();
  }

  public static create(latitude: number, longitude: number): Coordinates {
    if (latitude < -90 || latitude > 90) {
      throw new Error('latitude out of range');
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error('longitude out of range');
    }
    return new Coordinates(latitude, longitude);
  }

  protected get equalityComponents(): readonly unknown[] {
    return [this.latitude, this.longitude];
  }
}
