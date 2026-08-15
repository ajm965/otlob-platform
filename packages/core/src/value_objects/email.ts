import { BaseValueObject } from '../base/base_value_object';

export class Email extends BaseValueObject {
  private constructor(public readonly value: string) {
    super();
  }

  public static create(raw: string): Email {
    const value = raw.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new Error('Invalid email format');
    }
    return new Email(value);
  }

  protected get equalityComponents(): readonly unknown[] {
    return [this.value];
  }
}
