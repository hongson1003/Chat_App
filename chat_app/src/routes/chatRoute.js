import { appRoutes } from '@constants';
import { chatController } from '@controllers';
import { userGuardHandler } from '@middlewares';

const InitRoutesChat = (router) => {
  router
    .route(appRoutes.ACCESS)
    .post(userGuardHandler.privateRoute, chatController.accessChat)
    .get(userGuardHandler.privateRoute, chatController.getAccessChat);
  router
    .route(appRoutes.PRIVATE)
    .get(userGuardHandler.privateRoute, chatController.findOneByPrivate);

  router
    .route(appRoutes.NOT_READ)
    .get(userGuardHandler.privateRoute, chatController.findNotReadChat);

  router
    .route(appRoutes.PAGINATION)
    .get(userGuardHandler.privateRoute, chatController.findManyChatPagination);

  router
    .route(appRoutes.SEEN)
    .put(userGuardHandler.privateRoute, chatController.seenChat);

  router
    .route(appRoutes.PIN)
    .put(userGuardHandler.privateRoute, chatController.pinChat);

  router
    .route(appRoutes.TOTAL_TOGETHER)
    .get(userGuardHandler.privateRoute, chatController.getTotalTogether);

  router
    .route(appRoutes.GROUP)
    .post(userGuardHandler.privateRoute, chatController.createGroupChat)
    .put(userGuardHandler.privateRoute, chatController.updateGroupChat)
    .get(userGuardHandler.privateRoute, chatController.findManyGroups);

  router
    .route(appRoutes.DELETE)
    .delete(userGuardHandler.privateRoute, chatController.deleteChat);

  router
    .route(appRoutes.GROUP_OUT)
    .put(userGuardHandler.privateRoute, chatController.outGroupChat);

  router
    .route(appRoutes.MESSAGE)
    .post(userGuardHandler.privateRoute, chatController.sendMessage);
  router
    .route(appRoutes.MESSAGE_PAGINATION)
    .get(
      userGuardHandler.privateRoute,
      chatController.findManyMessagePagination
    );

  router
    .route(appRoutes.BACKGROUND)
    .put(userGuardHandler.privateRoute, chatController.setBackgroundForChat);

  router
    .route(appRoutes.FEELING, userGuardHandler.privateRoute)
    .post(chatController.addFeeling)
    .put(chatController.clearReactions);
  router
    .route(appRoutes.TOTAL, userGuardHandler.privateRoute)
    .get(chatController.getTotalMessages);
  router
    .route(appRoutes.RECALL)
    .put(userGuardHandler.privateRoute, chatController.recallMessage);
  router
    .route(appRoutes.DELETE_MESSAGE)
    .put(userGuardHandler.privateRoute, chatController.deleteMessage);
  router
    .route(appRoutes.PIN_MESSAGE)
    .put(userGuardHandler.privateRoute, chatController.pinMessage);
  router
    .route(appRoutes.UN_PIN_MESSAGE)
    .put(userGuardHandler.privateRoute, chatController.unPinMessage);
  router
    .route(appRoutes.ADD_MEMBERS)
    .put(userGuardHandler.privateRoute, chatController.addMembers);
  router
    .route(appRoutes.DELETE_MEMBER)
    .put(userGuardHandler.privateRoute, chatController.deleteMember);
  router
    .route(appRoutes.GET_ALL_PICTURE)
    .get(userGuardHandler.privateRoute, chatController.findManyImagePagination);
  router
    .route(appRoutes.GET_ALL_FILE)
    .get(userGuardHandler.privateRoute, chatController.findManyFilePagination);
  // disband by leader
  router
    .route(appRoutes.GRANT_GROUP_LEADER)
    .put(userGuardHandler.privateRoute, chatController.disbandByLeader);
  router
    .route(appRoutes.GET_LIST_GROUP_MEMBER)
    .get(userGuardHandler.privateRoute, chatController.getListGroupMember);

  router
    .route(appRoutes.NOTIFY)
    .post(userGuardHandler.privateRoute, chatController.notifyMessage);

  router
    .route(appRoutes.GROUP_GRANT)
    .put(userGuardHandler.privateRoute, chatController.grantGroupChat);

  router
    .route(appRoutes.GROUP_DISSOLVE)
    .post(userGuardHandler.privateRoute, chatController.dissolutionGroupChat);

  return router;
};

module.exports = InitRoutesChat;
