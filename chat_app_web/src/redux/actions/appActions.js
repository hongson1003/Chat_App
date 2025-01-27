export const appActions = {
  loginStart: (userInfo) => ({
    type: appTypes.LOGIN_STATUS.LOGIN_START,
    payload: userInfo,
  }),

  loginSuccess: (userInfo) => ({
    type: appTypes.LOGIN_STATUS.LOGIN_SUCCESS,
    payload: userInfo,
  }),

  loginFail: () => ({
    type: appTypes.LOGIN_STATUS.LOGIN_FAIL,
  }),

  logoutSuccess: () => ({
    type: appTypes.LOGOUT_STATUS.LOGOUT_SUCCESS,
  }),

  connectSocketSuccess: () => ({
    type: appTypes.SOCKET.CONNECTED_SUCCESS,
  }),

  setError: () => ({
    type: appTypes.STATE.ERROR,
  }),

  changeKeyMenu: (key) => ({
    type: appTypes.STATE.CHANGE_KEY_MENU,
    payload: key,
  }),

  changeKeySubMenu: (key) => ({
    type: appTypes.STATE.CHANGE_SUB_KEY_MENU,
    payload: key,
  }),

  editUser: (user) => ({
    type: appTypes.STATE.EDIT_USER,
    payload: user,
  }),

  editGroup: (group) => ({
    type: appTypes.STATE.EDIT_GROUP,
    payload: group,
  }),
};
