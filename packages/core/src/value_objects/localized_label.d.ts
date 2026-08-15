import { BaseValueObject } from '../base/base_value_object';
/** Generic AR/EN label pair for catalog and similar content. */
export declare class LocalizedLabel extends BaseValueObject {
    readonly ar: string;
    readonly en: string;
    private constructor();
    static create(ar: string, en: string): LocalizedLabel;
    protected get equalityComponents(): readonly unknown[];
}
//# sourceMappingURL=localized_label.d.ts.map