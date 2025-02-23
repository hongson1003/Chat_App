import { appConstants } from '@/constants';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FriendSideBar from '../../../../pages/sidebar/friend.sidebar';
import SearchMessage from '../../../../pages/sidebar/home.message.search';
import { ChatSidebar } from '../../chat';
import './home-sidebar.scss';

const SidebarHome = () => {
  const stateApp = useSelector((state) => state?.app);
  console.log('🚀 ~ SidebarHome ~ stateApp:', stateApp);
  const [current, setCurrent] = useState(appConstants.FILTER.EMPTY);
  const [statusChat, setStatusChat] = useState(appConstants.FILTER.ALL);

  const renderContent = () => {
    switch (stateApp?.nav) {
      case appConstants.NAV_ITEMS_KEY.PHONE_BOOK:
        return <FriendSideBar />;
      case appConstants.NAV_ITEMS_KEY.MESSAGE:
        return (
          <ChatSidebar
            current={current}
            statusChat={statusChat}
            setStatusChat={setStatusChat}
          />
        );
      default:
        return (
          <ChatSidebar
            current={current}
            statusChat={statusChat}
            setStatusChat={setStatusChat}
          />
        );
    }
  };

  return (
    <div className="sidebar-home">
      <SearchMessage
        current={current}
        setCurrent={setCurrent}
        setStatusChat={setStatusChat}
        statusChat={statusChat}
      />
      {renderContent()}
    </div>
  );
};

export default SidebarHome;
