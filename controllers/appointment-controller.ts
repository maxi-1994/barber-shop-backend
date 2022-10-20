import { Request, Response } from 'express';
import { Appointment } from '../models/appointment';
import { IAppointment } from '../utils/interfaces/appointment-interface';
import { messages } from '../utils/constants/messages';

export const getAppointments = async (req: Request, res: Response): Promise<Response> => {
    try {
        const appointments: IAppointment[] = await Appointment.find();
        return res.status(200).json({
            succesfull: true,
            appointments
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            successful: false,
            msg: messages.unexpected_error
        });
    }
};

export const createAppointment = async (req: Request, res: Response): Promise<Response> => {
    /*  TODO:
        - Cuando se crea un turno, se crea con un estado "PENDIENTE", se notifica al usuario de que el turno fué solicitado y que esta pendiente a confirmación.
        - El admin deberá confirmar el turno por medio del panel, una vez confirmado se enviará otra email al usuario avisando que el turno fue confirmado.
        - Esto es por que puede que el turno que solicita el usuario ya haya sido confirmado por otra persona por otro medio de comunicación (telefono, red social, etc)
    */

    try {
        const clientEmailExists: IAppointment | null = await Appointment.findOne({ clientEmail: req.body.clientEmail });

        if (clientEmailExists) {
            return res.status(200).json({
                successful: true,
                msg: messages.appointment_already_exists
            });
        }

        const newAppointment: IAppointment = await new Appointment({ ...req.body }).save();

        // TODO: ¡IMPORTANTE! Enviar mail al usuario notificando el turno creado con la posibilidad de cancelarlo desde el email con un link.

        return res.status(200).json({
            successful: true,
            msg: messages.appointment_created,
            body: newAppointment,
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            successful: false,
            msg: messages.unexpected_error,
        });
    }

};

export const updateAppointment = async (req: Request, res: Response): Promise<Response> => {
    try {
        const appointmentId = req.params.id
        const appointmentExists = await Appointment.findById(appointmentId);

        if (!appointmentExists) {
            return res.status(200).json({
                succesful: true,
                msg: messages.appointment_does_not_exist,
            });
        }

        const appointmentUpdated = await Appointment.findByIdAndUpdate(appointmentId, req.body, { returnDocument: 'after' });

        // TODO: ¡IMPORTANTE! Enviar email al cliente notificando que el estado del turno fue actualizado 

        return res.status(200).json({
            succesful: true,
            msg: messages.appointment_updated,
            appointmentUpdated
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            successful: false,
            msg: messages.unexpected_error,
        });
    }   
};

export const deleteAppointment = async (req: Request, res: Response): Promise<Response> => {
    try {
        const appointmentId = req.params.id
        const appointmentExists = await Appointment.findById(appointmentId);

        if (!appointmentExists) {
            return res.status(200).json({
                succesful: true,
                msg: messages.appointment_does_not_exist,
            });
        }

        await Appointment.findByIdAndDelete(appointmentId);

        // TODO: ¡IMPORTANTE! Enviar email al cliente notificando que el turno fue eliminado

        return res.status(200).json({
            succesful: true,
            msg: messages.appointment_deleted,
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            successful: false,
            msg: messages.unexpected_error,
        });
    }  
};