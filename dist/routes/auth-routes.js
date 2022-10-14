"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const request_validation_1 = require("../middlewares/request-validation");
const messages_1 = require("../utils/constants/messages");
const auth_controller_1 = require("../controllers/auth-controller");
// '/api/login'
exports.authRouter = (0, express_1.default)();
exports.authRouter.post('/', [
    (0, express_validator_1.check)('email', messages_1.messages.required_email).isEmail(),
    (0, express_validator_1.check)('password', messages_1.messages.required_password).not().isEmpty(),
    request_validation_1.requestValidation,
], auth_controller_1.login);
