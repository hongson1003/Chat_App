import { Button, Modal } from 'antd';
import React from 'react';

const CommonModal = ({
  open,
  onClose,
  title,
  children,
  okText = 'Đồng ý',
  cancelText = 'Hủy',
  onOk,
  onCancel,
  maskClosable = true,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel || onClose}
      onOk={onOk}
      okText={okText}
      cancelText={cancelText}
      centered
      maskClosable={maskClosable}
      footer={[
        <Button key="cancel" onClick={onCancel || onClose}>
          {cancelText}
        </Button>,
        <Button key="ok" type="primary" onClick={onOk}>
          {okText}
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
