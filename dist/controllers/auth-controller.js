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
exports.login = void 0;
const user_1 = require("../models/user");
const jwt_generator_1 = require("../helpers/jwt-generator");
const messages_1 = require("../utils/constants/messages");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findOne({ email: req.body.email });
        const validPassword = bcryptjs_1.default.compareSync(req.body.password, (user === null || user === void 0 ? void 0 : user.password) || '');
        if (!user || !validPassword) {
            return res.status(401).json({
                successful: false,
                msg: messages_1.messages.wrong_access,
            });
        }
        const token = yield (0, jwt_generator_1.getToken)(user._id);
        return res.status(200).json({
            successful: true,
            msg: `${messages_1.messages.welcome_message} ${user.name}`,
            user,
            token
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            successful: false,
            msg: messages_1.messages.unexpected_error,
        });
    }
});
exports.login = login;
