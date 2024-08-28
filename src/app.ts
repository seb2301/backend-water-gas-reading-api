import express from 'express';
import dotenv from 'dotenv';
import uploadRoutes from './routes/upload';
import confirmRoutes from './routes/confirm';
import listRoutes from './routes/list';


dotenv.config();

const app = express();

app.use('/api', listRoutes);

app.use('/api', confirmRoutes);

app.use('/api', uploadRoutes);

app.use(express.json());

export default app;
