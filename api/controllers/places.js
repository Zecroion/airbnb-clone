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
exports.getPlaces = exports.updatePlace = exports.getPlace = exports.getUserPlaces = exports.createPlace = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var place_model_1 = __importDefault(require("../models/place.model"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var DATABASE_URL = process.env.MONGO_URL;
var jwtSecret = process.env.JWT_SECRET;
var createPlace = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, _a, title_1, address_1, addedPhotos_1, description_1, price_1, perks_1, extraInfo_1, checkIn_1, checkOut_1, maxGuests_1, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoose_1.default.connect(DATABASE_URL)];
            case 1:
                _b.sent();
                token = req.cookies.token;
                _a = req.body, title_1 = _a.title, address_1 = _a.address, addedPhotos_1 = _a.addedPhotos, description_1 = _a.description, price_1 = _a.price, perks_1 = _a.perks, extraInfo_1 = _a.extraInfo, checkIn_1 = _a.checkIn, checkOut_1 = _a.checkOut, maxGuests_1 = _a.maxGuests;
                if (token) {
                    jsonwebtoken_1.default.verify(token, jwtSecret, {}, function (err, userData) { return __awaiter(void 0, void 0, void 0, function () {
                        var placeDoc;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err) {
                                        res.status(401).json({ message: 'Unauthorized' });
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, place_model_1.default.create({
                                            owner: userData.id,
                                            price: price_1,
                                            title: title_1,
                                            address: address_1,
                                            photos: addedPhotos_1,
                                            description: description_1,
                                            perks: perks_1,
                                            extraInfo: extraInfo_1,
                                            checkIn: checkIn_1,
                                            checkOut: checkOut_1,
                                            maxGuests: maxGuests_1,
                                        })];
                                case 1:
                                    placeDoc = _a.sent();
                                    res.json(placeDoc);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                else {
                    res.status(401).json({ message: 'Unauthorized' });
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                console.error(err_1);
                res.status(500).json({ message: 'Internal Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createPlace = createPlace;
var getUserPlaces = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoose_1.default.connect(DATABASE_URL)];
            case 1:
                _a.sent();
                token = req.cookies.token;
                if (token) {
                    jsonwebtoken_1.default.verify(token, jwtSecret, {}, function (err, userData) { return __awaiter(void 0, void 0, void 0, function () {
                        var id, places, err_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err) {
                                        res.status(401).json({ message: 'Unauthorized' });
                                        return [2 /*return*/];
                                    }
                                    if (!userData) return [3 /*break*/, 5];
                                    id = userData.id;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, place_model_1.default.find({ owner: id })];
                                case 2:
                                    places = _a.sent();
                                    res.status(200).json(places);
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_3 = _a.sent();
                                    res.status(500).json({ message: 'Internal Server Error' });
                                    return [3 /*break*/, 4];
                                case 4: return [3 /*break*/, 6];
                                case 5:
                                    res.status(403).json({ message: 'Forbidden' });
                                    _a.label = 6;
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                else {
                    res.status(401).json({ message: 'Not Authorized' });
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).json({ message: 'Internal Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserPlaces = getUserPlaces;
var getPlace = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, placeDoc, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, mongoose_1.default.connect(DATABASE_URL)];
            case 1:
                _a.sent();
                id = req.params.id;
                return [4 /*yield*/, place_model_1.default.findById(id)];
            case 2:
                placeDoc = _a.sent();
                if (!placeDoc) {
                    res.status(404).json({ message: 'Place not found' });
                    return [2 /*return*/];
                }
                res.json(placeDoc);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.error(err_4);
                res.status(500).json({ message: 'Internal Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPlace = getPlace;
var updatePlace = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, _a, id_1, title_2, address_2, addedPhotos_2, description_2, perks_2, extraInfo_2, checkIn_2, checkOut_2, maxGuests_2, price_2, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoose_1.default.connect(DATABASE_URL)];
            case 1:
                _b.sent();
                token = req.cookies.token;
                _a = req.body, id_1 = _a.id, title_2 = _a.title, address_2 = _a.address, addedPhotos_2 = _a.addedPhotos, description_2 = _a.description, perks_2 = _a.perks, extraInfo_2 = _a.extraInfo, checkIn_2 = _a.checkIn, checkOut_2 = _a.checkOut, maxGuests_2 = _a.maxGuests, price_2 = _a.price;
                jsonwebtoken_1.default.verify(token, jwtSecret, {}, function (err, userData) { return __awaiter(void 0, void 0, void 0, function () {
                    var placeDoc;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (err) {
                                    res.status(401).json({ message: 'Unauthorized' });
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, place_model_1.default.findById(id_1)];
                            case 1:
                                placeDoc = _a.sent();
                                if (!placeDoc) {
                                    res.status(404).json({ message: 'Place not found' });
                                    return [2 /*return*/];
                                }
                                if (!(userData.id === placeDoc.owner.toString())) return [3 /*break*/, 3];
                                placeDoc.set({
                                    title: title_2,
                                    address: address_2,
                                    photos: addedPhotos_2,
                                    description: description_2,
                                    perks: perks_2,
                                    extraInfo: extraInfo_2,
                                    checkIn: checkIn_2,
                                    checkOut: checkOut_2,
                                    maxGuests: maxGuests_2,
                                    price: price_2,
                                });
                                return [4 /*yield*/, placeDoc.save()];
                            case 2:
                                _a.sent();
                                res.json('ok');
                                return [3 /*break*/, 4];
                            case 3:
                                res.status(403).json({ message: 'Forbidden' });
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                console.error(err_5);
                res.status(500).json({ message: 'Internal Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updatePlace = updatePlace;
var getPlaces = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var places, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, mongoose_1.default.connect(DATABASE_URL)];
            case 1:
                _a.sent();
                return [4 /*yield*/, place_model_1.default.find()];
            case 2:
                places = _a.sent();
                res.json(places);
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                res.status(500).json({ message: 'Internal Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPlaces = getPlaces;
//# sourceMappingURL=places.js.map