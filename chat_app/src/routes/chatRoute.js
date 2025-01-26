import { appRoutes } from '@constants';
import { chatController } from '@controllers';
import { userGuardHandler } from '@middlewares';

const InitRoutesChat = (router) => {
  router
    .route(appRoutes.ACCESS)
    .post(userGuardHandler.checkJWT, chatController.accessChat)
    .get(userGuardHandler.checkJWT, chatController.getAccessChat);
  router
    .route(appRoutes.PRIVATE)
    .get(userGuardHandler.checkJWT, chatController.findOneByPrivate);

  router
    .route(appRoutes.NOT_READ)
    .get(userGuardHandler.checkJWT, chatController.findNotReadChat);

  router
    .route(appRoutes.PAGINATION)
    .get(userGuardHandler.checkJWT, chatController.findManyChatPagination);

  router
    .route(appRoutes.SEEN)
    .put(userGuardHandler.checkJWT, chatController.seenChat);

  router
    .route(appRoutes.PIN)
    .put(userGuardHandler.checkJWT, chatController.pinChat);

  router
    .route(appRoutes.TOTAL_TOGETHER)
    .get(userGuardHandler.checkJWT, chatController.getTotalTogether);

  router
    .route(appRoutes.GROUP)
    .post(userGuardHandler.checkJWT, chatController.createGroupChat)
    .put(userGuardHandler.checkJWT, chatController.updateGroupChat)
    .get(userGuardHandler.checkJWT, chatController.findManyGroups);

  router
    .route(appRoutes.DELETE)
    .delete(userGuardHandler.checkJWT, chatController.deleteChat);

  router
    .route(appRoutes.GROUP_OUT)
    .put(userGuardHandler.checkJWT, chatController.outGroupChat);

  router
    .route(appRoutes.MESSAGE)
    .post(userGuardHandler.checkJWT, chatController.sendMessage);
  router
    .route(appRoutes.MESSAGE_PAGINATION)
    .get(userGuardHandler.checkJWT, chatController.findManyMessagePagination);

  router
    .route(appRoutes.BACKGROUND)
    .put(userGuardHandler.checkJWT, chatController.setBackgroundForChat);

  router
    .route(appRoutes.FEELING, userGuardHandler.checkJWT)
    .post(chatController.addFeeling)
    .put(chatController.clearReactions);
  router
    .route(appRoutes.TOTAL, userGuardHandler.checkJWT)
    .get(chatController.getTotalMessages);
  router
    .route(appRoutes.RECALL)
    .put(userGuardHandler.checkJWT, chatController.recallMessage);
  router
    .route(appRoutes.DELETE_MESSAGE)
    .put(userGuardHandler.checkJWT, chatController.deleteMessage);
  router
    .route(appRoutes.PIN_MESSAGE)
    .put(userGuardHandler.checkJWT, chatController.pinMessage);
  router
    .route(appRoutes.UN_PIN_MESSAGE)
    .put(userGuardHandler.checkJWT, chatController.unPinMessage);
  router
    .route(appRoutes.ADD_MEMBERS)
    .put(userGuardHandler.checkJWT, chatController.addMembers);
  router
    .route(appRoutes.DELETE_MEMBER)
    .put(userGuardHandler.checkJWT, chatController.deleteMember);
  router
    .route(appRoutes.GET_ALL_PICTURE)
    .get(userGuardHandler.checkJWT, chatController.findManyImagePagination);
  router
    .route(appRoutes.GET_ALL_FILE)
    .get(userGuardHandler.checkJWT, chatController.findManyFilePagination);
  // disband by leader
  router
    .route(appRoutes.GRANT_GROUP_LEADER)
    .put(userGuardHandler.checkJWT, chatController.disbandByLeader);
  router
    .route(appRoutes.GET_LIST_GROUP_MEMBER)
    .get(userGuardHandler.checkJWT, chatController.getListGroupMember);

  router
    .route(appRoutes.NOTIFY)
    .post(userGuardHandler.checkJWT, chatController.notifyMessage);

  router
    .route(appRoutes.GROUP_GRANT)
    .put(userGuardHandler.checkJWT, chatController.grantGroupChat);

  router
    .route(appRoutes.GROUP_DISSOLVE)
    .post(userGuardHandler.checkJWT, chatController.dissolutionGroupChat);

  return router;
};

module.exports = InitRoutesChat;
