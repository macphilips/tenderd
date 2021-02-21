import express from 'express';
import path from 'path';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { createServices } from './config';
import registerModules from './modules';

export const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  app.use(
    expressWinston.logger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      )
    })
  );

  app.use(
    expressWinston.errorLogger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      )
    })
  );
}

app.use(express.static(path.join(__dirname, '../public')));

registerModules(app, createServices());
