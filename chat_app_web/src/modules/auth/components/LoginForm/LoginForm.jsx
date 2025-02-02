import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';

const LoginForm = () => {
  const handleOnFinish = () => {
    console.log('handleOnFinish');
  };

  return (
    <div className="phone-tab">
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={handleOnFinish}
        size="large"
      >
        <Form.Item
          name="phoneNumber"
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input
            style={{ gap: '5px' }}
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Số điện thoại"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            style={{ gap: '5px' }}
            security="false"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
          >
            <span>Đăng nhập</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
