import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.use(notFound);
app.use(errorHandler);
