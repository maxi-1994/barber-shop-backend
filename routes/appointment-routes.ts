import { Router } from 'express';
import { JWTvalidation } from '../middlewares/jwt-validation';
import { check } from 'express-validator';
import { messages } from '../utils/constants/messages';
import { requestValidation } from '../middlewares/request-validation';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../controllers/appointment-controller';

// /api/appointments
export const appointmentRouter: Router = Router();

// All the appointments can be checked for admins or operators.
appointmentRouter.get('/get-appointments', JWTvalidation, getAppointments); 

// No need validation token because the clients do not have account.
appointmentRouter.post('/create-appointment', [
    check('service', messages.required_service).not().isEmpty(),
    check('date', messages.required_date).not().isEmpty(),
    check('hour', messages.required_hour).not().isEmpty(),
    check('clientName', messages.required_name).not().isEmpty(),
    check('clientNumber', messages.required_number).not().isEmpty(),
    check('clientEmail', messages.required_email).isEmail(),
    requestValidation,
], createAppointment); 

// The state can be updated only for admins or operators.
appointmentRouter.put('/update-appointment/:id',[
    JWTvalidation,
    check('state', messages.required_state),
    requestValidation,
] , updateAppointment); 

// No need validation token because the clients can delete it from his email.
appointmentRouter.delete('/delete-appointment/:id', deleteAppointment); 