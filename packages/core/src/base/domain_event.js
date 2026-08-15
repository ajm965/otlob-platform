"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
const unique_id_1 = require("./unique_id");
/**
 * Generic domain event envelope. Feature payloads belong in module events.
 */
class DomainEvent {
    eventId;
    occurredAt;
    eventType;
    constructor(eventType, eventId, occurredAt) {
        this.eventType = eventType;
        this.eventId = eventId ?? new unique_id_1.UniqueId(`evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`);
        this.occurredAt = occurredAt ?? new Date();
    }
}
exports.DomainEvent = DomainEvent;
//# sourceMappingURL=domain_event.js.map