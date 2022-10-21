"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.barberRouter = void 0;
const express_1 = require("express");
const jwt_validation_1 = require("../middlewares/jwt-validation");
const express_validator_1 = require("express-validator");
const request_validation_1 = require("../middlewares/request-validation");
const messages_1 = require("../utils/constants/messages");
const barbers_controller_1 = require("../controllers/barbers-controller");
// /api/barbers
exports.barberRouter = (0, express_1.Router)();
exports.barberRouter.get('/get-barbers', jwt_validation_1.JWTvalidation, barbers_controller_1.getBarbers);
exports.barberRouter.post('/create-barbers', [
    jwt_validation_1.JWTvalidation,
    (0, express_validator_1.check)('name', messages_1.messages.required_name).not().isEmpty(),
    (0, express_validator_1.check)('sex', messages_1.messages.required_sex).not().isEmpty(),
    request_validation_1.requestValidation,
], barbers_controller_1.createBarber);
exports.barberRouter.put('/update-barbers/:id', [
    jwt_validation_1.JWTvalidation,
    (0, express_validator_1.check)('name', messages_1.messages.required_name).not().isEmpty(),
    (0, express_validator_1.check)('sex', messages_1.messages.required_sex).not().isEmpty(),
    request_validation_1.requestValidation,
], barbers_controller_1.updateBarber);
exports.barberRouter.delete('/delete-barbers/:id', jwt_validation_1.JWTvalidation, barbers_controller_1.deleteBarber);
