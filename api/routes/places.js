"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var places_1 = require("../controllers/places");
exports.default = (function (router) {
    router.post('/api/places', places_1.createPlace);
    router.put('/api/places', places_1.updatePlace);
    router.get('/api/places', places_1.getPlaces);
    router.get('/api/places/:id', places_1.getPlace);
    router.get('/api/user-places', places_1.getUserPlaces);
});
//# sourceMappingURL=places.js.map