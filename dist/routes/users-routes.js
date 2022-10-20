"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_controller_1 = require("../controllers/users-controller");
const jwt_validation_1 = require("../middlewares/jwt-validation");
const express_validator_1 = require("express-validator");
const request_validation_1 = require("../middlewares/request-validation");
const messages_1 = require("../utils/constants/messages");
// '/api/users'
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/get-users', jwt_validation_1.JWTvalidation, users_controller_1.getUsers);
exports.usersRouter.post('/create-user', [
    jwt_validation_1.JWTvalidation,
    jwt_validation_1.validateAdminRole,
    (0, express_validator_1.check)('name', messages_1.messages.required_name).not().isEmpty(),
    (0, express_validator_1.check)('email', messages_1.messages.required_email).isEmail(),
    (0, express_validator_1.check)('password', messages_1.messages.required_password).not().isEmpty(),
    request_validation_1.requestValidation
], users_controller_1.createUser);
exports.usersRouter.put('/update-user/:id', [
    jwt_validation_1.JWTvalidation,
    jwt_validation_1.validateAdminRole,
    (0, express_validator_1.check)('name', messages_1.messages.required_name).not().isEmpty(),
    (0, express_validator_1.check)('email', messages_1.messages.required_email).isEmail(),
    (0, express_validator_1.check)('role', messages_1.messages.required_role).not().isEmpty(),
    request_validation_1.requestValidation
], users_controller_1.updateUser);
exports.usersRouter.delete('/delete-user/:id', [jwt_validation_1.JWTvalidation, jwt_validation_1.validateAdminRole], users_controller_1.deleteUser);
