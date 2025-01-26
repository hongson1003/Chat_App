import { userController } from '@controllers';
import { userGuardHandler } from '@middlewares';

const IntRoutesUsers = (router) => {
  router.route('/test').get(userController.testAPI);

  router.route('/getMany').post(userController.getMany);

  router
    .route('/info')
    .get(userGuardHandler.checkJWT, userController.findUserById);

  router.route('/user-by-phone').get(userController.findUserByPhone);

  router
    .route('/profile')
    .post(userGuardHandler.checkJWT, userController.createInfoContact)
    .get(userGuardHandler.checkJWT, userController.getProfileByUserId);

  router
    .route('/detail')
    .get(userGuardHandler.checkJWT, userController.findUserWithProfileById);

  router
    .route('/friendShip')
    .get(userGuardHandler.checkJWT, userController.findFriendShip)
    .post(
      userGuardHandler.checkJWT,
      userController.sendRequestAddFriendOrRecall
    )
    .put(userGuardHandler.checkJWT, userController.acceptRequestAddFriend);

  router
    .route('/friendShip/reject')
    .put(userGuardHandler.checkJWT, userController.rejectFriendShip);

  router
    .route('/friendShip/unfriend')
    .put(userGuardHandler.checkJWT, userController.unFriend);

  router
    .route('/friends')
    .get(userGuardHandler.checkJWT, userController.findFriendsLimit);

  router
    .route('/notifications/friendShip')
    .get(userGuardHandler.checkJWT, userController.findAllNotifications)
    .post(userGuardHandler.checkJWT, userController.updateNotification);

  router
    .route('/notifications/friendShip/invited')
    .get(userGuardHandler.checkJWT, userController.findAllInvitedFriend);

  router
    .route('/notifications/friendShip/sentInvited')
    .get(userGuardHandler.checkJWT, userController.findAllSentInvitedFriend);

  router
    .route('/updateInfor')
    .put(userGuardHandler.checkJWT, userController.updateUserInfor);

  router
    .route('/avatar')
    .put(userGuardHandler.checkJWT, userController.updateAvatar);
  router
    .route('/updateOnline')
    .put(userGuardHandler.checkJWT, userController.updateOnline);

  router
    .route('/send-verify-email')
    .post(userGuardHandler.checkJWT, userController.sendverifyEmail);

  router
    .route('/verify-email')
    .post(userGuardHandler.checkJWT, userController.verifyEmail);
  return router;
};

module.exports = IntRoutesUsers;
