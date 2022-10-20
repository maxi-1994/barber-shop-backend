import { Router } from 'express';
import { JWTvalidation } from '../middlewares/jwt-validation';
import { check } from 'express-validator';
import { requestValidation } from '../middlewares/request-validation';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../controllers/appointment-controller';

// /api/appointments
export const appointmentRouter = Router();

appointmentRouter.get('/get-appointments', getAppointments);
appointmentRouter.post('/create-appointment', createAppointment);
appointmentRouter.put('/update-appointment/:id', updateAppointment);
appointmentRouter.delete('/delete-appointment/:id', deleteAppointment);
