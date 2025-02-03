import { appActionKeys } from '../keys';

export const appActions = {
  loginStart: (userInfo) => ({
    type: appActionKeys.LOGIN_STATUS.LOGIN_START,
    payload: userInfo,
  }),

  loginSuccess: (userInfo) => ({
    type: appActionKeys.LOGIN_STATUS.LOGIN_SUCCESS,
    payload: userInfo,
  }),

  loginFailure: () => ({
    type: appActionKeys.LOGIN_STATUS.LOGIN_FAIL,
  }),

  logoutSuccess: () => ({
    type: appActionKeys.LOGOUT_STATUS.LOGOUT_SUCCESS,
  }),

  connectSocketSuccess: () => ({
    type: appActionKeys.SOCKET.CONNECTED_SUCCESS,
  }),

  setError: () => ({
    type: appActionKeys.STATE.ERROR,
  }),

  changeKeyMenu: (key) => ({
    type: appActionKeys.STATE.CHANGE_KEY_MENU,
    payload: key,
  }),

  changeKeySubMenu: (key) => ({
    type: appActionKeys.STATE.CHANGE_SUB_KEY_MENU,
    payload: key,
  }),

  editUser: (user) => ({
    type: appActionKeys.STATE.EDIT_USER,
    payload: user,
  }),

  editGroup: (group) => ({
    type: appActionKeys.STATE.EDIT_GROUP,
    payload: group,
  }),
};
