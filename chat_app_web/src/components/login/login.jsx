import { Tabs } from 'antd';
import React from 'react';
import LoginQR from '../login/qr.login';
import './login.scss';
import LoginPhone from './phone.login';

const items = [
  {
    key: '1',
    label: <p className="title-login title-login--l">VỚI MÃ QR</p>,
    children: <LoginQR />,
  },
  {
    key: '2',
    label: <p className="title-login title-login--r">VỚI SỐ ĐIỆN THOẠI</p>,
    children: <LoginPhone />,
  },
];

const Login = () => {
  return (
    <Tabs
      defaultActiveKey="2"
      items={items}
      // onChange={onChange}
      className="login-body"
      centered
    />
  );
};

export default Login;
