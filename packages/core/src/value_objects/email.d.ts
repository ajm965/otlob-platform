import { BaseValueObject } from '../base/base_value_object';
export declare class Email extends BaseValueObject {
    readonly value: string;
    private constructor();
    static create(raw: string): Email;
    protected get equalityComponents(): readonly unknown[];
}
//# sourceMappingURL=email.d.ts.map