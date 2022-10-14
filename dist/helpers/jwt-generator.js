"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getToken = (id) => {
    const payload = { id };
    const privateKey = process.env.SECRET_KEY || '';
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, privateKey, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.getToken = getToken;
