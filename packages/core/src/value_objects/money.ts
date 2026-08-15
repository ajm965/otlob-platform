import { BaseValueObject } from '../base/base_value_object';

/**
 * Integer minor-unit money (e.g. halalas) + ISO currency code.
 */
export class Money extends BaseValueObject {
  private constructor(
    public readonly amountMinor: number,
    public readonly currency: string,
  ) {
    super();
  }

  public static of(amountMinor: number, currency: string): Money {
    if (!Number.isInteger(amountMinor)) {
      throw new Error('Money.amountMinor must be an integer');
    }
    const code = currency.trim().toUpperCase();
    if (code.length !== 3) {
      throw new Error('Money.currency must be a 3-letter ISO code');
    }
    return new Money(amountMinor, code);
  }

  protected get equalityComponents(): readonly unknown[] {
    return [this.amountMinor, this.currency];
  }
}
