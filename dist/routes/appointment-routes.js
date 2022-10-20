"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRouter = void 0;
const express_1 = require("express");
const appointment_controller_1 = require("../controllers/appointment-controller");
// /api/appointments
exports.appointmentRouter = (0, express_1.Router)();
exports.appointmentRouter.get('/get-appointments', appointment_controller_1.getAppointments);
exports.appointmentRouter.post('/create-appointment', appointment_controller_1.createAppointment);
exports.appointmentRouter.put('/update-appointment/:id', appointment_controller_1.updateAppointment);
exports.appointmentRouter.delete('/delete-appointment/:id', appointment_controller_1.deleteAppointment);
