"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const base_entity_1 = require("./base_entity");
/**
 * Aggregate root with domain-event collection only (no business workflows).
 */
class AggregateRoot extends base_entity_1.BaseEntity {
    domainEvents = [];
    record(event) {
        this.domainEvents.push(event);
    }
    pullDomainEvents() {
        const copy = [...this.domainEvents];
        this.domainEvents.length = 0;
        return copy;
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=aggregate_root.js.map