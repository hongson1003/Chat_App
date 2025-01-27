import { axios, setAuthorizationAxios } from '@/configs';
import { appActions } from '@/redux';

export const authHandler = {
  checkUserIsLogin: async () => {
    try {
      let rs = await axios.post('/auth/check');
      if (rs.errCode === 0 || rs.errCode === 100) {
        setAuthorizationAxios(rs.data.access_token);
        return appActions.loginSuccess(rs.data);
      } else {
        return appActions.loginFail();
      }
    } catch (error) {
      console.log(error);
    }
  },
};
