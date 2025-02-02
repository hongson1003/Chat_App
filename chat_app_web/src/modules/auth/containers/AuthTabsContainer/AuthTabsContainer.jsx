import { Tabs } from 'antd';
import React from 'react';
import { QrTab } from '../../components';
import { PhoneTabContainer } from '../PhoneTabContainer';
import './auth-tabs-container.scss';

const items = [
  {
    key: '1',
    label: <p className="title-tab">VỚI MÃ QR</p>,
    children: <QrTab />,
  },
  {
    key: '2',
    label: <p className="title-tab">VỚI SỐ ĐIỆN THOẠI</p>,
    children: <PhoneTabContainer />,
  },
];

const AuthTabsContainer = () => {
  return (
    <Tabs defaultActiveKey="2" items={items} className="login-tabs" centered />
  );
};

export default AuthTabsContainer;
