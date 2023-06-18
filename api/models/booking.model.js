"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var bookingSchema = new mongoose_1.default.Schema({
    place: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: 'Place' },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    price: Number,
});
var Booking = mongoose_1.default.model('Booking', bookingSchema);
exports.default = Booking;
//# sourceMappingURL=booking.model.js.map