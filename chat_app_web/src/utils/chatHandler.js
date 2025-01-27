import { axios, socket } from '../configs';

export const chatHandler = {
  getFriend(user, participants) {
    if (!user || !participants || participants.length < 0) return null;
    return participants.find((item) => item?.id !== user?.id);
  },

  getDetailListMembers(listMembers) {
    let count = 0;
    if (!listMembers || listMembers.length < 0) return { count, total: 0 };
    listMembers.forEach((item) => {
      if (item.checked) {
        count++;
      }
    });
    return { count, total: listMembers.length };
  },

  async sendNotifyToChatRealTime(chatId, message, type) {
    try {
      const res = await axios.post('/chat/notify', {
        chatId,
        message,
        type,
      });
      if (res.errCode === 0) {
        socket.then((socket) => {
          socket.emit('send-message', res.data);
          return res;
        });
      }
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
