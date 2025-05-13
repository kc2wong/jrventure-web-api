import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRegistrationRouter from './rest/route/user-registration-end-point';
import userAuthenticationRouter from './rest/route/user-authentication-end-point';
import googleAuthenticationRouter from './rest/route/google-authentication-end-point';
import userMaintenanceRouter from './rest/route/user-maintenance-end-point';
import studentRouter from './rest/route/student-end-point';
import { errorHandler } from './rest/middleware/error-handler';
import cookieParser from 'cookie-parser';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: '*', // Allow all origins
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-span-id',
      'x-trace-id',
    ],
    credentials: true, // Allow credentials like cookies or Authorization headers
  })
);

app.get('/health', (_req, res) => {
  res.json({ status: 'up' });
});
app.use('/user-registrations', userRegistrationRouter);
app.use('/user-authentications', userAuthenticationRouter);
app.use('/google-authentications', googleAuthenticationRouter);
app.use('/users', userMaintenanceRouter);
app.use('/students', studentRouter);
app.use(errorHandler); // Global error handler

export default app;
