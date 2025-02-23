import { DropImage } from '@/components/common';
import { appConstants } from '@/constants';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import ChatMain from '../../../../pages/main/chat/chat.main';
import GroupFriend from '../../../../pages/main/friend/group.friend';
import InvitedFriend from '../../../../pages/main/friend/invited.friend';
import ListFriend from '../../../../pages/main/friend/list.friend';
import Welcome from '../../../../pages/main/main.welcome';
import { FRIEND_ITEM_MENU } from '../../../../pages/sidebar/friend.sidebar';

const HomeMain = ({ drawerMethods }) => {
  const [isLoading, setIsLoading] = useState(false);
  const stateUser = useSelector((state) => state?.userReducer);
  const stateApp = useSelector((state) => state?.appReducer);

  useEffect(() => {
    setIsLoading(true);
    const clock = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(clock);
    };
  }, []);

  const getRightSplitPane = () => {
    const nav = stateApp?.nav;
    const subNav = stateApp?.subNav;
    if (nav) {
      switch (nav) {
        case stateUser?.selectedChat && appConstants.NAV_ITEMS_KEY.MESSAGE:
          return (
            <DropImage>
              <ChatMain drawerMethods={drawerMethods} />
            </DropImage>
          );
        case 'pb':
          switch (subNav) {
            case FRIEND_ITEM_MENU.INVITE_FRIEND:
              return <InvitedFriend />;
            case FRIEND_ITEM_MENU.LIST_FRIENDS:
              return <ListFriend />;
            case FRIEND_ITEM_MENU.LIST_GROUP:
              return <GroupFriend />;
            default:
              return <></>;
          }
        case 'ms':
          if (subNav?.key === appTypes.STATE.ACCESS_CHAT) {
            return (
              <DragDrop fileTypes={['JPG', 'PNG', 'GIF']}>
                <ChatMain drawerMethods={drawerMethods} />
              </DragDrop>
            );
          }
        default:
          return <Welcome />;
      }
    }
    return <Welcome />;
  };

  return (
    <div
      className="content-main-container"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isLoading ? (
        <ReactLoading
          type={'spokes'}
          color="#1A70FF"
          height={'100px'}
          width={'100px'}
        />
      ) : (
        getRightSplitPane()
      )}
    </div>
  );
};

export default HomeMain;
