import { BaseValueObject } from '../base/base_value_object';

export class DateRange extends BaseValueObject {
  private constructor(
    public readonly start: Date,
    public readonly end: Date,
  ) {
    super();
  }

  public static create(start: Date, end: Date): DateRange {
    if (!(start instanceof Date) || !(end instanceof Date)) {
      throw new Error('DateRange requires Date instances');
    }
    if (end.getTime() < start.getTime()) {
      throw new Error('DateRange end must be >= start');
    }
    return new DateRange(start, end);
  }

  protected get equalityComponents(): readonly unknown[] {
    return [this.start.getTime(), this.end.getTime()];
  }
}
