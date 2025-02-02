require('dotenv').config();
require('module-alias/register');

import { connectNoSql } from '@configs/nosql';
import { connectMySql } from '@configs/sql';
import { exceptionHandler } from '@middlewares';
import configRoutes from '@routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressValidator from 'express-validator';
import helmet from 'helmet';

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ['http://localhost:8096'];
  const origin = req.headers.origin;

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
  );

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(helmet());
app.use(expressValidator());

app.use(cookieParser());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

connectMySql();
connectNoSql();

configRoutes(app);

app.use(exceptionHandler.notFoundHandler);
app.use(exceptionHandler.errorHandler);

module.exports = app;
