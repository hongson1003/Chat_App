import React from 'react';
import { AuthTabs } from '../components';
import { AuthHeader } from '../components/Header';

const AuthContainer = () => {
  return (
    <>
      <AuthHeader />
      <AuthTabs />
    </>
  );
};

export default AuthContainer;
