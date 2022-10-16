import Router, { Express } from 'express';
import { JWTvalidation } from '../middlewares/jwt-validation';
import { check } from 'express-validator';
import { requestValidation } from '../middlewares/request-validation'; 
import { messages } from '../utils/constants/messages';
import { getBarbers, createBarber, updateBarber, deleteBarber } from '../controllers/barbers-controller';

// /api/barbers
export const barberRouter: Express = Router();

barberRouter.get('/get-barbers', JWTvalidation, getBarbers);
barberRouter.post('/create-barbers', [
    JWTvalidation,
    check('name', messages.required_name).not().isEmpty(),
    check('sex', messages.required_sex).not().isEmpty(),
    requestValidation,
], createBarber);
barberRouter.put('/update-barbers/:id', [
    JWTvalidation,
    check('name', messages.required_name).not().isEmpty(),
    check('sex', messages.required_sex).not().isEmpty(),
    requestValidation,
], updateBarber);
barberRouter.delete('/delete-barbers/:id', JWTvalidation, deleteBarber);