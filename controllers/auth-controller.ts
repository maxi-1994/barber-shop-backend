import { Request, Response } from 'express';
import { User } from '../models/user';
import { getToken } from '../helpers/jwt-generator';
import { messages } from '../utils/constants/messages';
import bcryptjs from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const validPassword = bcryptjs.compareSync(req.body.password, user?.password || '');

        if (!user || !validPassword) {
            return res.status(401).json({
                successful: false,
                msg: messages.wrong_access,
            });
        }

        const token = await getToken(user._id);

        return res.status(200).json({
            successful: true,
            msg: `${messages.welcome_message} ${user.name}`,
            user,
            token
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            successful: false,
            msg: messages.unexpected_error,
        });
    }
};