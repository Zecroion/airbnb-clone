"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});
var UserModel = mongoose_1.default.model('User', UserSchema);
var User = UserModel;
exports.default = User;
//# sourceMappingURL=user.model.js.map