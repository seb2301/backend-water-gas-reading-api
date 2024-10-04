import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AppDataSource } from './database/data-source';
import routes from './app/routes/measure.routes';

export const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
}));

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));

app.use(routes);

AppDataSource.initialize().then(() => {
  console.log('Database OK!');
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Servidor iniciado na porta ${process.env.PORT} 🚀`);
  });
});
