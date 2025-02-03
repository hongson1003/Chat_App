import { appRoutes } from '@/constants';
import { authController } from '@/controllers';
import { userGuardHandler } from '@/middlewares';

const initRoutesAuthentication = (router) => {
  router.route(appRoutes.ROOT).post(authController.register);

  router.route(appRoutes.LOGIN).post(authController.login);

  router.route(appRoutes.LOGOUT).post(authController.logout);

  router
    .route(appRoutes.CHECK)
    .post(userGuardHandler.privateRoute, authController.extractToken);

  router.route(appRoutes.REFRESH_TOKEN).post(authController.refreshToken);

  router.route(appRoutes.VERIFY_ID_TOKEN).get(authController.verifyIdToken);

  router.route(appRoutes.RESET_PASSWORD).post(authController.resetPassword);

  // router
  //   .route(appRoutes.CHANGE_PASSWORD)
  //   .put(userGuardHandler.privateRoute, authController.changePassword);

  return router;
};

module.exports = initRoutesAuthentication;
