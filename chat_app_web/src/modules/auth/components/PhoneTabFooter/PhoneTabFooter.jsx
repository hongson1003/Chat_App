import { sendOTP, verifyOTP } from '@/configs';
import React from 'react';
import { RegisterAccountModal } from '../../modals';
import './phone-tab-footer.scss';

let confirmationResult = null;

const PhoneTabFooter = () => {
  const [registerModalState, setRegisterModalState] = React.useState({
    open: false,
    otpSent: false,
    loading: false,
  });
  const [openForgotPasswordModal, setOpenForgotPasswordModal] =
    React.useState(false);

  const handleOnClickForgotPassword = () => {
    console.log('handleOnClickForgotPassword');
  };

  const handleOnClickRegister = () => {
    setRegisterModalState({
      open: true,
      otpSent: false,
    });
  };

  const handleOnCancelRegister = () => {
    setRegisterModalState({
      open: false,
      otpSent: false,
    });
  };

  const handleOnOkRegister = () => {
    console.log('handleOnOkRegister');
  };

  const handleSendOtpSuccess = (confirmationResult) => {
    confirmationResult = confirmationResult;

    setRegisterModalState((prev) => ({
      ...prev,
      otpSent: true,
    }));
  };

  const handleSendOtpFail = (error) => {
    console.error('Gửi OTP thất bại:', error);
  };

  const handleSendOtpFinish = () => {
    setRegisterModalState((prev) => ({
      ...prev,
      loading: false,
    }));
  };

  const handleOnSendOtp = (phoneNumber) => {
    setRegisterModalState((prev) => ({
      ...prev,
      loading: true,
    }));

    sendOTP(
      phoneNumber,
      'recaptcha-container',
      handleSendOtpSuccess,
      handleSendOtpFail,
      handleSendOtpFinish
    );
  };

  const handleOnVerifyOtpSuccess = (result) => {
    const idToken = result._tokenResponse.idToken;
    console.log('🚀 ~ handleOnVerifyOtpSuccess ~ idToken:', idToken);
  };

  const handleOnVerifyOtpFail = (error) => {
    console.error('Xác thực OTP thất bại:', error);
  };

  const handleOnVerifyOtpFinish = () => {
    setRegisterModalState((prev) => ({
      ...prev,
      loading: false,
    }));
  };

  const handleVerifyOTP = (otp) => {
    setRegisterModalState((prev) => ({
      ...prev,
      loading: true,
    }));

    verifyOTP(
      otp,
      handleOnVerifyOtpSuccess,
      handleOnVerifyOtpFail,
      handleOnVerifyOtpFinish
    );
  };

  return (
    <>
      <div className="phone-tab-footer">
        <span onClick={handleOnClickForgotPassword}>Quên mật khẩu</span>
        &nbsp;/&nbsp;
        <span onClick={handleOnClickRegister}>Tạo tài khoản</span>
      </div>

      <RegisterAccountModal
        open={registerModalState.open}
        onCancel={handleOnCancelRegister}
        onOk={handleOnOkRegister}
        onSendOtp={handleOnSendOtp}
        otpSent={registerModalState.otpSent}
        loading={registerModalState.loading}
        onVerifyOtp={handleVerifyOTP}
      />
    </>
  );
};

export default PhoneTabFooter;
