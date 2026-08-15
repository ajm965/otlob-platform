import { BaseValueObject } from '../base/base_value_object';

/** Percentage in basis points (0–10000 = 0%–100%) to avoid floats. */
export class Percentage extends BaseValueObject {
  private constructor(public readonly basisPoints: number) {
    super();
  }

  public static fromBasisPoints(basisPoints: number): Percentage {
    if (!Number.isInteger(basisPoints) || basisPoints < 0 || basisPoints > 10_000) {
      throw new Error('Percentage basisPoints must be 0..10000');
    }
    return new Percentage(basisPoints);
  }

  protected get equalityComponents(): readonly unknown[] {
    return [this.basisPoints];
  }
}
