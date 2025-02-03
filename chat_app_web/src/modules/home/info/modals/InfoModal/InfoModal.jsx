import { Modal } from '@/components/common';
import React from 'react';
import { InfoCoverBg } from '../../components';

const InfoModal = ({ open, onClose, data }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        showOkButton={false}
        title={'Thông tin cá nhân'}
      >
        <div>
          <InfoCoverBg data={data} />
        </div>
      </Modal>
    </>
  );
};

export default InfoModal;
