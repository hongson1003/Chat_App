import { Modal } from '@/components/common';
import { appRegex } from '@/constants';
import { stringHandler } from '@/utils';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Tooltip } from 'antd';
import Typography from 'antd/es/typography/Typography';
import React from 'react';

const RegisterAccountModal = ({
  open,
  onOk,
  onCancel,
  onSendOtp,
  otpSent,
  onVerifyOtp,
  loading,
  verified,
  onCheckPhoneNumber,
  phoneNumberIsValid,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log('values', values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleOnSendOtp = () => {
    form
      .validateFields(['phoneNumber'])
      .then(async (values) => {
        onSendOtp(
          stringHandler.convertPhoneViToInternational(values.phoneNumber)
        );
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleOnChangeOtp = (text) => {
    onVerifyOtp(text);
  };

  const sharedProps = {
    onChange: handleOnChangeOtp,
  };

  const handleOnChangePhoneNumber = (e) => {
    const phoneNumber = e.target.value;
    console.log('🚀 ~ handleOnChangePhoneNumber ~ phoneNumber:', phoneNumber);
    onCheckPhoneNumber(phoneNumber);
  };

  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      title="Tạo tài khoản"
      maskClosable={false}
      disableOk={!verified}
    >
      <Form
        form={form}
        name="dependencies"
        autoComplete="off"
        style={{
          maxWidth: 600,
        }}
        layout="vertical"
      >
        <Form.Item
          label="Họ và tên"
          name="username"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ và tên!',
            },
          ]}
        >
          <Input disabled={otpSent} placeholder="Nguyễn Văn A" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            {
              required: true,
              pattern: new RegExp(appRegex.PHONE_NUMBER),
              message: 'Vui lòng nhập đúng định dạng số điện thoại!',
            },
          ]}
        >
          <Flex gap={10} align="center">
            <Input
              disabled={otpSent}
              onChange={handleOnChangePhoneNumber}
              placeholder="093xxxxxxx"
            />
            {phoneNumberIsValid && (
              <Tooltip title="Số điện thoại hợp lệ">
                <CheckOutlined />
              </Tooltip>
            )}
          </Flex>
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password1"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password disabled={otpSent} />
        </Form.Item>

        {/* Field */}
        <Form.Item
          label="Nhập lại mật khẩu"
          name="password2"
          dependencies={['password1']}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password1') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password disabled={otpSent} />
        </Form.Item>

        {!verified ? (
          <Form.Item label="Mã OTP" name="otp" rules={[{ required: true }]}>
            <Flex align="center" justify="space-between" gap={10}>
              <Input.OTP
                type="number"
                formatter={(str) => str.replace(/\D/g, '0')}
                {...sharedProps}
                disabled={loading || !otpSent}
              />
              <Button
                onClick={handleOnSendOtp}
                loading={loading}
                disabled={loading || !phoneNumberIsValid}
              >
                {otpSent ? 'Gửi lại' : 'Gửi mã OTP'}
              </Button>
            </Flex>
          </Form.Item>
        ) : (
          <Flex justify="flex-end">
            <Typography.Text type="success">Đã xác thực OTP</Typography.Text>
          </Flex>
        )}
      </Form>

      {!otpSent && (
        <Flex justify="center" align="center" gap={5}>
          <div id="recaptcha-container"></div>
        </Flex>
      )}
    </Modal>
  );
};

export default RegisterAccountModal;
