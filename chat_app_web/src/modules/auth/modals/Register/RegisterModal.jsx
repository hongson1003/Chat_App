import { Modal } from '@/components/common';
import { appRegex } from '@/constants';
import { Form, Input } from 'antd';
import React from 'react';

const NewAccountModal = ({ open, onOk, onCancel }) => {
  const [form] = Form.useForm();

  // const handleRegister = async (values) => {
  //   try {
  //     const res = await axios.post('/auth', values);
  //     if (res.errCode === 0) {
  //       toast.success('Tạo tài khoản thành công');
  //       form.resetFields();
  //       setIsModalOpen(false);
  //     } else {
  //       toast.error(res.message);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      title="Tạo tài khoản"
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
          <Input />
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Field */}
        <Form.Item
          label="Nhập lại mật khẩu"
          name="password2"
          dependencies={['password']}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewAccountModal;
