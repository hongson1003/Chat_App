import { sendOTP, verifyOTP } from '@/configs';
import { appRegex } from '@/constants';
import { userService } from '@/services';
import React from 'react';
import { RegisterAccountModal } from '../../modals';
import './phone-tab-footer.scss';

const PhoneTabFooter = () => {
  const [registerModalState, setRegisterModalState] = React.useState({
    open: false,
    otpSent: false,
    loading: false,
    phoneNumberIsValid: false,
    verified: false,
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

  const handleOnCheckPhoneNumber = async (phoneNumber) => {
    const isValid = appRegex.PHONE_NUMBER.test(phoneNumber);
    if (isValid) {
      const res = await userService.getUserByPhoneNumber(phoneNumber);
      if (res === null) {
        setRegisterModalState((prev) => ({
          ...prev,
          phoneNumberIsValid: true,
        }));

        return;
      }
    }

    setRegisterModalState((prev) => ({
      ...prev,
      phoneNumberIsValid: false,
    }));
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
        phoneNumberIsValid={registerModalState.phoneNumberIsValid}
        onCheckPhoneNumber={handleOnCheckPhoneNumber}
        verified={registerModalState.verified}
      />
    </>
  );
};

export default PhoneTabFooter;
