import { BaseValueObject } from '../base/base_value_object';
/** E.164 phone number value object. */
export declare class Phone extends BaseValueObject {
    readonly e164: string;
    private constructor();
    static create(e164: string): Phone;
    protected get equalityComponents(): readonly unknown[];
}
//# sourceMappingURL=phone.d.ts.map