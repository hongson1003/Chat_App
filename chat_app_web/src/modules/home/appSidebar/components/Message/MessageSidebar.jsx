import { MessageOutlined } from '@ant-design/icons';
import React from 'react';
import { ItemWrapperSidebar } from '../ItemWrapper';

const MessageSidebar = ({ count }) => {
  return (
    <ItemWrapperSidebar count={count}>
      <MessageOutlined />
    </ItemWrapperSidebar>
  );
};

export default MessageSidebar;
