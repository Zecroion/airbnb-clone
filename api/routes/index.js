"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authentication_1 = __importDefault(require("./authentication"));
var places_1 = __importDefault(require("./places"));
var profile_1 = __importDefault(require("./profile"));
var upload_photos_1 = __importDefault(require("./upload-photos"));
var booking_1 = __importDefault(require("./booking"));
var router = (0, express_1.Router)();
exports.default = (function () {
    (0, authentication_1.default)(router);
    (0, profile_1.default)(router);
    (0, places_1.default)(router);
    (0, upload_photos_1.default)(router);
    (0, booking_1.default)(router);
    return router;
});
//# sourceMappingURL=index.js.map