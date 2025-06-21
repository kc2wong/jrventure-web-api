import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRegistrationRouter from '@api/user-registration/user-registration-router';
import userAuthenticationRouter from '@api/authentication/user-authentication-router';
import googleAuthenticationRouter from '@api/authentication/google-authentication-router';
import userMaintenanceRouter from '@api/user/user-router';
import studentRouter from '@api/student/student-router';
import activityCategoryRouter from '@api/activity-category/activity-category-router';
import activityRouter from '@api/activity/activity-router';
import achievementRouter from '@api/achievement/achievement-router';
import mediaRouter from '@api/media/media-router';
import { errorHandler } from '@api/middleware/error-handler';
import cookieParser from 'cookie-parser';
import { jwtHandler } from '@api/middleware/jwt-handler';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(jwtHandler);
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
app.use('/activity-categories', activityCategoryRouter);
app.use('/activities', activityRouter);
app.use('/achievements', achievementRouter);
app.use('/media', mediaRouter);
app.use(errorHandler); // Global error handler

export default app;
