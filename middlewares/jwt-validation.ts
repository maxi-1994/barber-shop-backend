import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user';
import { IUser } from '../utils/interfaces/user-interface';
import { messages } from '../utils/constants/messages';

let idVerified: string;

export const JWTvalidation = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined => {
    const privateKey: Secret = process.env.SECRET_KEY || '';
    const token: string = req.header('x-token') || '';

    if (!token) {
        return res.status(401).json({
            successful: false,
            msg: messages.unauthorized_user,
        });
    }

    try {
        const tokenVerified: JwtPayload = jwt.verify(token, privateKey, {complete: true}); // obtengo el token decoded para saber el id del usuario que hizo la request.
        idVerified = tokenVerified.payload.id; // Guardo el id del usuario obtenido
        next();
    } catch(error) {
        return res.status(401).json({
            successful: false,
            msg: messages.invalid_token,
        });
    }
}

export const validateAdminRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: IUser | null = await User.findById(idVerified); // Por medio del id del usuario obtenido en JWTvalidation. Lo busco en la BD y verifico si tinen el role de administrador.

        if (!user) {
            return res.status(404).json({
                successful: false,
                msg: messages.user_does_not_exist
            });
        }

        if (user.role !== 'ADMIN_USER') {
            return res.status(403).json({
                successful: false,
                msg: messages.unauthorized_user,
            });
        }

        next();
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: messages.unexpected_error,
        });
    }
}