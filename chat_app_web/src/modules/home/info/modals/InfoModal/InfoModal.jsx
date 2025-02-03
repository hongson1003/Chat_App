import { Modal } from '@/components/common';
import React from 'react';

const InfoModal = ({ open, onClose, data }) => {
  return (
    <>
      <Modal open={open} onClose={onClose} showOkButton={false}>
        <div>Modal content</div>
      </Modal>
    </>
  );
};

export default InfoModal;
