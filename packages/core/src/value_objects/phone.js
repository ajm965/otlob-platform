"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phone = void 0;
const base_value_object_1 = require("../base/base_value_object");
/** E.164 phone number value object. */
class Phone extends base_value_object_1.BaseValueObject {
    e164;
    constructor(e164) {
        super();
        this.e164 = e164;
    }
    static create(e164) {
        const value = e164.trim();
        if (!/^\+[1-9]\d{7,14}$/.test(value)) {
            throw new Error('Phone must be E.164 format');
        }
        return new Phone(value);
    }
    get equalityComponents() {
        return [this.e164];
    }
}
exports.Phone = Phone;
//# sourceMappingURL=phone.js.map