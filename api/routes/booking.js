"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bookings_controller_1 = require("../controllers/bookings.controller");
exports.default = (function (router) {
    router.post('/api/bookings', bookings_controller_1.createBooking);
    router.get('/api/bookings', bookings_controller_1.getBooking);
});
//# sourceMappingURL=booking.js.map