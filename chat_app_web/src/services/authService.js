import { axios } from '@/configs';

const authService = {
  verifyIdToken: async (idToken) => {
    return await axios.get(`/api/v1/auth/verify-id-token?idToken=${idToken}`);
  },
  login: async (username, password) => {
    return await axios.post('/api/v1/auth/login', { username, password });
  },
};

export default authService;
