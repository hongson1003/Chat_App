import { appConstants } from '@/constants';
import { UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Input, Menu } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AddFriendModal from '../../components/modal/addFriend.modal';
import NewGroupChatModal from '../../components/modal/newGroupChat.modal';
import './home.message.search.scss';

const items1 = [
  {
    label: <span>Tất cả</span>,
    key: appConstants.FILTER.ALL,
  },
  {
    label: <span>Chưa đọc</span>,
    key: appConstants.FILTER.NOT_READ,
  },
];

const { Search } = Input;

const SearchMessage = ({
  setCurrent: setSearchCurrent,
  setStatusChat,
  statusChat,
}) => {
  const state = useSelector((state) => state?.appReducer);
  const searchRef = React.useRef(null);

  const onSearch = (value, _e, info) => {
    setSearchCurrent(value);
  };

  const onClick = (e) => {
    setStatusChat(e.key);
  };

  const handleOnChange = (value) => {
    if (!value) {
      setSearchCurrent('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault();
      searchRef.current.focus();
    }
  };

  useEffect(() => {
    if (searchRef.current?.input) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (searchRef.current?.input) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  return (
    <div className="sidebar-nav">
      <div className="sidebar-nav-search">
        <Search
          placeholder="Tìm kiếm"
          onSearch={onSearch}
          spellCheck={false}
          onChange={(e) => handleOnChange(e.target.value)}
          ref={searchRef}
        />
        <div className="btn-group">
          <AddFriendModal>
            <Button
              style={{ border: 'none', boxShadow: 'none', width: '20%' }}
              icon={<UserAddOutlined />}
            ></Button>
          </AddFriendModal>
          <NewGroupChatModal>
            <Button
              style={{ border: 'none', boxShadow: 'none', width: '20%' }}
              icon={<UsergroupAddOutlined />}
            />
          </NewGroupChatModal>
        </div>
      </div>
      {state?.nav === appConstants.NAV_ITEMS_KEY.MESSAGE && (
        <div className="sidebar-nav-classify">
          <Menu
            onClick={onClick}
            selectedKeys={[statusChat]}
            mode="horizontal"
            items={items1}
          />
        </div>
      )}
    </div>
  );
};

export default SearchMessage;
