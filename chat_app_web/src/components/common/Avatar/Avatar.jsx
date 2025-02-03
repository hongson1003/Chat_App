import { stringHandler } from '@/utils';
import { Avatar } from 'antd';
import React from 'react';
import Zoom from 'react-medium-image-zoom';
import './avatar.scss';

const AvatarCommon = ({
  src,
  size = 46,
  alt = 'avatar',
  zoom,
  status,
  online = false,
  fullName,
}) => {
  return (
    <div className="avatar-container">
      {zoom ? (
        <Zoom>
          <Avatar src={src} size={size} alt={alt}>
            {stringHandler.getFirstLetters(fullName)}
          </Avatar>
        </Zoom>
      ) : (
        <Avatar src={src} size={size} alt={alt}>
          {stringHandler.getFirstLetters(fullName)}
        </Avatar>
      )}

      {status && online && <div className="status" />}
    </div>
  );
};

export default AvatarCommon;
