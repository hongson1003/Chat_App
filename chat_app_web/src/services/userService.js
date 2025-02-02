import { axios } from '@/configs';

const userService = {
  getUserByPhoneNumber: async (phoneNumber) => {
    return await axios.get(`/api/v1/users/phone?phoneNumber=${phoneNumber}`);
  },
};

export default userService;
