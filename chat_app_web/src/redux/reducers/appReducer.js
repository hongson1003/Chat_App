import { appConstants } from '@/constants';
import { appActionKeys } from '../keys';

const initialState = {
  isLogin: appConstants.STATE.PENDING,
  userInfo: null,
  nav: appConstants.NAV_ITEMS.MESSAGE,
  subNav: null,
  isConnectedSocket: false,
  error: false,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case appActionKeys.LOGIN_STATUS.LOGIN_START: {
      let stateLoginSuccess = { ...state };
      stateLoginSuccess.userInfo = action.payload;
      return stateLoginSuccess;
    }

    case appActionKeys.LOGIN_STATUS.LOGIN_SUCCESS: {
      let stateLoginSuccess = { ...state };
      stateLoginSuccess.isLogin = appActionKeys.STATE.RESOLVE;
      stateLoginSuccess.userInfo = action.payload;
      return stateLoginSuccess;
    }

    case appActionKeys.LOGIN_STATUS.LOGIN_FAIL: {
      let stateLoginFail = { ...state };
      stateLoginFail.isLogin = appActionKeys.STATE.REJECT;
      return stateLoginFail;
    }

    case appActionKeys.LOGOUT_STATUS.LOGOUT_SUCCESS: {
      const resetState = {
        isLogin: appActionKeys.STATE.PENDING,
        userInfo: null,
        nav: KEYITEMS.MESSAGE,
        subNav: null,
        error: false,
      };
      return resetState;
    }
    case appActionKeys.LOGOUT_STATUS.LOGOUT_FAIL: {
      let stateLogoutSuccess = { ...state };
      return stateLogoutSuccess;
    }
    case appConstants.STATE.CHANGE_KEY_MENU: {
      let stateChangeKeyMenu = { ...state };
      stateChangeKeyMenu.nav = action.payload;
      return stateChangeKeyMenu;
    }
    case appConstants.STATE.CHANGE_SUB_KEY_MENU: {
      let stateChangeSubKeyMenu = { ...state };
      stateChangeSubKeyMenu.subNav = action.payload;
      return stateChangeSubKeyMenu;
    }
    case appConstants.SOCKET.CONNECTED_SUCCESS: {
      let stateConnected = { ...state };
      stateConnected.isConnectedSocket = true;
      return stateConnected;
    }
    case appConstants.SOCKET.DISCONNECTED_SUCCESS: {
      let stateDisconnected = { ...state };
      stateDisconnected.isConnectedSocket = false;
      return stateDisconnected;
    }
    case appConstants.STATE.ERROR: {
      let stateError = { ...state };
      stateError.error = true;
      return stateError;
    }
    case appConstants.STATE.ACCESS_CHAT: {
      let stateAccessChat = { ...state };
      stateAccessChat.subNav = {
        key: appConstants.STATE.ACCESS_CHAT,
        ...action.payload,
      };
      return stateAccessChat;
    }
    case appConstants.STATE.EDIT_USER: {
      let stateEditUser = { ...state };
      stateEditUser.userInfo = {
        user: {
          ...state.userInfo.user,
          ...action.payload,
        },
      };
      return stateEditUser;
    }
    case appConstants.STATE.EDIT_GROUP: {
      let stateEditGroup = { ...state };
      stateEditGroup.subNav = {
        ...state.subNav,
        ...action.payload,
      };
      return stateEditGroup;
    }
    default:
      return state;
  }
}
