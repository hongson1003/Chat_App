import { appRoutes } from '@/constants';
import { authController } from '@controllers';
import { userGuardHandler } from '@middlewares';

const InitRoutesAuthentication = (router) => {
  router.route(appRoutes.ROOT).post(authController.register);

  router.route(appRoutes.LOGIN).post(authController.login);

  router.route(appRoutes.LOGOUT).post(authController.logout);

  router.route(appRoutes.CHECK).post(authController.check);

  router.route(appRoutes.VERIFY_ID_TOKEN).get(authController.verifyIdToken);

  router.route(appRoutes.VERIFY).post(authController.verifyUser);
  router.route(appRoutes.RESET_PASSWORD).post(authController.resetPassword);

  router
    .route(appRoutes.CHANGE_PASSWORD)
    .put(userGuardHandler.checkJWT, authController.changePassword);

  return router;
};

module.exports = InitRoutesAuthentication;
