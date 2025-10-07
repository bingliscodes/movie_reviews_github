import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import AppError from './utils/appError.js';

const app = express();

import userRouter from './routes/userRoutes.js';

const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:3000'], // allow both in dev
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'xhrFields', 'crossDomain'],
  credentials: true, // if you’re sending cookies / auth headers
};

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cors(corsOptions));
// app.use(cors());
app.use(compression());

// ROUTES
app.use('/api/v1/users', userRouter);

export default app;
