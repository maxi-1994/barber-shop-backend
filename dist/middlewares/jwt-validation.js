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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdminRole = exports.JWTvalidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const messages_1 = require("../utils/constants/messages");
let idVerified;
const JWTvalidation = (req, res, next) => {
    const privateKey = process.env.SECRET_KEY || '';
    const token = req.header('x-token') || '';
    if (!token) {
        return res.status(401).json({
            successful: false,
            msg: messages_1.messages.unauthorized_user,
        });
    }
    try {
        const tokenVerified = jsonwebtoken_1.default.verify(token, privateKey, { complete: true }); // obtengo el token decoded para saber el id del usuario que hizo la request.
        idVerified = tokenVerified.payload.id; // Guardo el id del usuario obtenido
        next();
    }
    catch (error) {
        return res.status(401).json({
            successful: false,
            msg: messages_1.messages.invalid_token,
        });
    }
};
exports.JWTvalidation = JWTvalidation;
const validateAdminRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findById(idVerified); // Por medio del id del usuario obtenido en JWTvalidation. Lo busco en la BD y verifico si tinen el role de administrador.
        if (!user) {
            return res.status(404).json({
                successful: false,
                msg: messages_1.messages.user_doesNot_exist
            });
        }
        if (user.role !== 'ADMIN_USER') {
            return res.status(403).json({
                successful: false,
                msg: messages_1.messages.unauthorized_user,
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: messages_1.messages.unexpected_error,
        });
    }
});
exports.validateAdminRole = validateAdminRole;
