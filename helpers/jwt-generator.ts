import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

export const getToken = (id: string): Promise<any> => {

    const payload: JwtPayload = { id };
    const privateKey: Secret = process.env.SECRET_KEY || '';

    return new Promise((resolve, reject): void => {
        jwt.sign(
            payload, 
            privateKey, 
            { 
                expiresIn: '12h' 
            }, 
            (err: Error | null, token: any): void => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });

}