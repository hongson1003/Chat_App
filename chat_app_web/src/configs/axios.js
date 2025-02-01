import { appActions, store } from '@/redux';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { configEnvs } from './env';

let isRefreshToken = false;
let newToken = null;

const instance = axios.create({
  baseURL: configEnvs.BASE_API_URL,
  withCredentials: true,
});

instance.defaults.headers.common['Authorization'] = '';

export const setAuthorizationAxios = (token) => {
  if (token) {
    newToken = token;
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    instance.defaults.headers.common['Authorization'] = '';
  }
};

axiosRetry(instance, {
  retries: 3,
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 500;
  },
  retryCondition: async (error) => {
    const status = error.response?.status;
    if (status === 401) {
      if (!isRefreshToken) {
        isRefreshToken = true;
        try {
          let rs = await instance.post('/auth/check');
          if (rs.errCode === 100) {
            setAuthorizationAxios(rs.data.access_token);
            store.dispatch(appActions.loginSuccess(rs.data));
            isRefreshToken = false;
            return true;
          }
        } catch (refreshError) {
          return true;
        }
      }
      return true;
    }
    return false;
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log('config.header', config.headers)
    if (newToken) {
      config.headers.Authorization = 'Bearer ' + newToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response?.errCode === 0 ? response : response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
