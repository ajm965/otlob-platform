"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = void 0;
const base_value_object_1 = require("../base/base_value_object");
/**
 * Integer minor-unit money (e.g. halalas) + ISO currency code.
 */
class Money extends base_value_object_1.BaseValueObject {
    amountMinor;
    currency;
    constructor(amountMinor, currency) {
        super();
        this.amountMinor = amountMinor;
        this.currency = currency;
    }
    static of(amountMinor, currency) {
        if (!Number.isInteger(amountMinor)) {
            throw new Error('Money.amountMinor must be an integer');
        }
        const code = currency.trim().toUpperCase();
        if (code.length !== 3) {
            throw new Error('Money.currency must be a 3-letter ISO code');
        }
        return new Money(amountMinor, code);
    }
    get equalityComponents() {
        return [this.amountMinor, this.currency];
    }
}
exports.Money = Money;
//# sourceMappingURL=money.js.map