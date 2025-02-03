import React from 'react';
import './title-info-popover.scss';

const TitleInfoPopover = ({ title }) => {
  return (
    <div className="title-info-popover">
      <h3>{title}</h3>
      <hr />
    </div>
  );
};

export default TitleInfoPopover;
