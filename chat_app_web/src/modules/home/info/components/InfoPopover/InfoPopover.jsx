import { stringHandler } from '@/utils';
import { Avatar, Popover } from 'antd';
import { default as React } from 'react';

const InfoPopover = ({ children, title, content, data }) => {
  return (
    <Popover
      content={content}
      title={title}
      placement="rightBottom"
      trigger={'click'}
    >
      <Avatar src={data.avatar} size={42}>
        {stringHandler.getFirstLetters(data.fullName)}
      </Avatar>
    </Popover>
  );
};

export default InfoPopover;
