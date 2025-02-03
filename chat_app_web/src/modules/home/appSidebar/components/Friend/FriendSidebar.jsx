import React from 'react';
import { ItemWrapperSidebar } from '../ItemWrapper';

const FriendSidebar = () => {
  return (
    <ItemWrapperSidebar>
      <i
        style={{
          fontSize: '24px',
        }}
        className="fa-regular fa-address-book"
      ></i>
    </ItemWrapperSidebar>
  );
};

export default FriendSidebar;
