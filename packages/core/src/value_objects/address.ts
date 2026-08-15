import { BaseValueObject } from '../base/base_value_object';

/**
 * Postal address value object (not the persisted Address aggregate).
 */
export class Address extends BaseValueObject {
  private constructor(
    public readonly line1: string,
    public readonly line2: string | null,
    public readonly city: string,
    public readonly region: string | null,
    public readonly postalCode: string | null,
    public readonly countryCode: string,
  ) {
    super();
  }

  public static create(input: {
    line1: string;
    line2?: string | null;
    city: string;
    region?: string | null;
    postalCode?: string | null;
    countryCode: string;
  }): Address {
    const countryCode = input.countryCode.trim().toUpperCase();
    if (countryCode.length !== 2) {
      throw new Error('countryCode must be ISO 3166-1 alpha-2');
    }
    if (input.line1.trim().length === 0 || input.city.trim().length === 0) {
      throw new Error('line1 and city are required');
    }
    return new Address(
      input.line1.trim(),
      input.line2?.trim() ?? null,
      input.city.trim(),
      input.region?.trim() ?? null,
      input.postalCode?.trim() ?? null,
      countryCode,
    );
  }

  protected get equalityComponents(): readonly unknown[] {
    return [
      this.line1,
      this.line2,
      this.city,
      this.region,
      this.postalCode,
      this.countryCode,
    ];
  }
}
