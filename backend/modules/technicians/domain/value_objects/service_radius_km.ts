import { BaseValueObject } from '@otlob/core';

export class ServiceRadiusKm extends BaseValueObject {
  private constructor(public readonly kilometers: number) {
    super();
  }

  public static create(kilometers: number): ServiceRadiusKm {
    if (!Number.isFinite(kilometers) || kilometers <= 0) {
      throw new Error('ServiceRadiusKm must be > 0');
    }
    return new ServiceRadiusKm(kilometers);
  }

  protected get equalityComponents(): readonly unknown[] {
    return [this.kilometers];
  }
}
