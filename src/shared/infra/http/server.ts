import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'dotenv/config';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';

import '@shared/container';

import { router } from './routes';

const port = process.env.PORT || 3333;

createConnection();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.uploadFolder));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(port, () => console.log(`Server is running on port:${port}`));
