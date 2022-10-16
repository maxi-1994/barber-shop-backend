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
exports.Barber = void 0;
const mongoose_1 = require("mongoose");
// Schema corresponding to the document interface.
const barberSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
});
barberSchema.method('toJSON', function () {
    const _a = this.toObject(), { __v } = _a, object = __rest(_a, ["__v"]);
    return object;
});
// Model.
exports.Barber = (0, mongoose_1.model)('barbers', barberSchema);
