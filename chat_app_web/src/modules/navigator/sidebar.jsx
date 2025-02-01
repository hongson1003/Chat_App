import {
  AntCloudOutlined,
  CheckSquareOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { Button, Menu, Popover } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AvatarUser from '../user/components/AvatarUser/AvatarUser';
import './sidebar.scss';

import { axios, socket } from '@/configs';
import { appConstants } from '@/constants';
import { appActions, userActions } from '@/redux';
import { toast } from 'react-toastify';
import { FRIEND_ITEM_MENU } from '../../pages/sidebar/friend.sidebar';
import InforUserModal from '../modal/inforUser.modal';
import SettingModal from '../modal/setting.modal';
import WrapperItemSidebar from './wrapperItem.sidebar';

const Friends = () => {
  const user = useSelector((state) => state.appReducer?.userInfo?.user);
  const app = useSelector((state) => state.appReducer);
  const stylePhoneBook = {
    fontSize: '24px',
  };

  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const handleReadNotifications = async (ids) => {
    try {
      await axios.post('/users/notifications/friendShip', { ids });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `/users/notifications/friendShip?userId=${user?.id}`
      );
      if (res.errCode === 0) {
        setCount(res.data.length);
        dispatch(userActions.notificationsFriends(res.data));
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNeedAcceptAddFriend = (data) => {
    if (FRIEND_ITEM_MENU.INVITE_FRIEND === app?.subNav) {
      handleReadNotifications([data?.id]);
    } else {
      fetchNotifications();
    }
  };

  useEffect(() => {
    dispatch(userActions.fetchNotificationsFriendFunc(fetchNotifications));
    if (user) {
      socket.then((socket) => {
        socket.on('need-accept-addFriend', handleNeedAcceptAddFriend);
      });
      fetchNotifications();
    }
    return () => {
      if (user) {
        socket.then((socket) => {
          socket.off('need-accept-addFriend', handleNeedAcceptAddFriend);
        });
      }
    };
  }, [user]);

  return (
    <WrapperItemSidebar count={count}>
      <i
        style={{ ...stylePhoneBook }}
        className="fa-regular fa-address-book"
      ></i>
    </WrapperItemSidebar>
  );
};

const Messages = () => {
  const chat = useSelector((state) => state.appReducer?.subNav);
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.appReducer);

  const onlyRef = useRef(false);
  const [count, setCount] = useState(0);

  const fetchChatNotRead = async () => {
    try {
      const res = await axios.get('/chat/not-read');
      if (res.errCode === 0) {
        setCount(res.data.length);
        dispatch(userActions.notificationsChats(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      onlyRef.current === false &&
      appState.isLogin === appTypes.STATE.RESOLVE
    ) {
      fetchChatNotRead();
      dispatch(userActions.fetchNotificationChatFunc(fetchChatNotRead));
      onlyRef.current = true;
    }
    return () => {
      onlyRef.current = false;
    };
  }, [appState]);

  const handleReceiveMessageSocket = (data) => {
    if (chat?._id !== data?.chat) {
      fetchChatNotRead();
    }
  };

  useEffect(() => {
    if (appState.isConnectedSocket) {
      socket.then((socket) => {
        socket.on('receive-message', handleReceiveMessageSocket);
      });
    }

    return () => {
      socket.then((socket) => {
        socket.off('receive-message', handleReceiveMessageSocket);
      });
    };
  }, [appState, chat]);

  return (
    <WrapperItemSidebar count={count}>
      <MessageOutlined />
    </WrapperItemSidebar>
  );
};

const items = [Messages, Friends, CheckSquareOutlined, AntCloudOutlined].map(
  (icon, index) => {
    return {
      key: appConstants.NAV_ITEMS_KEY[appConstants.NAV_ITEMS[index]],
      icon: React.createElement(icon),
    };
  }
);

const Sidebar = () => {
  const state = useSelector((state) => state?.appReducer);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const updateOnline = async (time) => {
    try {
      await axios.put('/users/updateOnline', { time });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await updateOnline(new Date());
      socket.then((socket) => {
        socket.emit('offline', state?.userInfo?.user?.id);
      });
      let rs = await axios.post('/auth/logout');
      if (rs.errCode === 0) {
        dispatch(appActions.logoutSuccess());
        navigator('/login');
      } else {
        updateOnline(null);
        toast.error('Không thể đăng xuất, có lỗi xảy ra !');
      }
    } catch (error) {
      console.log(error);
      updateOnline(null);
      toast.error('Không thể đăng xuất, có lỗi xảy ra !');
    }
  };

  const content = useMemo(() => {
    return (
      <div className="content-popover">
        <InforUserModal
          friendData={state?.userInfo?.user}
          type={'button'}
          itsMe
        >
          <Button className="user-item" block>
            Hồ sơ của bạn
          </Button>
        </InforUserModal>
        <SettingModal>
          <Button className="user-item" block>
            Cài đặt
          </Button>
        </SettingModal>
        <hr />
        <div>
          <Button className="user-item" block onClick={handleLogout}>
            Đăng xuất
          </Button>
        </div>
      </div>
    );
  }, [state]);

  const title = useMemo(
    () => (
      <div style={{ padding: '8px 12px 0px' }}>
        <h3 style={{ marginBottom: '5px' }}>
          {state?.userInfo?.user?.userName}
        </h3>
        <hr />
      </div>
    ),
    [state]
  );

  const handleOnSelectItem = (e) => {
    dispatch(appActions.changeKeyMenu(e.key));
    dispatch(appActions.changeKeySubMenu(''));
  };

  return (
    <div className="sidebar-main">
      <Popover
        content={content}
        title={title}
        placement="rightBottom"
        trigger={'click'}
        style={{ marginBottom: '0' }}
        forceRender
      >
        <div className="base-avatar">
          <div>
            <AvatarUser
              image={state?.userInfo?.user?.avatar}
              size={50}
              name={state?.userInfo?.user?.userName}
            />
          </div>
        </div>
      </Popover>

      <Menu
        theme="light"
        mode="inline"
        items={items}
        onClick={handleOnSelectItem}
        selectedKeys={[state?.nav]}
        className="custom-menu"
      />
    </div>
  );
};

export default Sidebar;
