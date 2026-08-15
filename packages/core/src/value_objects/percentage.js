"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Percentage = void 0;
const base_value_object_1 = require("../base/base_value_object");
/** Percentage in basis points (0–10000 = 0%–100%) to avoid floats. */
class Percentage extends base_value_object_1.BaseValueObject {
    basisPoints;
    constructor(basisPoints) {
        super();
        this.basisPoints = basisPoints;
    }
    static fromBasisPoints(basisPoints) {
        if (!Number.isInteger(basisPoints) || basisPoints < 0 || basisPoints > 10_000) {
            throw new Error('Percentage basisPoints must be 0..10000');
        }
        return new Percentage(basisPoints);
    }
    get equalityComponents() {
        return [this.basisPoints];
    }
}
exports.Percentage = Percentage;
//# sourceMappingURL=percentage.js.map