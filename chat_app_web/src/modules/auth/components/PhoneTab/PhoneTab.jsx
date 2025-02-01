import { axios } from '@/configs';
import { appActions } from '@/redux';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PhoneTabFooter } from '../PhoneTabFooter';

const PhoneTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      let rs = await axios.post('/auth/login', values);
      const data = rs.data;
      if (rs.errCode === 0) {
        dispatch(appActions.loginStart(data));
        navigate(`/verify?id=${rs?.data?.id}`);
      } else {
        toast.error(rs.message);
        setPhoneNumber(values.phoneNumber);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('error', error);
    }
  };

  return (
    <div className="phone-tab">
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
            loading={isLoading}
          >
            <span>Đăng nhập</span>
          </Button>
        </Form.Item>
      </Form>

      <PhoneTabFooter />
    </div>
  );
};

export default PhoneTab;
