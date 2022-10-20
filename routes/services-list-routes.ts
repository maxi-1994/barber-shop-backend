import { Router } from 'express';
import { JWTvalidation } from '../middlewares/jwt-validation';
import { getServices } from '../controllers/services-list-controller';

export const servicesListRouter: Router = Router();

servicesListRouter.get('/get-services', JWTvalidation, getServices);