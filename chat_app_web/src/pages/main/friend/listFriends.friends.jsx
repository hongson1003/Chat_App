import { axios } from '@/configs';
import { appConstants } from '@/constants';
import { appActions, userActions } from '@/redux';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FriendPopover from '../../../components/popover/friend.popover';
import AvatarUser from '../../../components/user/avatar';
import './listFriends.friends.scss';

const ListFriends = ({ data, fetchFriends }) => {
  const [friends, setFriends] = React.useState([]);
  const stateApp = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.length > 0) {
      const newData = data?.map((item) => {
        let user = null;
        if (stateApp.userInfo.user.id === item.sender.id) user = item.receiver;
        else user = item.sender;
        return user;
      });
      setFriends(newData);
    }
  }, [data]);

  const handleOpenChat = async (friendId) => {
    try {
      const res = await axios.post('/chat/access', {
        type: 'PRIVATE_CHAT',
        participants: [stateApp.userInfo.user.id, friendId],
        status: true,
      });
      if (res.errCode !== -1) {
        dispatch(appActions.changeKeyMenu(appConstants.NAV_ITEMS_KEY.MESSAGE));
        dispatch(userActions.accessChat(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="friends-list">
      {friends.map((item, index) => (
        <div key={index} className="friend-item">
          <div
            className="friend-item-left"
            onClick={() => handleOpenChat(item.id)}
          >
            <AvatarUser
              image={item.avatar}
              name={item.userName}
              size={50}
              zoom
            />
            <span className="name">{item.userName}</span>
          </div>
          <div className="friend-item-right">
            <FriendPopover user={item} fetchFriends={fetchFriends}>
              <i className="fa-solid fa-ellipsis"></i>
            </FriendPopover>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListFriends;
