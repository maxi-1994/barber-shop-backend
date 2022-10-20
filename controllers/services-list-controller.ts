import { Request, Response } from 'express';

const servicesMocked = {
    corte: 'Corte',
    afeitedo: 'Afeitado',
    corteAfeitado: 'Corte y afeitado',
}

export const getServices = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
        successful: true,
        servicesMocked,
    });
}

// TODO: Generar DB con servicios para que un adminsitrador pueda tener funiconalidades CRUD.