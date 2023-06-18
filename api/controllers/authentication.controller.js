"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var user_model_1 = __importDefault(require("../models/user.model"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var bcryptSalt = bcrypt_1.default.genSaltSync(10);
var jwtSecret = process.env.JWT_SECRET;
var createUser = function (name, email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var userDoc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.default.create({
                    name: name,
                    email: email,
                    password: bcrypt_1.default.hashSync(password, bcryptSalt),
                })];
            case 1:
                userDoc = _a.sent();
                return [2 /*return*/, userDoc];
        }
    });
}); };
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, userDoc, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, createUser(name_1, email, password)];
            case 1:
                userDoc = _b.sent();
                res.json(userDoc);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.log(error_1);
                if (error_1.code === 11000) {
                    res.status(422).json({ message: 'Email is already in use!' });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userDoc, passOk, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
            case 1:
                userDoc = _b.sent();
                if (!userDoc) {
                    return [2 /*return*/, res.status(422).json('User not found')];
                }
                passOk = bcrypt_1.default.compareSync(password, userDoc.password);
                if (!passOk) {
                    return [2 /*return*/, res.status(422).json('Incorrect password')];
                }
                token = jsonwebtoken_1.default.sign({
                    email: userDoc.email,
                    name: userDoc.name,
                    id: userDoc._id
                }, jwtSecret, {});
                res.cookie('token', token,{sameSite: 'none',
                secure: true}).json(userDoc);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                console.error(err_1);
                res.status(500).json('Something went wrong, please try again later!');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var logout = function (req, res) {
    res.cookie('token', '').json(true);
};
exports.logout = logout;
//# sourceMappingURL=authentication.controller.js.map