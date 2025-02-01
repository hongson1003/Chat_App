import { axios, socket } from '@/configs';
import { appConstants } from '@/constants';
import { chatHandler, timeHandler, userHandler } from '@/utils';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import InfoGroupModal from '../../../modal/infoGroup.modal';
import InforUserModal from '../../../modal/inforUser.modal';
import AvatarUser from '../AvatarUser/AvatarUser';
import './status-user.scss';

const StatusUser = ({ chat }) => {
  const user = useSelector((state) => state.appReducer.userInfo.user);
  const [friendShipData, setFriendShipData] = useState(null);
  const [statusUser, setStatusUser] = useState(null);

  const fetchFriendShip = async (userId) => {
    try {
      const res = await axios.get(`/users/friendShip?userId=${userId}`);
      if (res.errCode === 0) {
        setFriendShipData(res.data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Có lỗi xảy ra khi lấy thông tin bạn bè');
    }
  };

  useEffect(() => {
    const friendId = userHandler.getFriend(user, chat.participants)?.id;
    if (chat && friendId) {
      fetchFriendShip(friendId);
    }
  }, []);

  useEffect(() => {
    if (chat) {
      setStatusUser(userHandler.getFriend(user, chat.participants));
    }
  }, [chat]);

  useEffect(() => {
    if (statusUser) {
      socket.then((socket) => {
        socket.on('online', (data) => {
          if (data === statusUser.id) {
            setStatusUser({
              ...statusUser,
              lastedOnline: null,
            });
          }
        });
        socket.on('offline', (data) => {
          if (data === statusUser.id) {
            setStatusUser({
              ...statusUser,
              lastedOnline: new Date(),
            });
          }
        });
      });
    }
    return () => {
      socket.then((socket) => {
        socket.off('online');
        socket.off('offline');
      });
    };
  }, [statusUser]);

  return (
    <div className="status-user-container">
      {chat?.type === appConstants.CHAT_STATUS.PRIVATE_CHAT ? (
        <InforUserModal
          friendData={getFriend(user, chat.participants)}
          type={'button'}
          friendShipData={friendShipData}
          refuseAction
        >
          <AvatarUser
            image={userHandler.getFriend(user, chat.participants)?.avatar}
            size={50}
            name={userHandler.getFriend(user, chat.participants)?.userName}
            isOnline={statusUser?.lastedOnline === null ? true : false}
          />
        </InforUserModal>
      ) : (
        <InfoGroupModal>
          {chat?.groupPhoto ? (
            <AvatarUser image={chat?.groupPhoto} size={50} name={chat?.name} />
          ) : (
            <div className="avatar-group">
              {chat?.participants?.length > 0 &&
                chat?.participants?.map((item) => {
                  return (
                    <React.Fragment key={item.id}>
                      <AvatarUser
                        image={item.avatar}
                        size={25}
                        name={
                          userHandler.getFriend(user, chat.participants)
                            ?.userName
                        }
                      />
                    </React.Fragment>
                  );
                })}
            </div>
          )}
        </InfoGroupModal>
      )}
      <div className="status">
        {chat?.type === appConstants.CHAT_STATUS.GROUP_CHAT ? (
          <>
            <p className="username">{chat?.name}</p>
            <p className="connected-time">
              <span>
                <i className="fa-regular fa-user"></i>
              </span>
              <span>
                {chatHandler.getDetailListMembers(chat?.participants).total}{' '}
                thành viên
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="username">
              {userHandler.getFriend(user, chat?.participants)?.userName}
            </p>
            <p className="connected-time">
              {statusUser?.lastedOnline === null
                ? 'Đang hoạt động'
                : timeHandler.accessTimeBefore(statusUser?.lastedOnline)}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default StatusUser;
