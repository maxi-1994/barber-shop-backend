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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.updateAppointment = exports.createAppointment = exports.getAppointments = void 0;
const appointment_1 = require("../models/appointment");
const messages_1 = require("../utils/constants/messages");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield appointment_1.Appointment.find();
        return res.status(200).json({
            succesfull: true,
            appointments
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            successful: false,
            msg: messages_1.messages.unexpected_error
        });
    }
});
exports.getAppointments = getAppointments;
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  TODO:
        - Cuando se crea un turno, se crea con un estado "PENDIENTE", se notifica al usuario de que el turno fué solicitado y que esta pendiente a confirmación.
        - El admin deberá confirmar el turno por medio del panel, una vez confirmado se enviará otra email al usuario avisando que el turno fue confirmado.
        - Esto es por que puede que el turno que solicita el usuario ya haya sido confirmado por otra persona por otro medio de comunicación (telefono, red social, etc)
    */
    try {
        const clientEmailExists = yield appointment_1.Appointment.findOne({ clientEmail: req.body.clientEmail });
        if (clientEmailExists) {
            return res.status(200).json({
                successful: true,
                msg: messages_1.messages.appointment_already_exists
            });
        }
        const newAppointment = yield new appointment_1.Appointment(Object.assign({}, req.body)).save();
        // TODO: ¡IMPORTANTE! Enviar mail al usuario notificando el turno creado con la posibilidad de cancelarlo desde el email con un link.
        return res.status(200).json({
            successful: true,
            msg: messages_1.messages.appointment_created,
            body: newAppointment,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            successful: false,
            msg: messages_1.messages.unexpected_error,
        });
    }
});
exports.createAppointment = createAppointment;
const updateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentId = req.params.id;
        const appointmentExists = yield appointment_1.Appointment.findById(appointmentId);
        if (!appointmentExists) {
            return res.status(200).json({
                succesful: true,
                msg: messages_1.messages.appointment_does_not_exist,
            });
        }
        const appointmentUpdated = yield appointment_1.Appointment.findByIdAndUpdate(appointmentId, req.body, { returnDocument: 'after' });
        // TODO: ¡IMPORTANTE! Enviar email al cliente notificando que el estado del turno fue actualizado 
        return res.status(200).json({
            succesful: true,
            msg: messages_1.messages.appointment_updated,
            appointmentUpdated
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            successful: false,
            msg: messages_1.messages.unexpected_error,
        });
    }
});
exports.updateAppointment = updateAppointment;
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentId = req.params.id;
        const appointmentExists = yield appointment_1.Appointment.findById(appointmentId);
        if (!appointmentExists) {
            return res.status(200).json({
                succesful: true,
                msg: messages_1.messages.appointment_does_not_exist,
            });
        }
        yield appointment_1.Appointment.findByIdAndDelete(appointmentId);
        // TODO: ¡IMPORTANTE! Enviar email al cliente notificando que el turno fue eliminado
        return res.status(200).json({
            succesful: true,
            msg: messages_1.messages.appointment_deleted,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            successful: false,
            msg: messages_1.messages.unexpected_error,
        });
    }
});
exports.deleteAppointment = deleteAppointment;
