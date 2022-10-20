"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const mongoose_1 = require("mongoose");
// Schema corresponding to the document interface.
const appointmentSchema = new mongoose_1.Schema({
    service: {
        type: String,
        required: true,
    },
    professional: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    clientName: {
        type: String,
        required: true,
    },
    clientNumber: {
        type: Number,
        required: false,
    },
    clientEmail: {
        type: String,
        required: true,
    },
    clientComment: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: true,
        default: 'pendiente',
    }
});
appointmentSchema.method('toJSON', function () {
    const _a = this.toObject(), { __v } = _a, object = __rest(_a, ["__v"]);
    return object;
});
// Model.
exports.Appointment = (0, mongoose_1.model)('appointment', appointmentSchema);
