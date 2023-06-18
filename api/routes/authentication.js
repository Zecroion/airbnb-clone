"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_controller_1 = require("../controllers/authentication.controller");
exports.default = (function (router) {
    router.post('/api/register', authentication_controller_1.register);
    router.post('/api/login', authentication_controller_1.login);
    router.post('/api/logout', authentication_controller_1.logout);
});
//# sourceMappingURL=authentication.js.map