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
  disableOk = false,
  showOkButton = true,
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
        <React.Fragment key="ok">
          {showOkButton && (
            <Button type="primary" onClick={onOk} disabled={disableOk}>
              {okText}
            </Button>
          )}
        </React.Fragment>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
