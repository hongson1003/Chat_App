import { axios } from '@/configs';

const authService = {
  verifyIdToken: async (idToken) => {
    return await axios.get(`/api/v1/auth/verify-id-token?idToken=${idToken}`);
  },
};

export default authService;
