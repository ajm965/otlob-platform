"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const base_value_object_1 = require("../base/base_value_object");
/**
 * Postal address value object (not the persisted Address aggregate).
 */
class Address extends base_value_object_1.BaseValueObject {
    line1;
    line2;
    city;
    region;
    postalCode;
    countryCode;
    constructor(line1, line2, city, region, postalCode, countryCode) {
        super();
        this.line1 = line1;
        this.line2 = line2;
        this.city = city;
        this.region = region;
        this.postalCode = postalCode;
        this.countryCode = countryCode;
    }
    static create(input) {
        const countryCode = input.countryCode.trim().toUpperCase();
        if (countryCode.length !== 2) {
            throw new Error('countryCode must be ISO 3166-1 alpha-2');
        }
        if (input.line1.trim().length === 0 || input.city.trim().length === 0) {
            throw new Error('line1 and city are required');
        }
        return new Address(input.line1.trim(), input.line2?.trim() ?? null, input.city.trim(), input.region?.trim() ?? null, input.postalCode?.trim() ?? null, countryCode);
    }
    get equalityComponents() {
        return [
            this.line1,
            this.line2,
            this.city,
            this.region,
            this.postalCode,
            this.countryCode,
        ];
    }
}
exports.Address = Address;
//# sourceMappingURL=address.js.map