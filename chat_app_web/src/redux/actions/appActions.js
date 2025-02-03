import { appConstants } from '@/constants';
import { appActionKeys } from '../keys';

export const appActions = {
  loginStart: () => ({
    type: appActionKeys.LOGIN_STATUS.LOGIN_START,
  }),

  loginSuccess: (userInfo) => ({
    type: appActionKeys.LOGIN_STATUS.LOGIN_SUCCESS,
    payload: userInfo,
  }),

  loginFailure: () => ({
    type: appActionKeys.LOGIN_STATUS.LOGIN_FAIL,
  }),

  logoutStart: () => ({
    type: appActionKeys.LOGOUT_STATUS.LOGOUT_START,
  }),

  logoutSuccess: () => ({
    type: appActionKeys.LOGOUT_STATUS.LOGOUT_SUCCESS,
  }),

  logoutFailure: () => ({
    type: appActionKeys.LOGOUT_STATUS.LOGOUT_FAIL,
  }),

  connectSocketSuccess: () => ({
    type: appActionKeys.SOCKET.CONNECTED_SUCCESS,
  }),

  setError: () => ({
    type: appConstants.STATE.ERROR,
  }),

  changeKeyMenuStart: (key) => ({
    type: appActionKeys.CHANGE_KEY_MENU.CHANGE_KEY_MENU_START,
  }),

  changeKeyMenuSuccess: (key) => ({
    type: appConstants.STATE.CHANGE_KEY_MENU,
    payload: key,
  }),

  changeKeyMenuFailure: () => ({
    type: appActionKeys.CHANGE_KEY_MENU.CHANGE_KEY_MENU_FAIL,
  }),

  changeKeySubMenu: (key) => ({
    type: appConstants.STATE.CHANGE_SUB_KEY_MENU,
    payload: key,
  }),

  editUser: (user) => ({
    type: appConstants.STATE.EDIT_USER,
    payload: user,
  }),

  editGroup: (group) => ({
    type: appConstants.STATE.EDIT_GROUP,
    payload: group,
  }),
};
