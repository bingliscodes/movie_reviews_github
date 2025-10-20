import mongoose from 'mongoose';
import dotenv from 'dotenv';

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! Shutting down...');
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
import app from './app.js';

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.MONGODB_PASSWORD,
);

mongoose.connect(DB, {}).then(() => {
  console.log('DB connection successful!');
});

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
  res.send('Hello World!');
  next();
});

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  console.log('mode is', process.env.NODE_ENV);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection! Shutting down...');
  console.log(err);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated!');
  });
});

export default server;
