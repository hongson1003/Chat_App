import { appRoutes } from '@constants';
import { userController } from '@controllers';
import { userGuardHandler } from '@middlewares';

const IntRoutesUsers = (router) => {
  router.route(appRoutes.GET_MANY).post(userController.getMany);

  router
    .route(appRoutes.INFO)
    .get(userGuardHandler.checkJWT, userController.findUserById);

  router.route(appRoutes.USER_BY_PHONE).get(userController.findUserByPhone);

  router
    .route(appRoutes.PROFILE)
    .post(userGuardHandler.checkJWT, userController.createInfoContact)
    .get(userGuardHandler.checkJWT, userController.getProfileByUserId);

  router
    .route(appRoutes.DETAIL)
    .get(userGuardHandler.checkJWT, userController.findUserWithProfileById);

  router
    .route(appRoutes.FRIENDSHIP)
    .get(userGuardHandler.checkJWT, userController.findFriendShip)
    .post(
      userGuardHandler.checkJWT,
      userController.sendRequestAddFriendOrRecall
    )
    .put(userGuardHandler.checkJWT, userController.acceptRequestAddFriend);

  router
    .route(appRoutes.FRIENDSHIP_REJECT)
    .put(userGuardHandler.checkJWT, userController.rejectFriendShip);

  router
    .route(appRoutes.FRIENDSHIP_UNFRIEND)
    .put(userGuardHandler.checkJWT, userController.unFriend);

  router
    .route(appRoutes.FRIENDS_LIMIT)
    .get(userGuardHandler.checkJWT, userController.findFriendsLimit);

  router
    .route(appRoutes.NOTIFICATION_FRIENDSHIP)
    .get(userGuardHandler.checkJWT, userController.findAllNotifications)
    .post(userGuardHandler.checkJWT, userController.updateNotification);

  router
    .route(appRoutes.NOTIFICATION_FRIENDSHIP_INVITED)
    .get(userGuardHandler.checkJWT, userController.findAllInvitedFriend);

  router
    .route(appRoutes.NOTIFICATION_FRIENDSHIP_SENT_INVITED)
    .get(userGuardHandler.checkJWT, userController.findAllSentInvitedFriend);

  router
    .route(appRoutes.UPDATE_INFO)
    .put(userGuardHandler.checkJWT, userController.updateUserInfor);

  router
    .route(appRoutes.AVATAR)
    .put(userGuardHandler.checkJWT, userController.updateAvatar);
  router
    .route(appRoutes.ONLINE)
    .put(userGuardHandler.checkJWT, userController.updateOnline);

  router
    .route(appRoutes.SEND_VERIFY_EMAIL)
    .post(userGuardHandler.checkJWT, userController.sendverifyEmail);

  router
    .route(appRoutes.VERIFY_EMAIL)
    .post(userGuardHandler.checkJWT, userController.verifyEmail);
  return router;
};

module.exports = IntRoutesUsers;
