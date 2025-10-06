import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import AppError from './utils/appError.js';

const app = express();

import userRouter from './routes/userRoutes.js';

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cors());
app.use(compression());

// ROUTES
app.use('/api/v1/users', userRouter);

export default app;
