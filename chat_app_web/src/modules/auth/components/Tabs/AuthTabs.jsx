import { Tabs } from 'antd';
import React from 'react';
import { PhoneTab } from '../PhoneTab';
import { QrTab } from '../QrTab';
import './auth-tabs.scss';

const items = [
  {
    key: '1',
    label: <p className="title-tab">VỚI MÃ QR</p>,
    children: <QrTab />,
  },
  {
    key: '2',
    label: <p className="title-tab">VỚI SỐ ĐIỆN THOẠI</p>,
    children: <PhoneTab />,
  },
];

const AuthTabs = () => {
  return (
    <Tabs defaultActiveKey="2" items={items} className="login-tabs" centered />
  );
};

export default AuthTabs;
