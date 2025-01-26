import { chatController } from '@controllers';
import { userGuardHandler } from '@middlewares';

const InitRoutesChat = (router) => {
  router
    .route('/access')
    .post(userGuardHandler.checkJWT, chatController.accessChat)
    .get(userGuardHandler.checkJWT, chatController.getAccessChat);
  router
    .route('/private')
    .get(userGuardHandler.checkJWT, chatController.findOneByPrivate);

  router
    .route('/not-read')
    .get(userGuardHandler.checkJWT, chatController.findNotReadChat);

  router
    .route('/pagination')
    .get(userGuardHandler.checkJWT, chatController.findManyChatPagination);

  router.route('/seen').put(userGuardHandler.checkJWT, chatController.seenChat);

  router.route('/pin').put(userGuardHandler.checkJWT, chatController.pinChat);

  router
    .route('/total-together')
    .get(userGuardHandler.checkJWT, chatController.getTotalTogether);

  router
    .route('/group')
    .post(userGuardHandler.checkJWT, chatController.createGroupChat)
    .put(userGuardHandler.checkJWT, chatController.updateGroupChat)
    .get(userGuardHandler.checkJWT, chatController.findManyGroups);

  router
    .route('/delete')
    .delete(userGuardHandler.checkJWT, chatController.deleteChat);

  router
    .route('/group/out')
    .put(userGuardHandler.checkJWT, chatController.outGroupChat);

  router
    .route('/message')
    .post(userGuardHandler.checkJWT, chatController.sendMessage);
  router
    .route('/message/pagination')
    .get(userGuardHandler.checkJWT, chatController.findManyMessagePagination);

  router
    .route('/background/pagination')
    .get(
      userGuardHandler.checkJWT,
      chatController.findManyBackgroundPagination
    );

  router
    .route('/background')
    .put(userGuardHandler.checkJWT, chatController.setBackgroundForChat);

  router
    .route('/feeling', userGuardHandler.checkJWT)
    .post(chatController.addFeeling)
    .put(chatController.clearReactions);
  router
    .route('/messages/total', userGuardHandler.checkJWT)
    .get(chatController.getTotalMessages);
  router
    .route('/message/recall')
    .put(userGuardHandler.checkJWT, chatController.recallMessage);
  router
    .route('/message/deleteMessage')
    .put(userGuardHandler.checkJWT, chatController.deleteMessage);
  router
    .route('/message/pinMessage')
    .put(userGuardHandler.checkJWT, chatController.pinMessage);
  router
    .route('/message/unPinMessage')
    .put(userGuardHandler.checkJWT, chatController.unPinMessage);
  router
    .route('/addMembers')
    .put(userGuardHandler.checkJWT, chatController.addMembers);
  router
    .route('/message/deleteMemer')
    .put(userGuardHandler.checkJWT, chatController.deleteMember);
  router
    .route('/message/getAllPicture')
    .get(userGuardHandler.checkJWT, chatController.findManyImagePagination);
  router
    .route('/message/getAllFile')
    .get(userGuardHandler.checkJWT, chatController.findManyFilePagination);
  // disband by leader
  router
    .route('/grantGroupLeader')
    .put(userGuardHandler.checkJWT, chatController.disbandByLeader);
  router
    .route('/getListGroupMember')
    .get(userGuardHandler.checkJWT, chatController.getListGroupMember);

  router
    .route('/notify')
    .post(userGuardHandler.checkJWT, chatController.notifyMessage);

  router
    .route('/group/grant')
    .put(userGuardHandler.checkJWT, chatController.grantGroupChat);

  router
    .route('/group/dissolution')
    .post(userGuardHandler.checkJWT, chatController.dissolutionGroupChat);

  return router;
};

module.exports = InitRoutesChat;
