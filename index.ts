import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { dbConnection } from './database/config';
import { authRouter } from './routes/auth-routes';
import { usersRouter } from './routes/users-routes';
import { barberRouter } from './routes/barbers-routes';

dotenv.config();

// Server
const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

// DB Connection
dbConnection();

// Routes
app.use('/api/login', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/barbers', barberRouter);

app.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
});