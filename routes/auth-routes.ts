import { Router } from 'express';
import { check } from 'express-validator';
import { requestValidation } from '../middlewares/request-validation'
import { messages } from '../utils/constants/messages';
import { login } from '../controllers/auth-controller';

// '/api/login'
export const authRouter: Router = Router();

authRouter.post('/', [
    check('email', messages.required_email).isEmail(),
    check('password', messages.required_password).not().isEmpty(),
    requestValidation,
], login);