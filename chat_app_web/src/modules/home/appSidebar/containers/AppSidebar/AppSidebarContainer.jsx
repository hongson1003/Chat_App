import { Avatar } from '@/components/common';
import { appConstants } from '@/constants';
import { AntCloudOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FriendSidebar, MessageSidebar } from '../../components';
import './app-sidebar-container.scss';
import { appActions } from '@/redux';

const items = [
  MessageSidebar,
  FriendSidebar,
  CheckSquareOutlined,
  AntCloudOutlined,
].map((icon, index) => {
  return {
    key: appConstants.NAV_ITEMS_KEY[appConstants.NAV_ITEMS[index]],
    icon: React.createElement(icon),
  };
});

const AppSidebarContainer = () => {
  const stateApp = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleOnSelectItem = async (e) => {
    dispatch(appActions.changeKeyMenuStart());
    dispatch(appActions.changeKeyMenuSuccess(e.key));
    // dispatch(appActions.changeKeySubMenu(''));
  };

  return (
    <div className="sidebar-main">
      <Avatar
        src={stateApp.userInfo.avatar}
        name={stateApp.userInfo.fullName}
      />

      <Menu
        theme="light"
        mode="inline"
        items={items}
        onClick={handleOnSelectItem}
        selectedKeys={[stateApp.nav]}
        className="custom-menu"
      />
    </div>
  );
};

export default AppSidebarContainer;
