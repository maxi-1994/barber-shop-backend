"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestValidation = void 0;
const express_validator_1 = require("express-validator");
const requestValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            successful: false,
            errors: errors.mapped(),
        });
    }
    next();
};
exports.requestValidation = requestValidation;
