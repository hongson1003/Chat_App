import { Button } from 'antd';
import React from 'react';
import { InfoModal } from '../../modals';
import './info-action-container.scss';

const InfoActionContainer = ({ data }) => {
  const [open, setOpen] = React.useState(false);

  const handleOnCloseInfoModal = () => {
    setOpen(false);
  };

  const handleOnOpenInfoModal = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="info-action-container">
        <Button block onClick={handleOnOpenInfoModal}>
          Hồ sơ của bạn
        </Button>
        <Button block>Cài đặt</Button>
        <Button block>Đăng xuất</Button>
      </div>

      <InfoModal data={data} open={open} onClose={handleOnCloseInfoModal} />
    </>
  );
};

export default InfoActionContainer;
