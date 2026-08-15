"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
/**
 * Identity-bearing domain entity. No persistence or framework metadata.
 */
class BaseEntity {
    id;
    constructor(id) {
        this.id = id;
    }
    equals(other) {
        if (other == null) {
            return false;
        }
        return this.id.equals(other.id);
    }
}
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base_entity.js.map