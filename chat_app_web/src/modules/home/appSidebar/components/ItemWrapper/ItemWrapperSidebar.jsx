import React from 'react';
import './item-wrapper-sidebar.scss';

const ItemWrapperSidebar = ({ children, count }) => {
  return (
    <div className="wrapperItem-sidebar-container">
      {children}
      {!!count && <div className="notifications-item">{count}</div>}
    </div>
  );
};

export default ItemWrapperSidebar;
