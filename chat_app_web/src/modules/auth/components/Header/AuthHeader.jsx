import React from 'react';
import './auth-header.scss';

const AuthHeader = () => {
  return (
    <div className="auth-header">
      <h1>Zalo</h1>
      <h2>
        Đăng nhập tài khoản Zalo
        <br />
        để kết nối với ứng dụng Zalo Web
      </h2>
    </div>
  );
};

export default AuthHeader;
