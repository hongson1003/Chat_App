import React from 'react';
import { AuthHeader } from '../../components';
import { AuthTabsContainer } from '../AuthTabsContainer';

const AuthContainer = () => {
  return (
    <>
      <AuthHeader />
      <AuthTabsContainer />
    </>
  );
};

export default AuthContainer;
