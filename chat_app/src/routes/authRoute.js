import { appController } from '@controllers';
import { userGuardHandler } from '@middlewares';

const InitRoutesAuthentication = (router) => {
  router.route('/').post(appController.register);

  router.route('/login').post(appController.login);

  router.route('/logout').post(appController.logout);

  router.route('/check').post(appController.check);

  router.route('/verify').post(appController.verifyUser);
  router.route('/reset-password').post(appController.resetPassword);

  router
    .route('/change-password')
    .put(userGuardHandler.checkJWT, appController.changePassword);

  return router;
};

module.exports = InitRoutesAuthentication;
