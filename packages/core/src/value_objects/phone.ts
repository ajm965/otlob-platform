import { BaseValueObject } from '../base/base_value_object';

/** E.164 phone number value object. */
export class Phone extends BaseValueObject {
  private constructor(public readonly e164: string) {
    super();
  }

  public static create(e164: string): Phone {
    const value = e164.trim();
    if (!/^\+[1-9]\d{7,14}$/.test(value)) {
      throw new Error('Phone must be E.164 format');
    }
    return new Phone(value);
  }

  protected get equalityComponents(): readonly unknown[] {
    return [this.e164];
  }
}
