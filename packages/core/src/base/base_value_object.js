"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseValueObject = void 0;
/**
 * Equality-by-value foundation for value objects.
 */
class BaseValueObject {
    equals(other) {
        if (other == null) {
            return false;
        }
        if (this.constructor !== other.constructor) {
            return false;
        }
        const a = this.equalityComponents;
        const b = other.equalityComponents;
        if (a.length !== b.length) {
            return false;
        }
        return a.every((component, index) => Object.is(component, b[index]));
    }
}
exports.BaseValueObject = BaseValueObject;
//# sourceMappingURL=base_value_object.js.map