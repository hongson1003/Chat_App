import { Modal } from '@/components/common';
import { appConstants, appRegex } from '@/constants';
import { stringHandler } from '@/utils';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Alert, Button, Flex, Form, Input, Tooltip } from 'antd';
import Typography from 'antd/es/typography/Typography';
import React from 'react';
import './register-account-modal.scss';

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

  const phoneNumber = open ? form.getFieldValue('phoneNumber') : '';
  const isPhoneNumber = appRegex.PHONE_NUMBER.test(phoneNumber);

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        onOk(values);
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
      {isPhoneNumber && !phoneNumberIsValid && (
        <div className="register-account-modal__alert">
          <Alert
            message="Số điện thoại đã được sử dụng"
            type="error"
            showIcon
          />
        </div>
      )}

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
                <CheckCircleOutlined style={{ fontSize: '18px' }} />
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
          <Flex justify="flex-end" gap={5}>
            <CheckCircleOutlined style={{ fontSize: '18px' }} />
            <Typography.Text type="success">Đã xác thực OTP</Typography.Text>
          </Flex>
        )}
      </Form>

      {!otpSent && (
        <Flex justify="center" align="center" gap={5}>
          <div id={appConstants.RECAPTCHA_CONTAINER_ID}></div>
        </Flex>
      )}
    </Modal>
  );
};

export default RegisterAccountModal;
