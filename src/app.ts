import express from 'express';
import dotenv from 'dotenv';
import ExpressApplication from './bootstrapper';
import logger from './lib/logger';

// Load envs based on current NODE_ENV
dotenv.config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
});

const PORT = process.env.PORT || 5000;

const app = new ExpressApplication(
  PORT,
  [express.json({ limit: '10kb' }), express.urlencoded({ extended: true, limit: '10kb' })],
  [],
);

const server = app.start();

// Handle SIGTERM
process.on('SIGTERM', () => {
  logger.warn('SIGTERM RECIEVED!');
  server.close(() => {
    logger.warn('Process Terminated');
  });
});
