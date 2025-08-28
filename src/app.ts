/* eslint-disable import/order */
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

import achievementRouter from '@api/achievement/achievement-router';
import activityRouter from '@api/activity/activity-router';
import activityCategoryRouter from '@api/activity-category/activity-category-router';
import googleAuthenticationRouter from '@api/authentication/google-authentication-router';
import userAuthenticationRouter from '@api/authentication/user-authentication-router';
import mediaRouter from '@api/media/media-router';
import circularRouter from '@api/circular/circular-router';
import { errorHandler } from '@api/middleware/error-handler';
import { jwtHandler } from '@api/middleware/jwt-handler';
import classRouter from '@api/class/class-router';
import studentRouter from '@api/student/student-router';
import userMaintenanceRouter from '@api/user/user-router';
import userRegistrationRouter from '@api/user-registration/user-registration-router';

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
      'TraceParent',
      'b3',
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
app.use('/classes', classRouter);
app.use('/students', studentRouter);
app.use('/activity-categories', activityCategoryRouter);
app.use('/activities', activityRouter);
app.use('/achievements', achievementRouter);
app.use('/circulars', circularRouter);
app.use('/media', mediaRouter);
app.use(errorHandler); // Global error handler

export default app;
