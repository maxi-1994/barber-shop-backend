import Router, { Express } from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/users-controller';
import { JWTvalidation, validateAdminRole } from '../middlewares/jwt-validation';
import { check } from 'express-validator';
import { requestValidation } from '../middlewares/request-validation'
import { messages } from '../utils/constants/messages';

// '/api/users'
export const usersRouter: Express = Router();

usersRouter.get('/get-users', JWTvalidation, getUsers);
usersRouter.post('/create-user', [
    JWTvalidation,
    validateAdminRole,
    check('name', messages.required_name).not().isEmpty(),
    check('email', messages.required_email).isEmail(),
    check('password', messages.required_password).not().isEmpty(),
    requestValidation
], createUser);
usersRouter.put('/update-user/:id', [
    JWTvalidation, 
    validateAdminRole,
    check('name', messages.required_name).not().isEmpty(),
    check('email', messages.required_email).isEmail(),
    check('role', messages.required_role).not().isEmpty(),
    requestValidation
], updateUser);
usersRouter.delete('/delete-user/:id',[JWTvalidation, validateAdminRole], deleteUser);

