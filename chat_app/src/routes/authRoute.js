import { appRoutes } from '@/constants';
import { authController } from '@/controllers';
import { userGuardHandler } from '@/middlewares';

const initRoutesAuthentication = (router) => {
  router.route(appRoutes.ROOT).post(authController.register);

  router.route(appRoutes.LOGIN).post(authController.login);

  router.route(appRoutes.QR_LOGIN).post(authController.qrLogin);

  router.route(appRoutes.LOGOUT).post(authController.logout);

  router.route(appRoutes.FORGOT_PASSWORD).post(authController.forgotPassword);

  router
    .route(appRoutes.CHECK)
    .post(userGuardHandler.privateRoute, authController.extractToken);

  router.route(appRoutes.REFRESH_TOKEN).post(authController.refreshToken);

  router.route(appRoutes.VERIFY_ID_TOKEN).get(authController.verifyIdToken);

  return router;
};

module.exports = initRoutesAuthentication;
