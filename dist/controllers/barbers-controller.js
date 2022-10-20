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
exports.deleteBarber = exports.updateBarber = exports.createBarber = exports.getBarbers = void 0;
const messages_1 = require("../utils/constants/messages");
const barber_1 = require("../models/barber");
const getBarbers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const barbers = yield barber_1.Barber.find();
        return res.status(200).json({
            successfull: true,
            barbers
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
exports.getBarbers = getBarbers;
const createBarber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Agregar funcionalidad de subir foto.
    // DUDA: Guardar la imagen en base64 en localStorage del navegador en vez generar un servicio nuevo.
    // hackmd.io -> hackmd para subir imagenes y consumirlas.
    try {
        const barberExists = yield barber_1.Barber.findOne({ name: req === null || req === void 0 ? void 0 : req.body.name });
        if (barberExists) {
            return res.status(404).json({
                successful: true,
                msg: messages_1.messages.barber_already_exists,
            });
        }
        const newBarber = yield new barber_1.Barber(Object.assign({}, req.body)).save();
        return res.status(200).json({
            succsessful: true,
            msg: messages_1.messages.barber_created,
            newBarber,
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
exports.createBarber = createBarber;
const updateBarber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Update de la foto
    try {
        const barberId = req.params.id;
        const barber = yield barber_1.Barber.findById(barberId);
        if (!barber) {
            return res.status(404).json({
                successful: true,
                msg: messages_1.messages.barber_does_not_exist,
            });
        }
        const barberUpdated = yield barber_1.Barber.findByIdAndUpdate(barberId, Object.assign({}, req.body), { returnDocument: 'after' });
        return res.status(200).json({
            successful: true,
            msg: messages_1.messages.barber_updated,
            barberUpdated,
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
exports.updateBarber = updateBarber;
const deleteBarber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const barberId = req.params.id;
        const barber = yield barber_1.Barber.findById(barberId);
        if (!barber) {
            return res.status(404).json({
                successful: true,
                msg: messages_1.messages.barber_does_not_exist,
            });
        }
        yield barber_1.Barber.findByIdAndUpdate(barberId);
        return res.status(200).json({
            successful: true,
            msg: messages_1.messages.barber_deleted,
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
exports.deleteBarber = deleteBarber;
