import express, { json } from 'express';
const app = express();
import errorMiddleware from './middlewares/error';

import cookieParser from 'cookie-parser';

import cors from 'cors';

app.use(json())
app.use(cookieParser())
app.use(cors())

import auth from './routes/auth';
import client from './routes/client';
import pret from './routes/pret';


app.use('/api/v1', auth)
app.use('/api/v1', client)
app.use('/api/v1', pret)



app.use(errorMiddleware);

export default app