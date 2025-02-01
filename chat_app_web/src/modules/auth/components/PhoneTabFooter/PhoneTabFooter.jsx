import React from 'react';
import { RegisterModal } from '../../modals/Register';
import './phone-tab-footer.scss';

const PhoneTabFooter = () => {
  const [openRegisterModal, setOpenRegisterModal] = React.useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] =
    React.useState(false);

  const handleOnClickForgotPassword = () => {
    console.log('handleOnClickForgotPassword');
  };

  const handleOnClickRegister = () => {
    setOpenRegisterModal(true);
  };

  const handleOnCancelRegister = () => {
    setOpenRegisterModal(false);
  };

  const handleOnOkRegister = () => {
    console.log('handleOnOkRegister');
  };

  return (
    <>
      <div className="phone-tab-footer">
        <span onClick={handleOnClickForgotPassword}>Quên mật khẩu</span>
        &nbsp;/&nbsp;
        <span onClick={handleOnClickRegister}>Tạo tài khoản</span>
      </div>

      <RegisterModal
        open={openRegisterModal}
        onCancel={handleOnCancelRegister}
        onOk={handleOnOkRegister}
      />
    </>
  );
};

export default PhoneTabFooter;
