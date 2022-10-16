import { Request, Response } from 'express';
import { messages } from '../utils/constants/messages';
import { IBarber } from '../utils/interfaces/barber-interface';
import { Barber } from '../models/barber';

export const getBarbers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const barbers: IBarber[] = await Barber.find();
        return res.status(200).json({
            successfull: true,
            barbers
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            successful: false,
            msg: messages.unexpected_error,
        });
    }
}

export const createBarber = async (req: Request, res: Response): Promise<Response> => {
    // TODO: Agregar funcionalidad de subir foto.
    try {
        const barberExists: IBarber | null = await Barber.findOne({ name: req?.body.name });

        if (barberExists) {
            return res.status(404).json({
                successful: true,
                msg: messages.barber_already_exists,
            });
        }

        const newBarber = await new Barber({...req.body}).save();

        return res.status(200).json({
            succsessful: true,
            msg: messages.barber_created,
            newBarber,
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            successful: false,
            msg: messages.unexpected_error,
        });
    }
}

export const updateBarber = async (req: Request, res: Response): Promise<Response> => {
    // TODO: Update de la foto
    try {
        const barberId: string = req.params.id
        const barber: IBarber | null = await Barber.findById(barberId);
    
        if (!barber) {
            return res.status(404).json({
                successful: true,
                msg: messages.barber_doesNot_exist,
            });
        }
    
        const barberUpdated: IBarber | null = await Barber.findByIdAndUpdate(barberId, { ...req.body }, { returnDocument: 'after' });

        return res.status(200).json({
            successful: true,
            msg: messages.barber_updated,
            barberUpdated,
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            successful: false,
            msg: messages.unexpected_error,
        });
    }
}

export const deleteBarber = async (req: Request, res: Response): Promise<Response> => {
    try {
        const barberId: string = req.params.id;
        const barber: IBarber | null = await Barber.findById(barberId);
    
        if (!barber) {
            return res.status(404).json({
                successful: true,
                msg: messages.barber_doesNot_exist,
            });
        }
    
        await Barber.findByIdAndUpdate(barberId);

        return res.status(200).json({
            successful: true,
            msg: messages.barber_deleted,
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            successful: false,
            msg: messages.unexpected_error,
        });
    }
}


