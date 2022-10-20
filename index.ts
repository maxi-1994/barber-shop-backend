import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { apiUrls } from './utils/constants/apiUrls';
import { dbConnection } from './database/config';
import { authRouter } from './routes/auth-routes';
import { usersRouter } from './routes/users-routes';
import { barberRouter } from './routes/barbers-routes';
import { appointmentRouter } from './routes/appointment-routes';
import { servicesListRouter } from './routes/services-list-routes';

dotenv.config();

// Server
const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

// DB Connection
dbConnection();

// Routes
app.use(apiUrls.login, authRouter);
app.use(apiUrls.users, usersRouter);
app.use(apiUrls.barbers, barberRouter);
app.use(apiUrls.appointments, appointmentRouter);
app.use(apiUrls.servicesList, servicesListRouter);

app.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
});