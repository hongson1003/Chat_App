import { appRoutes } from '@/constants';
import { appController } from '@controllers';
import { userGuardHandler } from '@middlewares';

const InitRoutesAuthentication = (router) => {
  router.route(appRoutes.ROOT).post(appController.register);

  router.route(appRoutes.LOGIN).post(appController.login);

  router.route(appRoutes.LOGOUT).post(appController.logout);

  router.route(appRoutes.CHECK).post(appController.check);

  router.route(appRoutes.VERIFY_ID_TOKEN).get(appController.verifyIdToken);

  router.route(appRoutes.VERIFY).post(appController.verifyUser);
  router.route(appRoutes.RESET_PASSWORD).post(appController.resetPassword);

  router
    .route(appRoutes.CHANGE_PASSWORD)
    .put(userGuardHandler.checkJWT, appController.changePassword);

  return router;
};

module.exports = InitRoutesAuthentication;
