"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var upload_photos_controller_1 = require("../controllers/upload-photos.controller");
var multer_1 = __importDefault(require("multer"));
exports.default = (function (router) {
    router.post('/api/upload-by-link', upload_photos_controller_1.uploadByLink);
    var photosMiddleware = (0, multer_1.default)({ dest: '/tmp/' });
    router.post('/api/upload', photosMiddleware.array('photos', 100), upload_photos_controller_1.uploadFromFile);
});
//# sourceMappingURL=upload-photos.js.map