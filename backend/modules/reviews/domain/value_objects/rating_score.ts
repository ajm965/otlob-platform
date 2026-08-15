import { BaseValueObject } from '@otlob/core';

/** Overall rating 1–5. Domain-specific; not a core Money/Percentage duplicate. */
export class RatingScore extends BaseValueObject {
  private constructor(public readonly value: number) {
    super();
  }

  public static create(value: number): RatingScore {
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      throw new Error('RatingScore must be integer 1..5');
    }
    return new RatingScore(value);
  }

  protected get equalityComponents(): readonly unknown[] {
    return [this.value];
  }
}
