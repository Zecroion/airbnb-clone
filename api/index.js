"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDataFromReq = void 0;
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var index_1 = __importDefault(require("./routes/index"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var jwtSecret = process.env.JWT_SECRET;
var PORT = 4000;
app.use('/uploads', express_1.default.static(__dirname + '/uploads'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
}));
var getUserDataFromReq = function (req, res) {
    return jsonwebtoken_1.default.verify(req.cookies.token, jwtSecret, {}, function (err, userData) {
        return userData ? userData : 'ERROR';
    });
};
exports.getUserDataFromReq = getUserDataFromReq;
app.listen(PORT, function () { console.log('application started on port' + PORT); });
app.use('/', (0, index_1.default)());
//# sourceMappingURL=index.js.map