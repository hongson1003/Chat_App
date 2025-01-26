import express from 'express';
import InitAuthenticationRoutes from './authRoute';
import InitUserRoutes from './userRoute';
import InitChatRoutes from './chatRoute';

const router = express.Router();

const configRoutes = async (app) => {
  app.get('/health', (req, res) => {
    return res.status(200).send({
      status: 'OK',
      message: 'Server is up and running',
    });
  });
  app.use('/auth', InitAuthenticationRoutes(router));
  app.use('/users', InitUserRoutes(router));
  app.use('/chat', InitChatRoutes(router));
};

module.exports = configRoutes;
