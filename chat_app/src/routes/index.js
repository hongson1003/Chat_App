import express from 'express';
import InitAuthenticationRoutes from './authRoute';
import InitUserRoutes from './userRoute';
import InitChatRoutes from './chatRoute';
import { appRoutes } from '@constants';

const router = express.Router();

const configRoutes = async (app) => {
  app.get(appRoutes.HEALTH, (req, res) => {
    return res.status(200).send({
      status: 'OK',
      message: 'Server is up and running',
    });
  });
  app.use(appRoutes.AUTH, InitAuthenticationRoutes(router));
  app.use(appRoutes.USERS, InitUserRoutes(router));
  app.use(appRoutes.CHATS, InitChatRoutes(router));
};

module.exports = configRoutes;
