"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesListRouter = void 0;
const express_1 = require("express");
const jwt_validation_1 = require("../middlewares/jwt-validation");
const services_list_controller_1 = require("../controllers/services-list-controller");
exports.servicesListRouter = (0, express_1.Router)();
exports.servicesListRouter.get('/get-services', jwt_validation_1.JWTvalidation, services_list_controller_1.getServices);
