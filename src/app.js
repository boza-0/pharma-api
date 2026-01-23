import express from 'express';
import { router as apiRouter } from './routes/index.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use(notFound);
app.use(errorHandler);
