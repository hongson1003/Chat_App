import React from 'react';
import { useSelector } from 'react-redux';
import AvatarUser from './avatar';
import './chat.user.scss';
import { appConstants } from '@/constants';
import { userHandler } from '@/utils';

const ChatUser = ({ chat }) => {
  const user = useSelector((state) => state.appReducer?.userInfo?.user);
  return (
    <div className={'chat-user-container'}>
      <div className="chat-left">
        {chat?.type === appConstants.CHAT_STATUS.PRIVATE_CHAT ? (
          <AvatarUser
            image={userHandler.getFriend(user, chat.participants)?.avatar}
            size={50}
            name={userHandler.getFriend(user, chat.participants)?.userName}
          />
        ) : (
          <div className="avatar-group">
            {chat?.groupPhoto ? (
              <AvatarUser image={chat?.groupPhoto} size={50} />
            ) : (
              chat?.participants?.length > 0 &&
              chat?.participants?.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <AvatarUser
                      image={item.avatar}
                      style={{
                        width: '50%',
                        height: '50%',
                      }}
                      name={
                        userHandler.getFriend(user, chat.participants)?.userName
                      }
                    />
                  </React.Fragment>
                );
              })
            )}
          </div>
        )}

        <div className="right">
          <div className="top">
            {chat?.type === appConstants.CHAT_STATUS.GROUP_CHAT ? (
              <>
                <div className="group-name">
                  <img
                    style={{ width: '15px', height: '15px' }}
                    src={'/groupPhoto/group.png'}
                  />
                  <span className="name">{chat?.name}</span>
                </div>
                {chat.listPin.includes(user.id) && (
                  <p className="pin">
                    <i className="fa-solid fa-thumbtack"></i>
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="name">
                  {userHandler.getFriend(user, chat.participants)?.userName}
                </p>
                {chat.listPin.includes(user.id) && (
                  <p className="pin">
                    <i className="fa-solid fa-thumbtack"></i>
                  </p>
                )}
              </>
            )}
          </div>
          {chat.lastedMessage && (
            <div className="bottom">
              <p>
                {chat.lastedMessage?.sender?.userName}:<> </>
                {chat?.lastedMessage?.type === appConstants.MESSAGES.TEXT
                  ? chat.lastedMessage?.content
                  : chat.lastedMessage?.type === appConstants.MESSAGES.IMAGES
                  ? 'Đã gửi ảnh'
                  : chat.lastedMessage?.type ===
                    appConstants.MESSAGES.FILE_FOLDER
                  ? 'Đã gửi file'
                  : chat.lastedMessage?.type === appConstants.MESSAGES.VIDEO
                  ? 'Đã gửi video'
                  : chat.lastedMessage?.type === appConstants.MESSAGES.STICKER
                  ? 'Đã gửi sticker'
                  : chat.lastedMessage?.type === appConstants.MESSAGES.AUDIO
                  ? 'Đã gửi audio'
                  : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
