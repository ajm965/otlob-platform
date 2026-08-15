"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const base_value_object_1 = require("../base/base_value_object");
class Email extends base_value_object_1.BaseValueObject {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    static create(raw) {
        const value = raw.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            throw new Error('Invalid email format');
        }
        return new Email(value);
    }
    get equalityComponents() {
        return [this.value];
    }
}
exports.Email = Email;
//# sourceMappingURL=email.js.map