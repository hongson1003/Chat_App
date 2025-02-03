import { appConstants } from '@/constants';
import { InfoContainer } from '@/modules/home';
import { appActions } from '@/redux';
import { AntCloudOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FriendSidebar, MessageSidebar } from '../../components';
import './app-sidebar-container.scss';

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
  };

  return (
    <div className="sidebar-main">
      <InfoContainer data={stateApp.userInfo} />

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
