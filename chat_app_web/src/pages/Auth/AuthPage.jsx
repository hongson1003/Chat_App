import { AuthContainer } from '@/modules/auth';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './auth-page.scss';

const AuthPage = () => {
  return (
    <div className="auth-container">
      <AuthContainer />
    </div>
  );
};

export default AuthPage;
