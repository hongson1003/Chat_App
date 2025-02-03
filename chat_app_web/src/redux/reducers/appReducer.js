import { appConstants } from '@/constants';
import { appActionKeys } from '../keys';

const initialState = {
  state: appConstants.STATE.PENDING,
  isLogin: false,
  userInfo: null,
  nav: appConstants.NAV_ITEMS_KEY.MESSAGE,
  subNav: null,
  isConnectedSocket: false,
  error: false,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case appActionKeys.LOGIN_STATUS.LOGIN_START: {
      let stateLoginStart = { ...state };
      stateLoginStart.userInfo = action.payload;
      stateLoginStart.state = appConstants.STATE.PENDING;
      stateLoginStart.isLogin = false;
      return stateLoginStart;
    }

    case appActionKeys.LOGIN_STATUS.LOGIN_SUCCESS: {
      let stateLoginSuccess = { ...state };
      stateLoginSuccess.isLogin = true;
      stateLoginSuccess.userInfo = action.payload;
      stateLoginSuccess.state = appConstants.STATE.RESOLVE;
      return stateLoginSuccess;
    }

    case appActionKeys.LOGIN_STATUS.LOGIN_FAIL: {
      let stateLoginFail = { ...state };
      stateLoginFail.isLogin = false;
      stateLoginFail.userInfo = null;
      stateLoginFail.state = appConstants.STATE.REJECT;
      return stateLoginFail;
    }

    case appActionKeys.LOGOUT_STATUS.LOGOUT_START: {
      let stateLogoutStart = { ...state };
      stateLogoutStart.state = appConstants.STATE.PENDING;
      return stateLogoutStart;
    }

    case appActionKeys.LOGOUT_STATUS.LOGOUT_SUCCESS: {
      let resetState = { ...initialState };
      resetState.state = appConstants.STATE.RESOLVE;
      return resetState;
    }

    case appActionKeys.LOGOUT_STATUS.LOGOUT_FAIL: {
      let stateLogoutSuccess = { ...state };
      stateLogoutSuccess.state = appConstants.STATE.REJECT;
      return stateLogoutSuccess;
    }

    case appActionKeys.CHANGE_KEY_MENU.CHANGE_KEY_MENU_START: {
      let stateChangeKeyMenuStart = { ...state };
      stateChangeKeyMenuStart.state = appConstants.STATE.PENDING;
      return stateChangeKeyMenuStart;
    }

    case appActionKeys.CHANGE_KEY_MENU.CHANGE_KEY_MENU_SUCCESS: {
      let stateChangeKeyMenu = { ...state };
      stateChangeKeyMenu.nav = action.payload;
      stateChangeKeyMenu.state = appConstants.STATE.RESOLVE;

      return stateChangeKeyMenu;
    }

    case appActionKeys.CHANGE_KEY_MENU.CHANGE_KEY_MENU_FAIL: {
      let stateChangeKeyMenuFail = { ...state };
      stateChangeKeyMenuFail.state = appConstants.STATE.REJECT;
      return stateChangeKeyMenuFail;
    }

    case appActionKeys.CHANGE_SUB_KEY_MENU.CHANGE_SUB_KEY_MENU_START: {
      let stateChangeSubKeyMenu = { ...state };
      stateChangeSubKeyMenu.state = appConstants.STATE.PENDING;
      return stateChangeSubKeyMenu;
    }

    case appActionKeys.CHANGE_SUB_KEY_MENU.CHANGE_SUB_KEY_MENU_SUCCESS: {
      let stateChangeSubKeyMenu = { ...state };
      stateChangeSubKeyMenu.subNav = action.payload;
      stateChangeSubKeyMenu.state = appConstants.STATE.RESOLVE;
      return stateChangeSubKeyMenu;
    }

    case appActionKeys.SOCKET.SOCKET_CONNECT_START: {
      let stateConnected = { ...state };
      stateConnected.state = appConstants.STATE.PENDING;
      return stateConnected;
    }

    case appActionKeys.SOCKET.CONNECTED_SUCCESS: {
      let stateConnected = { ...state };
      stateConnected.isConnectedSocket = true;
      return stateConnected;
    }

    case appActionKeys.SOCKET.CONNECTED_FAIL: {
      let stateConnected = { ...state };
      stateConnected.state = appConstants.STATE.REJECT;
      return stateConnected;
    }

    case appActionKeys.SOCKET.SOCKET_DISCONNECT_START: {
      let stateDisconnected = { ...state };
      stateDisconnected.state = appConstants.STATE.PENDING;
      return stateDisconnected;
    }

    case appActionKeys.SOCKET.SOCKET_DISCONNECT_SUCCESS: {
      let stateDisconnected = { ...state };
      stateDisconnected.isConnectedSocket = false;
      stateDisconnected.state = appConstants.STATE.RESOLVE;
      return stateDisconnected;
    }

    case appActionKeys.ERROR.ERROR_START: {
      let stateError = { ...state };
      stateError.state = appConstants.STATE.PENDING;
      return stateError;
    }

    case appActionKeys.ERROR.ERROR_SUCCESS: {
      let stateError = { ...state };
      stateError.error = true;
      stateError.state = appConstants.STATE.RESOLVE;
      return stateError;
    }

    case appActionKeys.ERROR.ERROR_FAIL: {
      let stateError = { ...state };
      stateError.state = appConstants.STATE.RESOLVE;
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
