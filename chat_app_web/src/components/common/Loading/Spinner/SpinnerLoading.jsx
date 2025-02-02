import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import React from 'react';

const SpinnerLoading = () => {
  return (
    <Flex align="center" gap="middle" justify="center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 38 }} spin />} />
    </Flex>
  );
};

export default SpinnerLoading;
