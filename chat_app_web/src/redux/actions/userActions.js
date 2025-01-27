import { appActionKeys, userActionKeys } from '@/redux';

export const userActions = {
  notificationsFriends: (notifications) => ({
    type: userActionKeys.NOTIFICATIONS.FRIENDS,
    payload: notifications,
  }),

  notificationsChats: (notifications) => ({
    type: userActionKeys.NOTIFICATIONS.CHAT,
    payload: notifications,
  }),

  accessChat: (chat) => ({
    type: appActionKeys.STATE.ACCESS_CHAT,
    payload: chat,
  }),

  fetchNotificationsFriendFunc: (func) => ({
    type: userActionKeys.NOTIFICATIONS.FETCH_NOTIFICATIONS_FRIENDS_FUNC,
    payload: func,
  }),

  fetchNotificationChatFunc: (func) => ({
    type: userActionKeys.NOTIFICATIONS.FETCH_NOTIFICATIONS_CHAT_FUNC,
    payload: func,
  }),

  fetchChatsFunc: (func) => ({
    type: userActionKeys.CHAT_STATUS.FETCH,
    payload: func,
  }),

  fetchMessages: (func) => ({
    type: userActionKeys.MESSAGES.FETCH_MESSAGES_FUNC,
    payload: func,
  }),

  addMemberCall: (member) => ({
    type: userActionKeys.CALL.ADD_MEMBER,
    payload: member,
  }),
};
