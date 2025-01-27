import { userActionKeys } from '../keys';

const initialState = {
  notificationsFriends: [],
  notificationsChats: [],
  sendMessageFunc: {},
  callMembers: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActionKeys.CHAT_STATUS.SELECTED_CHAT: {
      let stateSelectedChat = { ...state };
      stateSelectedChat.selectedChat = action.payload;
      return stateSelectedChat;
    }
    case userActionKeys.NOTIFICATIONS.FRIENDS: {
      let stateNotificationsFriends = { ...state };
      stateNotificationsFriends.notificationsFriends = action.payload;
      return stateNotificationsFriends;
    }
    case userActionKeys.NOTIFICATIONS.CHAT: {
      let stateNotificationsChats = { ...state };
      stateNotificationsChats.notificationsChats = action.payload;
      return stateNotificationsChats;
    }

    case userActionKeys.MESSAGES.SEND_MESSAGE_FUNC: {
      let stateSendMessageFunc = { ...state };
      stateSendMessageFunc.sendMessageFunc = action.payload;
      return stateSendMessageFunc;
    }

    case userActionKeys.NOTIFICATIONS.FETCH_NOTIFICATIONS_FRIENDS_FUNC: {
      let stateFetchNotificationsFunc = { ...state };
      stateFetchNotificationsFunc.fetchNotificationsFriends = action.payload;
      return stateFetchNotificationsFunc;
    }

    case userActionKeys.NOTIFICATIONS.FETCH_NOTIFICATIONS_CHAT_FUNC: {
      let stateFetchNotificationsChatFunc = { ...state };
      stateFetchNotificationsChatFunc.fetchNotificationChats = action.payload;
      return stateFetchNotificationsChatFunc;
    }

    case userActionKeys.CHAT_STATUS.FETCH: {
      let stateFetchFunc = { ...state };
      stateFetchFunc.fetchChats = action.payload;
      return stateFetchFunc;
    }

    case userActionKeys.MESSAGES.FETCH_MESSAGES_FUNC: {
      let stateFetchMessagesFunc = { ...state };
      stateFetchMessagesFunc.fetchMessages = action.payload;
      return stateFetchMessagesFunc;
    }

    default:
      return state;
  }
}
