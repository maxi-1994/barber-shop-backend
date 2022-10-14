import moongose from 'mongoose';

export const dbConnection = async (): Promise<any> => {
    try {
        const uriDB: string = process.env.DB_CNN || '';
        await moongose.connect(uriDB);
        console.log('DB connected');
    } catch(error) {
        console.log(error);
        throw new Error('Error starting DB. Check logs...');
    }
};
