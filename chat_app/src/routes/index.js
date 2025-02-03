import { appRoutes } from '@/constants';
import express from 'express';
import initRoutesAuthentication from './authRoute';
import initChatRoutes from './chatRoute';
import initUserRoutes from './userRoute';

const router = express.Router();

const configRoutes = async (app) => {
  app.get(appRoutes.HEALTH, (req, res) => {
    return res.status(200).send({
      status: 'OK',
      message: 'Server is up and running',
    });
  });
  app.use(appRoutes.AUTH, initRoutesAuthentication(router));
  app.use(appRoutes.USERS, initUserRoutes(router));
  app.use(appRoutes.CHATS, initChatRoutes(router));
};

module.exports = configRoutes;
