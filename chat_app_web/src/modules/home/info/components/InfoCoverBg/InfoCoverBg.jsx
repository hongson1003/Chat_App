import React from 'react';
import Zoom from 'react-medium-image-zoom';

const InfoCoverBg = ({ data }) => {
  return (
    <div className="info-cover-bg">
      <div className="camera-bg-container">
        <i className="fa-solid fa-camera"></i>
      </div>

      <Zoom>
        <img className="modal-background" />
      </Zoom>
    </div>
  );
};

export default InfoCoverBg;
