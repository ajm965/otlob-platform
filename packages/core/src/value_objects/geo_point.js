"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoPoint = void 0;
const base_value_object_1 = require("../base/base_value_object");
const coordinates_1 = require("./coordinates");
/** Framework-agnostic geographic point (not a Firebase SDK type). */
class GeoPoint extends base_value_object_1.BaseValueObject {
    coordinates;
    constructor(coordinates) {
        super();
        this.coordinates = coordinates;
    }
    static fromCoordinates(coordinates) {
        return new GeoPoint(coordinates);
    }
    static create(latitude, longitude) {
        return new GeoPoint(coordinates_1.Coordinates.create(latitude, longitude));
    }
    get equalityComponents() {
        return [this.coordinates.latitude, this.coordinates.longitude];
    }
}
exports.GeoPoint = GeoPoint;
//# sourceMappingURL=geo_point.js.map