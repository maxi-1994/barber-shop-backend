"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRouter = void 0;
const express_1 = require("express");
const jwt_validation_1 = require("../middlewares/jwt-validation");
const express_validator_1 = require("express-validator");
const messages_1 = require("../utils/constants/messages");
const request_validation_1 = require("../middlewares/request-validation");
const appointment_controller_1 = require("../controllers/appointment-controller");
// /api/appointments
exports.appointmentRouter = (0, express_1.Router)();
// All the appointments can be checked for admins or operators.
exports.appointmentRouter.get('/get-appointments', jwt_validation_1.JWTvalidation, appointment_controller_1.getAppointments);
// No need validation token because the clients do not have account.
exports.appointmentRouter.post('/create-appointment', [
    (0, express_validator_1.check)('service', messages_1.messages.required_service).not().isEmpty(),
    (0, express_validator_1.check)('date', messages_1.messages.required_date).not().isEmpty(),
    (0, express_validator_1.check)('clientName', messages_1.messages.required_name).not().isEmpty(),
    (0, express_validator_1.check)('clientNumber', messages_1.messages.required_number).not().isEmpty(),
    (0, express_validator_1.check)('clientEmail', messages_1.messages.required_email).isEmail(),
    request_validation_1.requestValidation,
], appointment_controller_1.createAppointment);
// The state can be updated only for admins or operators.
exports.appointmentRouter.put('/update-appointment/:id', [
    jwt_validation_1.JWTvalidation,
    (0, express_validator_1.check)('state', messages_1.messages.required_state),
    request_validation_1.requestValidation,
], appointment_controller_1.updateAppointment);
// No need validation token because the clients can delete it from his email.
exports.appointmentRouter.delete('/delete-appointment/:id', appointment_controller_1.deleteAppointment);
