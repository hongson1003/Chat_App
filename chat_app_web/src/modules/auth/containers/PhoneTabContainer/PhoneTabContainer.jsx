import React from 'react';
import { LoginForm } from '../../components';
import { PhoneFooterContainer } from '../PhoneFooterContainer';
import { authService } from '@/services';

const PhoneTabContainer = () => {
  const handleOnLogin = async ({ username, password }) => {
    try {
      const res = await authService.login(username, password);
      console.log('🚀 ~ handleOnLogin ~ res:', res);
    } catch (error) {
      console.log('🚀 ~ handleOnLogin ~ error:', error);
    }
  };

  return (
    <>
      <LoginForm onLogin={handleOnLogin} />
      <PhoneFooterContainer />
    </>
  );
};

export default PhoneTabContainer;
