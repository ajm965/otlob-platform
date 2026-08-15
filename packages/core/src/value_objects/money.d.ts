import { BaseValueObject } from '../base/base_value_object';
/**
 * Integer minor-unit money (e.g. halalas) + ISO currency code.
 */
export declare class Money extends BaseValueObject {
    readonly amountMinor: number;
    readonly currency: string;
    private constructor();
    static of(amountMinor: number, currency: string): Money;
    protected get equalityComponents(): readonly unknown[];
}
//# sourceMappingURL=money.d.ts.map