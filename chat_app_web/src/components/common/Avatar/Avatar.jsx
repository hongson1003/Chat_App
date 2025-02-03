import { stringHandler } from '@/utils';
import { Avatar } from 'antd';
import React from 'react';
import Zoom from 'react-medium-image-zoom';

const AvatarCommon = (props) => {
  const { src, children, zoom, size = 46, status, name } = props;

  return (
    <div>
      {zoom ? (
        <Zoom>
          <Avatar src={src} size={size}>
            {stringHandler.getFirstLetters(name)}
          </Avatar>
        </Zoom>
      ) : (
        <Avatar src={src} size={size}>
          {stringHandler.getFirstLetters(name)}
        </Avatar>
      )}
      {children}
      {status && <div className="status" />}
    </div>
  );
};

export default AvatarCommon;
