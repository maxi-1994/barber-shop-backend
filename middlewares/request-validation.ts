import { Request, Response, NextFunction } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';

export const requestValidation = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            successful: false,
            errors: errors.mapped(),
        })
    }

    next();
};