import { appRoutes } from '@constants';
import { userController } from '@controllers';
import { userGuardHandler } from '@middlewares';

const IntRoutesUsers = (router) => {
  router.route(appRoutes.GET_MANY).post(userController.getMany);

  router
    .route(appRoutes.INFO)
    .get(userGuardHandler.privateRoute, userController.findUserById);

  router
    .route(appRoutes.USER_BY_PHONE)
    .get(userController.findUserByPhoneNumber);

  router
    .route(appRoutes.PROFILE)
    .post(userGuardHandler.privateRoute, userController.createInfoContact)
    .get(userGuardHandler.privateRoute, userController.getProfileByUserId);

  router
    .route(appRoutes.DETAIL)
    .get(userGuardHandler.privateRoute, userController.findUserWithProfileById);

  router
    .route(appRoutes.FRIENDSHIP)
    .get(userGuardHandler.privateRoute, userController.findFriendShip)
    .post(
      userGuardHandler.privateRoute,
      userController.sendRequestAddFriendOrRecall
    )
    .put(userGuardHandler.privateRoute, userController.acceptRequestAddFriend);

  router
    .route(appRoutes.FRIENDSHIP_REJECT)
    .put(userGuardHandler.privateRoute, userController.rejectFriendShip);

  router
    .route(appRoutes.FRIENDSHIP_UNFRIEND)
    .put(userGuardHandler.privateRoute, userController.unFriend);

  router
    .route(appRoutes.FRIENDS_LIMIT)
    .get(userGuardHandler.privateRoute, userController.findFriendsLimit);

  router
    .route(appRoutes.NOTIFICATION_FRIENDSHIP)
    .get(userGuardHandler.privateRoute, userController.findAllNotifications)
    .post(userGuardHandler.privateRoute, userController.updateNotification);

  router
    .route(appRoutes.NOTIFICATION_FRIENDSHIP_INVITED)
    .get(userGuardHandler.privateRoute, userController.findAllInvitedFriend);

  router
    .route(appRoutes.NOTIFICATION_FRIENDSHIP_SENT_INVITED)
    .get(
      userGuardHandler.privateRoute,
      userController.findAllSentInvitedFriend
    );

  router
    .route(appRoutes.UPDATE_INFO)
    .put(userGuardHandler.privateRoute, userController.updateUserInfor);

  router
    .route(appRoutes.AVATAR)
    .put(userGuardHandler.privateRoute, userController.updateAvatar);
  router
    .route(appRoutes.ONLINE)
    .put(userGuardHandler.privateRoute, userController.updateOnline);

  router
    .route(appRoutes.SEND_VERIFY_EMAIL)
    .post(userGuardHandler.privateRoute, userController.sendverifyEmail);

  router
    .route(appRoutes.VERIFY_EMAIL)
    .post(userGuardHandler.privateRoute, userController.verifyEmail);
  return router;
};

module.exports = IntRoutesUsers;
