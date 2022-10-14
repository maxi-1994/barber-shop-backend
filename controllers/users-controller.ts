import { Request, Response } from 'express';
import { User } from '../models/user';
import { getToken } from '../helpers/jwt-generator';
import { messages } from '../utils/constants/messages';
import bcryptjs from 'bcryptjs';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}, 'name email role');
        return res.status(200).json({
            successfull: true,
            users
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            successful: false,
            msg: messages.unexpected_error,
        });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const emailExists = await User.findOne({ email: req?.body.email });

        if (emailExists) { 
            return res?.status(400).json({
                successful: true,
                msg: messages.email_already_exists,
            });    
        }

        const newOperator = {
            ...req.body,
            role: 'OPERATOR_USER'
        }

        const newUser = new User(newOperator);

        // Encriptar password
        const salt = bcryptjs.genSaltSync();
        newUser.password = bcryptjs.hashSync(req?.body.password, salt);

        const userCreated = await newUser.save();

        // Generar JWT
        const token = await getToken(userCreated._id);

        return res?.status(200).json({
            successful: true,
            userCreated,
            token,
            msg: messages.user_created,
        });

    } catch(error) {
        console.error(error);
        return res?.status(500).json({
            successful: false,
            msg: messages.unexpected_error,
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                successful: true,
                msg: messages.user_doesNot_exist
            });
        }

        const userUpdated = await User.findByIdAndUpdate(userId, req.body, { returnDocument: 'after' });

        return res.status(200).json({
            successful: true,
            msg: messages.user_updated,
            userUpdated,
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            successful: false,
            msg: messages.unexpected_error,
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                successful: true,
                msg: messages.user_doesNot_exist,
            });
        }

        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            successful: true,
            msg: messages.user_deleted,
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            successful: false,
            msg: messages.unexpected_error,
        });
    }
}