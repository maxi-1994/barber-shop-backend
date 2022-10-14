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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const user_1 = require("../models/user");
const jwt_generator_1 = require("../helpers/jwt-generator");
const messages_1 = require("../utils/constants/messages");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find({}, 'name email role');
        return res.status(200).json({
            successfull: true,
            users
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
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailExists = yield user_1.User.findOne({ email: req === null || req === void 0 ? void 0 : req.body.email });
        if (emailExists) {
            return res === null || res === void 0 ? void 0 : res.status(400).json({
                successful: true,
                msg: messages_1.messages.email_already_exists,
            });
        }
        const newOperator = Object.assign(Object.assign({}, req.body), { role: 'OPERATOR_USER' });
        const newUser = new user_1.User(newOperator);
        // Encriptar password
        const salt = bcryptjs_1.default.genSaltSync();
        newUser.password = bcryptjs_1.default.hashSync(req === null || req === void 0 ? void 0 : req.body.password, salt);
        const userCreated = yield newUser.save();
        // Generar JWT
        const token = yield (0, jwt_generator_1.getToken)(userCreated._id);
        return res === null || res === void 0 ? void 0 : res.status(200).json({
            successful: true,
            userCreated,
            token,
            msg: messages_1.messages.user_created,
        });
    }
    catch (error) {
        console.error(error);
        return res === null || res === void 0 ? void 0 : res.status(500).json({
            successful: false,
            msg: messages_1.messages.unexpected_error,
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({
                successful: true,
                msg: messages_1.messages.user_doesNot_exist
            });
        }
        const userUpdated = yield user_1.User.findByIdAndUpdate(userId, req.body, { returnDocument: 'after' });
        return res.status(200).json({
            successful: true,
            msg: messages_1.messages.user_updated,
            userUpdated,
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
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({
                successful: true,
                msg: messages_1.messages.user_doesNot_exist,
            });
        }
        yield user_1.User.findByIdAndDelete(userId);
        return res.status(200).json({
            successful: true,
            msg: messages_1.messages.user_deleted,
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
exports.deleteUser = deleteUser;
