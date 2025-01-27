import { axios } from '@/configs';

export const userHandler = {
  async getFriendState(meId, friendId) {
    try {
      let res = await axios.get(`/users/friendShip?userId=${friendId}`);
      if (res.errCode === 0) {
        return res.data;
      }
      return meId === friendId || res.errCode;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
