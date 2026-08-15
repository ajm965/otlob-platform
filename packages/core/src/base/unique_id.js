"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueId = void 0;
/**
 * Opaque unique identifier. Framework-agnostic.
 */
class UniqueId {
    value;
    constructor(value) {
        this.value = value;
        if (value.trim().length === 0) {
            throw new Error('UniqueId value must be non-empty');
        }
    }
    equals(other) {
        return this.value === other.value;
    }
    toString() {
        return this.value;
    }
}
exports.UniqueId = UniqueId;
//# sourceMappingURL=unique_id.js.map