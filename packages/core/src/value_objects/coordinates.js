"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coordinates = void 0;
const base_value_object_1 = require("../base/base_value_object");
class Coordinates extends base_value_object_1.BaseValueObject {
    latitude;
    longitude;
    constructor(latitude, longitude) {
        super();
        this.latitude = latitude;
        this.longitude = longitude;
    }
    static create(latitude, longitude) {
        if (latitude < -90 || latitude > 90) {
            throw new Error('latitude out of range');
        }
        if (longitude < -180 || longitude > 180) {
            throw new Error('longitude out of range');
        }
        return new Coordinates(latitude, longitude);
    }
    get equalityComponents() {
        return [this.latitude, this.longitude];
    }
}
exports.Coordinates = Coordinates;
//# sourceMappingURL=coordinates.js.map