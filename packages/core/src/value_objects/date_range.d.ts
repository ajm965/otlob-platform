import { BaseValueObject } from '../base/base_value_object';
export declare class DateRange extends BaseValueObject {
    readonly start: Date;
    readonly end: Date;
    private constructor();
    static create(start: Date, end: Date): DateRange;
    protected get equalityComponents(): readonly unknown[];
}
//# sourceMappingURL=date_range.d.ts.map