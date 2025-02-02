import React from 'react';
import { RegisterAccountContainer } from '../RegisterAccountContainer';
import './phone-footer-container.scss';

const PhoneFooterContainer = () => {
  const [openForgotPasswordModal, setOpenForgotPasswordModal] =
    React.useState(false);

  const handleOnClickForgotPassword = () => {
    console.log('handleOnClickForgotPassword');
  };

  return (
    <div className="phone-tab-footer">
      <span onClick={handleOnClickForgotPassword}>Quên mật khẩu</span>
      &nbsp;/&nbsp;
      <RegisterAccountContainer />
    </div>
  );
};

export default PhoneFooterContainer;
