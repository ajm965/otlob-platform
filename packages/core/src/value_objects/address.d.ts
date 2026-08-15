import { BaseValueObject } from '../base/base_value_object';
/**
 * Postal address value object (not the persisted Address aggregate).
 */
export declare class Address extends BaseValueObject {
    readonly line1: string;
    readonly line2: string | null;
    readonly city: string;
    readonly region: string | null;
    readonly postalCode: string | null;
    readonly countryCode: string;
    private constructor();
    static create(input: {
        line1: string;
        line2?: string | null;
        city: string;
        region?: string | null;
        postalCode?: string | null;
        countryCode: string;
    }): Address;
    protected get equalityComponents(): readonly unknown[];
}
//# sourceMappingURL=address.d.ts.map