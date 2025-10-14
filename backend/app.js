import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';

import AppError from './utils/appError.js';

const app = express();

import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';

const corsOptions = {
  origin: ['http://localhost:5173'], // allow both in dev
  credentials: true, // if you’re sending cookies / auth headers
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(compression());

// ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

export default app;
