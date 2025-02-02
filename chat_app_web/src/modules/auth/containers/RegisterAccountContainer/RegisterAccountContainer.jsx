import { sendOTP, verifyOTP } from '@/configs';
import { appConstants, appRegex } from '@/constants';
import { authService, userService } from '@/services';
import React from 'react';
import { RegisterAccountModal } from '../../modals';

const RegisterAccountContainer = () => {
  const [registerModalState, setRegisterModalState] = React.useState({
    open: false,
    otpSent: false,
    loading: false,
    phoneNumberIsValid: false,
    verified: false,
    idToken: '',
  });

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

  const handleOnOkRegister = (values) => {
    console.log('handleOnOkRegister', values);
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
      appConstants.RECAPTCHA_CONTAINER_ID,
      handleSendOtpSuccess,
      handleSendOtpFail,
      handleSendOtpFinish
    );
  };

  const handleOnVerifyOtpSuccess = async (result) => {
    const idToken = result._tokenResponse.idToken;
    try {
      const res = await authService.verifyIdToken(idToken);
      if (res) {
        setRegisterModalState((prev) => ({
          ...prev,
          verified: true,
          idToken,
        }));
      }
    } catch (error) {
      console.log('🚀 ~ handleOnVerifyOtpSuccess ~ error:', error);
    }
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
      <span onClick={handleOnClickRegister}>Tạo tài khoản</span>

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

export default RegisterAccountContainer;
