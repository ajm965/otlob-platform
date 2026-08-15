"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRange = void 0;
const base_value_object_1 = require("../base/base_value_object");
class DateRange extends base_value_object_1.BaseValueObject {
    start;
    end;
    constructor(start, end) {
        super();
        this.start = start;
        this.end = end;
    }
    static create(start, end) {
        if (!(start instanceof Date) || !(end instanceof Date)) {
            throw new Error('DateRange requires Date instances');
        }
        if (end.getTime() < start.getTime()) {
            throw new Error('DateRange end must be >= start');
        }
        return new DateRange(start, end);
    }
    get equalityComponents() {
        return [this.start.getTime(), this.end.getTime()];
    }
}
exports.DateRange = DateRange;
//# sourceMappingURL=date_range.js.map