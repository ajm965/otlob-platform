"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalizedLabel = void 0;
const base_value_object_1 = require("../base/base_value_object");
/** Generic AR/EN label pair for catalog and similar content. */
class LocalizedLabel extends base_value_object_1.BaseValueObject {
    ar;
    en;
    constructor(ar, en) {
        super();
        this.ar = ar;
        this.en = en;
    }
    static create(ar, en) {
        if (ar.trim().length === 0 || en.trim().length === 0) {
            throw new Error('LocalizedLabel requires ar and en');
        }
        return new LocalizedLabel(ar.trim(), en.trim());
    }
    get equalityComponents() {
        return [this.ar, this.en];
    }
}
exports.LocalizedLabel = LocalizedLabel;
//# sourceMappingURL=localized_label.js.map